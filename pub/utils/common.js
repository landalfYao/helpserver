"use strict"; 
const crypto = require('crypto');
const _algorithm = 'aes-256-cbc';
const _iv = '73546548679573675465765897096532';
const ivBuffer = new Buffer(_iv, 'hex');
const ivkey = Buffer.from('15464336451324535212156486623224', 'utf8').toString('hex');
let secrets = {};
const jwt = require('jsonwebtoken')
// const jwtKoa = require('koa-jwt')
const secretKey = 'adfbrw32rfr23'
const retCode = require('./../utils/retcode.js')
const config = require('./../config/config')
const db = require('./../db/mysqlHelper')
const request = require("request");
let loginState = {
    data: {},
    set(key, value) {
        this.data[key] = value
    },
    get(key) {
        return this.data[key]
    },
    remove(key) {
        delete this.data[key]
    }
}

/**
 * @desc: 加密
 * @param: data: 待加密的内容； dataEncoding: 内容编码; key: 秘钥； 
 *         keyEncoding: 秘钥编码； padding: 自动填充加密向量
 */
secrets.encrypt = function (data, dataEncoding, key, keyEncoding, padding) {
    let keyBuf = null;

    if (key instanceof Buffer) {
        keyBuf = key;
    } else {
        keyBuf = new Buffer(key, keyEncoding);
    }

    let dataBuf = null;
    if (data instanceof Buffer) {
        dataBuf = data;
    } else {
        dataBuf = new Buffer(data, dataEncoding);
    }

    let cipher = crypto.createCipheriv(_algorithm, keyBuf, ivBuffer);
    cipher.setAutoPadding(padding);
    let cipherData = cipher.update(dataBuf, 'buffer', 'base64');
    cipherData += cipher.final('base64');

    return cipherData;
};

/**
 * @desc:  解密
 * @param: data: 待解密的内容； dataEncoding: 内容编码; key: 秘钥； 
 *         keyEncoding: 秘钥编码； padding: 自动填充加密向量
 */
secrets.decypt = function (data, dataEncoding, key, keyEncoding, padding) {

    let keyBuf = null;
    if (key instanceof Buffer) {
        keyBuf = key;
    } else {
        keyBuf = new Buffer(key, keyEncoding);
    }

    let dataBuf = null;
    if (data instanceof Buffer) {
        dataBuf = data;
    } else {
        dataBuf = new Buffer(data, dataEncoding);
    }

    var decipher = crypto.createDecipheriv(_algorithm, keyBuf, ivBuffer);
    decipher.setAutoPadding(padding);
    var decipherData = decipher.update(dataBuf, 'binary', 'binary');
    decipherData += decipher.final('binary');
    var str3 = Buffer.from(decipherData, 'binary');

    return str3.toString('utf8');
};
//md5加密
function md5(data) {
    let md5 = crypto.createHash('md5');
    md5.update(data);
    let sign = md5.digest('hex');
    return sign
}
//MD5解密
function md5d(data) {
    return crypto.createHash('md5').update(data, 'utf8').digest("hex")
}

var jwtFun = {
    async verify(token) {
        let res = await jwt.verify(token, secretKey, function (err, decoded) {
            if (err) {
                return -1 //会输出123，如果过了60秒，则有错误。
            } else {
                return decoded
            }
        })
        return res
    },
    async sign(userToken) {
        return jwt.sign(userToken, secretKey, {
            expiresIn: '1h'
        })
    },
    //token uid 校验
    async checkToken(ctx) {
        
        let token = ctx.header.token
        let uid = ctx.header.uid
        
        if (loginState.get('y' + uid) == 1) {
            if (token) {
                let payload = await this.verify(token)
                if (payload == undefined || payload == -1 || payload == '') {
                    let result = {
                        code:retCode.SessionExpired.code,
                        codeMsg:retCode.SessionExpired.codeMsg
                    };
                    result.msg = 'token 错误'
                    return result
                } else {
                    let isroleAuth = await this.checkRoleAuth(ctx.request.url,payload.role_id)
              
                    if (isroleAuth || uid == config.SUPER_ADMINISTRATOR) {
                       
                        if (payload.pk_id == uid) {
                            return {
                                pl: 1,
                                payload: payload
                            }
                        } else {
                            let result = result = {
                                code:retCode.SessionExpired.code,
                                codeMsg:retCode.SessionExpired.codeMsg
                            };
                            result.msg = 'token 校验未通过'
                            return result
                        }
                    } else {
                        let result = {
                            code:retCode.NoAuthority.code,
                            codeMsg:retCode.NoAuthority.codeMsg
                        };
                        result.msg = '对不起，您无权操作'
                        return result
                    }
                }

            } else {
                let result = retCode.SessionExpired
                result.msg = 'token 错误'
                return result
            }


        } else {
            let result = retCode.LoginOverdue
            result.msg = '登录态已失效，请重新登录'
            return result
        }

    },
    async checkRoleAuth(api, id) {
        let apiUrl = api
        if (id) {
            let sql = 'Select auths.auth_url from role_auth,auths where role_auth.auth_id=auths.id and ' +
                'role_auth.role_id=' + id + ' and auths.auth_url = "' + apiUrl + '"'
            let bkdata = await db.query(sql, [])
            if (bkdata.length > 0) {
                return true
            } else {
                return false
            }

        } else {
            return false
        }
    },
    //校验权限
    async checkAuth(ctx) {
        let user = await this.checkToken(ctx)
        let result = {
            code:retCode.Success.code,
            codeMsg:retCode.Success.codeMsg
        }
        if (user.pl == 1) {
            //判断是否有权限
            result.auth = true
            result.uid = ctx.header.uid
            result.payload = user.payload
        } else {
            result = user
        }
        return result
    }
}

var commonSelect = {
    //通用查询
    async getList(ctx) {

        let form = ctx.request.body
        const args = {
            tables: form.tables,
            wheres: form.wheres,
            fields: form.fields,
            sorts: form.sorts,
            pageIndex: form.pageIndex,
            pageSize: form.pageSize,
        }

        let result = retCode.Success

        return {
            result,
            args,
            ct: {
                pl: true
            }
        }


    }

}

function filterReturn(result) {
    delete result.uid
    delete result.auth
    delete result.token
    delete result.payload
    return result
}
let http = {
    async request(url, type, data, headers) {
        let options = {
            url: url,
            headers: headers,
            method: type,
            json: data
        }
        return new Promise(function (resolve, reject) {
            request(options, (err, res, body) => {
                if (res.statusCode == 200) {
                    resolve(body)
                } else {
                    console.log(res.statusCode)
                }
            })
        })
    }
}

module.exports = {
    secrets: secrets,
    ivkey: ivkey,
    http: http,
    md5: md5,
    md5d: md5d,
    jwtFun: jwtFun,
    commonSelect: commonSelect,
    loginState: loginState,
    filterReturn: filterReturn
}
const model = require('./../model/wxuser.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const config = require('../config/config.js')
const roles = {


    async login(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let http = await com.http.request('https://api.weixin.qq.com/sns/jscode2session?appid=' +
            config.APP_ID + '&secret=' + config.APP_SECRET + '&js_code=' +
            form.js_code + '&grant_type=authorization_code', 'GET', {})
      
        let byo = await model.getByOpenid(http.openid)
        if (byo.length == 0) {
            let add = await model.add({
                openid: http.openid
            })
            if (add.errno) {
                result = retCode.Fail

            } else {
                result.data = (await model.getByOpenid(http.openid))[0]
            }
        } else {
            result.data = byo[0]
        }

        return result
    },
    async addInfo(ctx) {
        let form = ctx.request.body;
        let result = retCode.Success;
        let bkdata = await model.addInfo(form);
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
            } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
            }
        } else {
            result.data = bkdata.insertId;
            result.msg = "添加成功";
        }
        return com.filterReturn(result);

    },
    async updateWX(ctx){
        let form = ctx.request.body;
        let result = retCode.Success;
        let bkdata = await model.updateWX(form);
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
            } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
            }
        } else {
            result.data = bkdata.changeRows;
            result.msg = "修改成功";
        }
        return com.filterReturn(result);
    },
    async updateInfo(ctx) {
        let form = ctx.request.body;
        let result = retCode.Success;
        let bkdata = await model.updateInfo(form);
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
            } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
            }
        } else {
            result.data = bkdata.changeRows;
            result.msg = "添加成功";
        }
        return com.filterReturn(result);

    },
    async getById(ctx) {
        let form = ctx.request.body;
        let result = retCode.Success;
        let bkdata = await model.getById(form.id);
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
            } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
            }
        } else {
            result.data = bkdata[0];
        }
        return com.filterReturn(result);
    },
    async getInfoById(ctx) {
        let form = ctx.request.body;
        let result = retCode.Success;
        let bkdata = await model.getInfoByWxId(form.wx_id);
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
            } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
            }
        } else {
            result.data = bkdata[0];
        }
        return com.filterReturn(result);
    },
    async updateInfoState(ctx) {
        let form = ctx.request.body;
        let result = retCode.Success;
        let bkdata = await model.updateInfoState(form);
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail;
                result.msg = "失败";
            } else {
                result = retCode.ServerError;
                result.msg = "服务端错误";
            }
        } else {
            result.data = bkdata;
            result.msg = "修改成功";
        }
        return com.filterReturn(result);

    },
    async update(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.update(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '失败'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                let data = await model.getById(form.id)
                result.data = data[0]
                result.msg = '修改成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },

    async getInfos(ctx) {
        ctx.request.body.tables = 'userinfo'
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await model.getList(result.args, result.ct)
                let bkdata = result.result
                bkdata.data = userResult
                let ct = result.ct.payload

                let re = retCode.Success
                re.data = userResult
                return com.filterReturn(re)
            } else {
                return com.filterReturn(result)
            }
        } else {
            return com.filterReturn(auth)
        }
    },
    async getList(ctx) {
        ctx.request.body.tables = 'wxuser'
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await model.getList(result.args, result.ct)
                let bkdata = result.result
                bkdata.data = userResult
                let ct = result.ct.payload

                let re = retCode.Success
                re.data = userResult
                return com.filterReturn(re)
            } else {
                return com.filterReturn(result)
            }
        } else {
            return com.filterReturn(auth)
        }

    },
    async updateDefAddress(ctx){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateDefAddress(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '失败'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                let data = await model.getById(form.id)
                result.data = data[0]
                result.msg = '修改成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    async getComList(ctx) {
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await model.getList(result.args, result.ct)
                let bkdata = result.result
                bkdata.data = userResult
                let ct = result.ct.payload

                let re = retCode.Success
                re.data = userResult
                return com.filterReturn(re)
            } else {
                return com.filterReturn(result)
            }
        } else {
            return com.filterReturn(auth)
        }
    }

}
module.exports = roles
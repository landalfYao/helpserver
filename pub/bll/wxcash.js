const model = require("./../model/cashRecode");
const request = require('request');
// const com = require("../utils/common");
const config = require('../config/config');
const cryptoMO = require("crypto"); // MD5算法
const parseString = require("xml2js").parseString; // xml转js对象
// const refund = require('./wxrefund')
const key = config.Mch_key;
const fs = require('fs');
const wxpay = {
    async wxcash(ctx, openid, realName, amount) {
        let nonce_str = await this.getNonceStr(); // 随机字符串
        let partner_trade_no = await config.getWxPayOrdrID(); // 商户订单号
        let check_name = 'FORCE_CHECK'
        let re_user_name = realName
        let desc = '接单用户提现'
        let spbill_create_ip = '129.28.89.58'; // 获取客户端ip


        let bodyData = await this.bodyData(openid, nonce_str, partner_trade_no, spbill_create_ip, amount * 100, check_name, re_user_name, desc)
        // 接口
        let urlStr = "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers";
        // let cbdata = await com.http.request(urlStr, "POST", bodyData, {})
        let res = new Promise((resolve, reject) => {
            request({
                url: urlStr,
                method: 'POST',
                body: bodyData,
                agentOptions: {
                    pfx: fs.readFileSync(__dirname + '/cert/apiclient_cert.p12'),
                    passphrase: config.Mch_id
                }
            }, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    let data = parser(body);
                    resolve(data);
                    console.log(data)
                } else {
                    console.log('12', err);
                }
            });

        })


        return res;
    },

    async parseString(cbdata) {
        return new Promise(function (resolve, reject) {

            parseString(cbdata, function (err, result) {

                resolve(result)
            })
        })
    },
    async bodyData(openid, nonce_str, partner_trade_no, spbill_create_ip, amount, check_name, re_user_name, desc) {
        let bodyData = "<xml>";
        bodyData += "<mch_appid>" + config.APP_ID + "</mch_appid>" +
            "<mchid>" + config.Mch_id + "</mchid>" +
            "<nonce_str>" + nonce_str + "</nonce_str>" +
            "<partner_trade_no>" + partner_trade_no + "</partner_trade_no>" +
            "<openid>" + openid + "</openid>" +
            "<check_name>" + check_name + "</check_name>" +
            "<re_user_name>" + re_user_name + "</re_user_name>" +
            "<amount>" + amount + "</amount>" +
            "<desc>" + desc + "</desc>" +
            "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>";
        // 签名
        let sign = await this.paysignjsapi(config.APP_ID,
            config.Mch_id, nonce_str, partner_trade_no, spbill_create_ip,
            amount, check_name, re_user_name, desc, openid);
        bodyData += "<sign>" + sign + "</sign>";
        bodyData += "</xml>";
        let reg = new RegExp(/^\ufeff/i, "g")
        bodyData = bodyData.replace(reg, "")
        return bodyData
    },
    //获取随机串
    async getNonceStr(len) {
        len = len || 32;
        var $chars =
            "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = "";
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    // 生成签名
    async paysignjsapi(appid, mch_id, nonce_str, partner_trade_no, spbill_create_ip,
        amount, check_name, re_user_name, desc, openid) {
        var ret = {
            mch_appid: appid,
            mchid: mch_id,
            nonce_str: nonce_str,
            partner_trade_no: partner_trade_no,
            openid: openid,
            check_name: check_name,
            re_user_name: re_user_name,
            amount: amount,
            desc: desc,
            spbill_create_ip: spbill_create_ip
        };
        var str = await this.raw(ret);
        str = str + "&key=" + config.Mch_key;
        var md5Str = cryptoMO
            .createHash("md5")
            .update(str)
            .digest("hex");
        md5Str = md5Str.toUpperCase();
        return md5Str;
    },

    async raw(args) {
        var keys = Object.keys(args);
        keys = keys.sort();
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });

        var str = "";
        for (var k in newArgs) {
            str += "&" + k + "=" + newArgs[k];
        }
        str = str.substr(1);
        return str;
    },

    async paysignjs(appid, nonceStr, package, signType, timeStamp) {
        var ret = {
            appId: appid,
            nonceStr: nonceStr,
            package: package,
            signType: signType,
            timeStamp: timeStamp
        };
        var str = await this.raw1(ret);
        str = str + "&key=" + key;
        return cryptoMO
            .createHash("md5")
            .update(str)
            .digest("hex");
    },

    async raw1(args) {
        var keys = Object.keys(args);
        keys = keys.sort();
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key] = args[key];
        });

        var str = "";
        for (var k in newArgs) {
            str += "&" + k + "=" + newArgs[k];
        }
        str = str.substr(1);
        return str;
    },

    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    guid() {
        return (this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4());
    },

}

function parser(_da) {
    var xml = _da;
    xml = xml.slice('<xml>'.length, xml.indexOf('</xml>'));
    var tag = xml.match(/<\w+>/g);
    var len = tag.length;
    var obj = new Object(); //将微信 支付成功 返回的 xml 数据处理为json格式
    for (var i = 0; i < len; i++) {
        var node_name = tag[i].replace(/\<|\>/g, '');
        var tmp = xml.split("<" + node_name + ">");
        var _tmp = tmp[1].split("</" + node_name + ">");
        var result = _tmp[0];
        if (result.match(/^(?!.*CDATA)/)) {
            obj[node_name] = result;
        } else {
            obj[node_name] = result.split('[')[2].split(']')[0];
        }
    }
    return obj;
}
module.exports = wxpay
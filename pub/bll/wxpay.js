const model = require("./../model/helplist.js");
// const retCode = require("./../utils/retcode.js");
const com = require("../utils/common");
const config = require('../config/config');
const cryptoMO = require("crypto"); // MD5算法
const parseString = require("xml2js").parseString; // xml转js对象
const refund = require('./wxrefund')
const key = config.Mch_key;
const wxpay = {
    async wxpay(ctx, type) {
        let param = ctx.request.body;
        let openid = param.openid;

        let spbill_create_ip = ctx.request.ip.replace(/::ffff:/, ""); // 获取客户端ip
        let body = param.title; // 商品描述
        let notify_url = "https://hkapi.sunwou.com/pay/wxpay/callback"; // 支付成功的回调地址  可访问 不带参数
        let nonce_str = await this.getNonceStr(); // 随机字符串
        let out_trade_no = await config.getWxPayOrdrID(); // 商户订单号
        let total_fee = parseInt(param.total_fee * 100); // 订单价格 单位是 分
        let timestamp = Math.round(new Date().getTime() / 1000); // 当前时间

        let bodyData = await this.bodyData(body, nonce_str, openid, out_trade_no, spbill_create_ip, total_fee, notify_url)
        // 微信小程序统一下单接口
        let urlStr = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        let cbdata = await com.http.request(urlStr, "POST", bodyData, {})
        let returnValue = {};
        if (typeof cbdata == 'string') {
            let result = await this.parseString(cbdata)
            if (result.xml.return_code[0] == "SUCCESS") {
                returnValue.msg = "操作成功";
                returnValue.status = "100";
                returnValue.out_trade_no = out_trade_no; // 商户订单号
                // 小程序 客户端支付需要 nonceStr,timestamp,package,paySign  这四个参数
                returnValue.nonceStr = result.xml.nonce_str[0]; // 随机字符串
                returnValue.timestamp = timestamp.toString(); // 时间戳
                returnValue.package = "prepay_id=" + result.xml.prepay_id[0]; // 统一下单接口返回的 prepay_id 参数值
                returnValue.paySign = await this.paysignjs(
                    config.APP_ID,
                    returnValue.nonceStr,
                    returnValue.package,
                    "MD5",
                    timestamp
                ); // 签名
                param.order_num = out_trade_no

                let addorder = ''
                if (type == 'add') {
                    addorder = await model.add(param)
                    returnValue.oid = addorder.insertId
                } else {
                    addorder = await model.updateOrderNum(out_trade_no, param.oid)
                    returnValue.oid = param.oid
                }
                returnValue.code = 1


            } else {
                returnValue.code = -1
                returnValue.msg = result.xml.return_msg[0];
                returnValue.status = "102";
            }

        }
        return returnValue;
    },

    async parseString(cbdata) {
        return new Promise(function (resolve, reject) {

            parseString(cbdata, function (err, result) {

                resolve(result)
            })
        })
    },
    async bodyData(body, nonce_str, openid, out_trade_no, spbill_create_ip, total_fee, notify_url) {
        var bodyData = "<xml>";
        bodyData += "<appid>" + config.APP_ID + "</appid>"; // 小程序ID
        bodyData += "<body>" + body + "</body>"; // 商品描述
        bodyData += "<mch_id>" + config.Mch_id + "</mch_id>"; // 商户号
        bodyData += "<nonce_str>" + nonce_str + "</nonce_str>"; // 随机字符串
        bodyData += "<notify_url>" + notify_url + "</notify_url>"; // 支付成功的回调地址
        bodyData += "<openid>" + openid + "</openid>"; // 用户标识
        bodyData += "<out_trade_no>" + out_trade_no + "</out_trade_no>"; // 商户订单号
        bodyData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>"; // 终端IP
        bodyData += "<total_fee>" + total_fee + "</total_fee>"; // 总金额 单位为分
        bodyData += "<trade_type>JSAPI</trade_type>"; // 交易类型 小程序取值如下：JSAPI
        // 签名
        var sign = await this.paysignjsapi(config.APP_ID,
            body, config.Mch_id, nonce_str, notify_url, openid,
            out_trade_no, spbill_create_ip, total_fee);
        bodyData += "<sign>" + sign + "</sign>";
        bodyData += "</xml>";
        bodyData = bodyData.replace(/^\ufeff/i, "").replace(/^\ufffe/i, "")
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
    async paysignjsapi(appid, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee) {
        var ret = {
            appid: appid,
            body: body,
            mch_id: mch_id,
            nonce_str: nonce_str,
            notify_url: notify_url,
            openid: openid,
            out_trade_no: out_trade_no,
            spbill_create_ip: spbill_create_ip,
            total_fee: total_fee,
            trade_type: "JSAPI"
        };
        var str = await this.raw(ret);
        str = str + "&key=" + key;
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
    //退款
    async refund(param) {
        var RefundInfo = {
            mch_id: config.Mch_id, //商户号
            out_refund_no: this.guid(), //商户退款单号 //商户系统内部的退款单号（自己生成）
            out_trade_no: param.order_num, //商户系统内部订单号
            refund_fee: param.total_fee, //退款金额
            total_fee: param.total_fee, //订单金额
            nonce_str: await this.getNonceStr(32)
        };
        // 参数成功回调
        var result = await refund.WxPayRefund(RefundInfo);
        result.out_refund_no = RefundInfo.out_refund_no
        return result;
    },
    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    guid() {
        return (this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4());
    },

}
module.exports = wxpay
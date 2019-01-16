const request = require('request');
// const Q = require("q");
const crypto = require('crypto');
const fs = require('fs');
// 需要的参数设置 自行定义
const config = require("./../config/config");

/* 微信 申请 退款 */
var key = config.Mch_key; //此处为申请微信支付的API密码
let WxPayRefund = {
    // 生成微信的xml
    getXMLNodeValue: function (node_name, xml) {
        var tmp = xml.split("<" + node_name + ">");
        var _tmp = tmp[1].split("</" + node_name + ">");
        return _tmp[0];
    },

    raw: function (args) {
        let keys = Object.keys(args);
        keys = keys.sort()
        let newArgs = {};
        keys.forEach(function (key) {
            newArgs[key] = args[key];
        });
        let string = '';
        for (let k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    },

    paysignjs: function (appid, nonceStr, package, signType, timeStamp) {
        let ret = {
            appId: appid,
            nonceStr: nonceStr,
            package: package,
            signType: signType,
            timeStamp: timeStamp
        };
        var string = this.raw(ret);
        string = string + '&key=' + key;
        var sign = crypto.createHash('md5').update(string, 'utf8').digest('hex');
        return sign.toUpperCase();
    },
    //签名
    paysignjsapi: function (appid, mch_id, nonce_str, out_refund_no, out_trade_no, refund_fee, total_fee) {
        let ret = {
            appid: appid,
            mch_id: mch_id,
            nonce_str: nonce_str,
            // notify_url: notify_url,
            out_refund_no: out_refund_no,
            out_trade_no: out_trade_no,
            refund_fee: refund_fee,
            total_fee: total_fee,
        };
        let string = this.raw(ret);
        string = string + '&key=' + key; //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置 
        let crypto = require('crypto');
        let sign = crypto.createHash('md5').update(string, 'utf8').digest('hex');
        return sign.toUpperCase();
    },

    // 随机字符串产生函数 
    createNonceStr: function () {
        return Math.random().toString(36).substr(2, 15);
    },

    // 时间戳产生函数 
    createTimeStamp: function () {
        return parseInt(new Date().getTime() / 1000) + '';
    },
    // 此处的attach不能为空值 否则微信提示签名错误 
    async WxPayRefund(_order) {
        // var deferred = Q.defer();
        let appid = config.APP_ID;
        let nonce_str = _order.nonce_str;
        // var timeStamp = this.createTimeStamp();
        let url = "https://api.mch.weixin.qq.com/secapi/pay/refund"; //
        let formData = "<xml>";
        formData += "<appid>" + appid + "</appid>"; // 公众账号ID    appid
        formData += "<mch_id>" + _order.mch_id + "</mch_id>"; // 商户号    mch_id
        formData += "<nonce_str>" + nonce_str + "</nonce_str>"; // 随机字符串
        // formData += "<notify_url>" + _order.notify_url + "</notify_url>"; // 退款结果通知url
        formData += "<out_refund_no>" + _order.out_refund_no + "</out_refund_no>"; // 商户退款单号
        formData += "<out_trade_no>" + _order.out_trade_no + "</out_trade_no>"; //商户系统内部订单号
        formData += "<refund_fee>" + (_order.refund_fee) * 100 + "</refund_fee>"; // 退款金额
        formData += "<total_fee>" + (_order.total_fee) * 100 + "</total_fee>"; // 订单金额
        formData += "<sign>" + this.paysignjsapi(appid, _order.mch_id, nonce_str, _order.out_refund_no, _order.out_trade_no, (_order.refund_fee) * 100, (_order.total_fee) * 100) + "</sign>"; // 签名    sign
        formData += "</xml>";
        console.log(formData)
        let res = new Promise((resolve, reject) => {
            request({
                url: url,
                method: 'POST',
                body: formData,
                agentOptions: {
                    pfx: fs.readFileSync(__dirname + '/cert/apiclient_cert.p12'),
                    passphrase: _order.mch_id
                }
            }, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var data = parser(body);
                    resolve(data);
                } else {
                    console.log('12', err);
                }
            });

        })

        return res;
    },
};

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
module.exports = WxPayRefund;
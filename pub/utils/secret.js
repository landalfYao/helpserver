"use strict"; 
const crypto = require('crypto');
const _algorithm = 'aes-256-cbc';
const _iv = '73546548679573675465765897096532';
const ivBuffer = new Buffer(_iv, 'hex');
const ivkey = Buffer.from('15464336451324535212156486623224', 'utf8').toString('hex');
let secrets = {};
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
//MD5解密
secrets.md5d = function (data) {
    return crypto.createHash('md5').update(data, 'utf8').digest("hex")
}
//MD5加密
secrets.md5 = function (data) {
    let md5 = crypto.createHash('md5');
    md5.update(data);
    let sign = md5.digest('hex');
    return sign
}

module.exports = {
    secrets: secrets,
    ivkey: ivkey,
}
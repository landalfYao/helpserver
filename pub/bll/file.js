const config = require('./../config/config')
const fs = require('fs')
const model = require('./../model/file')
const com = require('../utils/common')
const retCode = require('../utils/retcode')

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
// Generate a pseudo-GUID by concatenating random hexadecimal. 
function guid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}
let app = {
    async add(ctx) {
        const form = ctx.request.body
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = process.cwd() + '/public/uploads/files/';
        let pat = guid() + file.name.substring(file.name.lastIndexOf('.'), file.name.length)

        // 创建可写流
        const upStream = fs.createWriteStream(filePath + pat);


        let bk = await model.add({
            filename: file.name,
            size: file.size,
            realname: pat,
            type: file.type,
            wx_id: form.wx_id
        })

        let returnData = {
            code: 1,
            data: {
                insertId: bk.insertId,
                url: config.uploadPath + pat
            }
        }
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return returnData;
    },
    async updateTemp(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateTemp(
                form.id
            )
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    async getList(ctx) {
        ctx.request.body.tables = 'files'
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
module.exports = app
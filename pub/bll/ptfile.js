const config = require('./../config/config')
const fs = require('fs')
const model = require('./../model/ptfile')
const com = require('../utils/common')
const retCode = require('../utils/retcode')
const db = require('./../db/mysqlHelper.js')

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
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            let filePath = process.cwd() + '/public/images/';
            let pat = guid() + file.name.substring(file.name.lastIndexOf('.'), file.name.length)
            // 创建可写流
            const upStream = fs.createWriteStream(filePath + pat);
            let bk = await model.add({
                file_name: pat,
                file_size: file.size,
                file_url: config.imagesPath + pat,
                mimetype: file.type,
                admin_id: auth.uid,
                group_id: form.group_id
            })
            result.data = {
                insertId: bk.insertId,
                url: config.uploadPath + pat
            }
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
        } else {
            result = auth
            result.data = 0
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_file', result.data.insertId || 0, '上传文件 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
        // return returnData;
    },
    //更新文件所属类目
    async update(ctx){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.update(form)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '修改了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_file', form.ids, '修改图片所属类目 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    //删除图片
    async del(ctx){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.del(form)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '删除了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_file', form.ids, '删除图片 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },

    //查询文件
    async getList(ctx) {
        ctx.request.body.tables = 'sw_file'
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let wh = ' admin_id='+auth.uid+' and is_delete=0 ';
            ctx.request.body.group_id ? wh=wh+' and group_id '+ctx.request.body.group_id:'';
            ctx.request.body.wheres = wh
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
    async getGlist(ctx){
        ctx.request.body.tables = 'sw_file_group'
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let wh = ' admin_id='+auth.uid+' and is_delete=0 ';
            let result = await com.commonSelect.getList(ctx)
            ctx.request.body.wheres = wh
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
    async addGroup(ctx){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            form.admin_id = auth.uid
            let bkdata = await model.addGroup(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该类目名已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
                result.data = 0
            } else {
                result.data = bkdata.insertId
                result.msg = '添加成功'
            }

        } else {
            result = auth
            result.data = 0
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_file_group', result.data, '新增文件类目 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    async delgroup(ctx){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.delGroup(form)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '删除了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_file_group', form.ids, '删除文件类目 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    async upgroup(ctx){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateGroup(form)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '更新了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_file_group', form.ids, '修改文件类目 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    }
}
module.exports = app
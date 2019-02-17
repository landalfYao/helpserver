const model = require('./../model/richtext.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const app = {
   
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            form.admin_id = auth.uid;
            let bkdata = await model.add(form);
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
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
            db.setLog(auth.uid, result.code, 'sw_richtext', result.data, '添加文章 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },

    async update(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            form.admin_id = auth.uid;
            let bkdata = await model.update(form)
            if (bkdata.errno) {
                
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                
            } else {
                result.data = bkdata.changedRows
                result.msg = '修改成功了'+bkdata.changedRows+'条数据'
            }
        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_richtext', result.data, '修改文章 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },
 
    async del(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateDel(
                form.ids,auth.uid
            )
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '成功删除了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_richtext', result.data, '删除文章 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },
    async getById(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.getWzById(form)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata[0]
                result.msg = '查询成功'
            }

        } else {
            result = auth
        }
        
        return com.filterReturn(result)
    },

    async getList(ctx) {
        ctx.request.body.tables = 'sw_richtext'
        let auth = await com.jwtFun.checkAuth(ctx)
        let result = retCode.Success
        if (auth.auth) {
            ctx.request.body.wheres += ' and admin_id='+auth.uid
            result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await model.getList(result.args, result.ct)
                let bkdata = result.result
                bkdata.data = userResult

                let re = retCode.Success
                re.data = userResult
                re.msg = '查询成功'
                result = re
            }
        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'sw_richtext', '', '文章查询 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)

    },


}
module.exports = app
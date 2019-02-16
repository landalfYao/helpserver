const model = require('./../model/calousels.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const app = {
   
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.add(form)
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
            db.setLog(auth.uid, result.code, 'calousels', result.data, '添加轮播图 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },

    async update(ctx) {
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
                result.msg = '修改成功了'+bkdata.changedRows+'条数据'
            }
        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'calousels', result.data, '修改轮播图 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },

    async updateShow(ctx,show) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateShow(form.ids,show)
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
            db.setLog(auth.uid, result.code, 'calousels', result.data, '修改轮播图显示关闭 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },
 
    async del(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateDel(
                form.ids
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
            db.setLog(auth.uid, result.code, 'address_info', result.data, '删除轮播图 ' + result.msg,  ctx.request.url)
        }
        return com.filterReturn(result)
    },

    async getList(ctx) {
        ctx.request.body.tables = 'calousels'
        let auth = await com.jwtFun.checkAuth(ctx)
        let result = retCode.Success
        if (auth.auth) {
            if(auth.payload.type == 'wxm'){
                ctx.request.body.wheres = 'is_delete=0 and is_show=1 and a_id='+ctx.request.body.a_id
                ctx.request.body.sorts = 'sort asc,create_time desc'
                ctx.request.body.pageSize = 5
            }
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
            db.setLog(auth.uid, result.code, 'calousels', '', '轮播图查询 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)

    },


}
module.exports = app
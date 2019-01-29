const model = require('./../model/authGrant.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const app = {

    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.add(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该名已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
                result.data = 0
            } else {
                result.data = bkdata.affectedRows
                result.msg = '添加成功了'+bkdata.affectedRows+'条数据'
            }

        } else {
            result = auth
            result.data = 0
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'role_auth', result.data, '赋予权限 ' + result.msg, '/api/auth/grant')
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
                result.data = bkdata.affectedRows
                result.msg = '成功删除了' + bkdata.affectedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'role_auth', form.ids, '删除赋予的权限 ' + result.msg, '/api/auth/grant/del')
        }
        return com.filterReturn(result)
    },

    async getList(ctx) {
        ctx.request.body.tables = 'role_auth,auths'
        let auth = await com.jwtFun.checkAuth(ctx)
        let result = retCode.Success
        if (auth.auth) {
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
            db.setLog(auth.uid, result.code, 'role_auth', '', '查询赋予的权限 ' + result.msg, '/api/auth/grant/get')
        }
        return com.filterReturn(result)
    },


}
module.exports = app
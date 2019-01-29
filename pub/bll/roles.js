const model = require('./../model/roles.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const roles = {

    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.add(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该角色名接口已存在'
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
            db.setLog(auth.uid, result.code, 'roles', result.data, '新增角色 ' + result.msg, '/api/role/add')
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
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该角色名称已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.changedRows
                result.msg = '修改了' + bkdata.changedRows + '条数据'
            }

        } else {
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, 'roles', form.id, '修改角色 ' + result.msg, '/api/role/update')
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
            db.setLog(auth.uid, result.code, 'roles', form.id, '删除角色 ' + result.msg, '/api/role/del')
        }
        return com.filterReturn(result)
    },

    async disable(ctx, disable) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateDisable(
                form.ids,
                disable == 'disable' ? 1 : 0
            )
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
            db.setLog(auth.uid, result.code, 'roles', form.ids, '更新角色启用或禁用 ' + result.msg, '/api/role/' + disable)
        }
        return com.filterReturn(result)
    },

    async grantAuth(ctx, checked) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.grantAuth({
                roleId: form.roleId,
                authIds: form.authIds
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.affectedRows
                result.msg = '成功赋予了' + bkdata.affectedRows + '个权限'
            }
            db.setLog({
                uid: auth.uid,
                ped_operation: '给角色赋予权限',
                operation_code: result.code,
                operation_msg: result.codeMsg,
                api_url: '/api/role/grant'
            })
        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    /**
     * @api {post} /api/role/ungrant 给角色取消权限
     * @apiDescription 给角色取消权限
     * @apiName ungrant
     * @apiGroup role 角色
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {string} ids  pk_id
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/role/ungrant
     * @apiVersion 1.0.0
     */
    async grantCancel(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.cancelGrant(form.ids)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.affectedRows
                result.msg = '成功取消了' + bkdata.affectedRows + '个权限'
            }
            db.setLog({
                uid: auth.uid,
                ped_operation: '给角色取消权限',
                operation_code: result.code,
                operation_msg: result.codeMsg,
                api_url: '/api/role/ungrant'
            })
        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    async getList(ctx) {
        ctx.request.body.tables = 'roles'
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
            db.setLog(auth.uid, result.code, 'roles', '', '角色查询 ' + result.msg, '/api/role/get')
        }
        return com.filterReturn(result)
    },
}
module.exports = roles
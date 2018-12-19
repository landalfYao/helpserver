const model = require('./../model/roles.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const roles = {
/**
* @api {post} /api/role/add 添加角色
* @apiDescription 添加角色
* @apiName Add
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} name 角色名称
* @apiParam {string} remarks 备注
* @apiParam {int} sort  序号
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/add
* @apiVersion 1.0.0
*/
    async add ( ctx ){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.add({
                name: form.name,
                remarks: form.remarks,
                sort: form.sort
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该角色名接口已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.insertId
                result.msg = '添加成功'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '角色添加',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/add'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/role/update 角色修改
* @apiDescription 修改角色
* @apiName roleupdate
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} name 角色名称
* @apiParam {string} remarks 备注
* @apiParam {int} sort  序号
* @apiParam {int} pkId  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/update
* @apiVersion 1.0.0
*/
    async update ( ctx ) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.update({
                name: form.name,
                remarks: form.remarks,
                sort: form.sort,
                pkId:form.pkId
            })
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
                result.msg = '修改成功'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '角色修改',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/update'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/role/del 角色删除
* @apiDescription 角色删除
* @apiName roledel
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {int} ids  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/del
* @apiVersion 1.0.0
*/
    async del ( ctx ) {
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
                result.msg = '成功删除了'+bkdata.changedRows+'条数据'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '角色删除',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/del'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/role/avaliable 角色启用
* @apiDescription 角色启用
* @apiName avaliable
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {int} ids  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/avaliable
* @apiVersion 1.0.0
*/
/**
* @api {post} /api/role/disable 角色禁用
* @apiDescription 角色禁用
* @apiName disable
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {int} ids  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/disable
* @apiVersion 1.0.0
*/
    async disable ( ctx,disable ) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateDisable(
                form.ids,
                disable == 'disable' ? 1:0
            )
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '更新了'+bkdata.changedRows+'条数据'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '角色'+(disable == 'disable' ? '禁用':'启用'),
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/'+disable
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/role/checked 角色可选
* @apiDescription 角色可选
* @apiName checked
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {int} ids  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/checked
* @apiVersion 1.0.0
*/
/**
* @api {post} /api/role/unchecked 角色不可选
* @apiDescription 角色不可选
* @apiName unchecked
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {int} ids  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/unchecked
* @apiVersion 1.0.0
*/
    async checked ( ctx,checked ) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateChecked(
                form.ids,
                checked == 'checked' ? 1:0
            )
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '更新了'+bkdata.changedRows+'条数据'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '角色'+(checked == 'checked' ? '可选':'不可选'),
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/'+checked
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/role/grant 给角色赋予权限
* @apiDescription 给角色赋予权限
* @apiName grant
* @apiGroup role 角色
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {int} roleId  角色ID
* @apiParam {string} authIds  权限ID
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/role/grant
* @apiVersion 1.0.0
*/
    async grantAuth ( ctx,checked ) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.grantAuth({
                roleId:form.roleId,
                authIds:form.authIds
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.affectedRows
                result.msg = '成功赋予了'+bkdata.affectedRows+'个权限'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '给角色赋予权限',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/grant'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
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
    async grantCancel ( ctx ) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.cancelGrant( form.ids )
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.affectedRows
                result.msg = '成功取消了'+bkdata.affectedRows+'个权限'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '给角色取消权限',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/role/ungrant'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
}
module.exports = roles
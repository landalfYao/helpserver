const model = require('./../model/authority.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')

const authority = {
/**
* @api {post} /api/auth/add 添加权限
* @apiDescription 添加权限
* @apiName Add
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} name 权限名称
* @apiParam {string} apiUrl 权限接口
* @apiParam {int} cateId  分类ID
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/add
* @apiVersion 1.0.0
*/
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.add({
                name: form.name,
                apiUrl: form.apiUrl,
                cateId: form.cateId
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该权限接口已存在'
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
                ped_operation: '权限添加',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/add'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/auth/update 修改权限
* @apiDescription 修改权限
* @apiName authUpdate
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} name 权限名称
* @apiParam {string} apiUrl 权限接口
* @apiParam {int} cateId  分类ID
* @apiParam {int} pkId  pkId
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/update
* @apiVersion 1.0.0
*/
    async update ( ctx ) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.update({
                name: form.name,
                apiUrl: form.apiUrl,
                cateId: form.cateId,
                pkId:form.pkId
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该权限接口已存在'
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
                ped_operation: '权限修改',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/update'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/auth/del 删除权限
* @apiDescription 删除权限
* @apiName authDelete
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} ids pk_id
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/del
* @apiVersion 1.0.0
*/
    async del ( ctx ){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.updateDel({
                ids:form.ids
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                console.log(bkdata)
                result.data = bkdata.changedRows
                result.msg = '成功删除了'+bkdata.changedRows+'条数据'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '权限删除',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/del'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )
    }
}
module.exports = authority
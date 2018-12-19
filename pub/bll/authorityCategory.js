const model = require('./../model/authorityCategory.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')

const authorityCategory = {
/**
* @api {post} /api/auth/cate/add 添加权限分类
* @apiDescription 添加权限分类
* @apiName cateAdd
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} cateName 分类名称
* @apiParam {string} remarks 备注
* @apiParam {int} sort  序号
* @apiParam {int} isShow  是否显示 0不显示  1显示 
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/add
* @apiVersion 1.0.0
*/
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.add({
                cateName: form.cateName,
                remarks: form.remarks,
                sort: form.sort,
                isShow: form.isShow
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该权限名称已存在'
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
                ped_operation: '权限分类添加',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/cate/add'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/auth/cate/update 修改权限分类
* @apiDescription 修改权限分类
* @apiName update
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} pkId pk_id
* @apiParam {string} cateName 分类名称
* @apiParam {string} remarks 备注
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/update
* @apiVersion 1.0.0
*/
    async update ( ctx ){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.update({
                cateName: form.cateName,
                remarks: form.remarks,
                uid: form.pkId
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该权限名称已存在'
                } else {
                    
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.msg = '修改成功'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '权限分类更新',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/cate/update'
            })
            
        } else {
            result = auth
        }
        delete result.data
        return com.filterReturn( result )  
    },
/**
* @api {post} /api/auth/cate/update/onShow 权限分类 显示
* @apiDescription 权限分类 显示
* @apiName onShow
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} ids pk_id
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/update/onShow
* @apiVersion 1.0.0
*/
/**
* @api {post} /api/auth/cate/update/unShow 权限分类 不显示
* @apiDescription 权限分类 不显示
* @apiName unShow
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} ids pk_id
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/update/unShow
* @apiVersion 1.0.0
*/
    async updateShow ( ctx, isShow) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.updateShow({
                isShow: isShow == 'onShow' ? 1:0,
                ids: form.ids
            })
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '成功更新了'+bkdata.changedRows+'条数据'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '权限分类状态显示更新',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/cate/update/'+isShow
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )   
    },
/**
* @api {post} /api/auth/cate/update/sort 权限分类 排序
* @apiDescription 权限分类 排序
* @apiName sort
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} sort 序号
* @apiParam {string} pkId pk_id
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/update/sort
* @apiVersion 1.0.0
*/
    async updateSort ( ctx ){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.updateSort({
                sort: form.sort,
                uid: form.pkId
            })
            if (bkdata.errno) {
                delete result.uid
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                delete result.uid
                result.data = bkdata.changedRows
                result.msg = '更新成功'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '权限分类序号更新',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/cate/update/sort'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )   
    },
/**
* @api {post} /api/auth/cate/del 权限分类 删除
* @apiDescription 权限分类 删除
* @apiName del
* @apiGroup Auth 权限
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiParam {string} ids pk_id
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/del
* @apiVersion 1.0.0
*/
    async updateDel ( ctx ){
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let bkdata = await model.updateDel(form.ids)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                result.data = bkdata.changedRows
                result.msg = '删除了'+bkdata.changedRows+'数据'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '权限分类 删除',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/cate/del'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result )   
    },

/**
* @api {get} /api/auth/cate/get 权限查询
* @apiDescription 权限查询
* @apiName Get
* @apiGroup Auth
* @apiHeader {string} token token
* @apiHeader {string} uid 用户ID
* @apiVersion 1.0.0  
* @apiSampleRequest http://localhost:3000/api/auth/cate/get
* @apiVersion 1.0.0
*/
    async getListByCate ( ctx ){
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.auth) {
            let cate = await model.findCate()
            let aut  = await model.findAuth()
            if (cate.errno || aut.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {
                let arr = cate
                //修改
                for(let i in arr){
                    arr[i].auths = []
                    for(let j in aut){
                        if(arr[i].pk_id == aut[j].cate_id){
                            arr[i].auths.push(aut[j])
                        }
                    }
                    
                }
                result.data = arr
                result.msg = '查询成功'
            }
            db.setLog({
                uid:auth.uid,
                ped_operation: '权限查询',
                operation_code:result.code,
                operation_msg: result.codeMsg,
                api_url:'/api/auth/cate/get'
            })
        } else {
            result = auth
        }
        return com.filterReturn( result ) 
    }
}

module.exports = authorityCategory
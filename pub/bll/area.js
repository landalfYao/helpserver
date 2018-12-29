const model = require('./../model/area.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const roles = {
    /**
     * @api {post} /api/area/add 添加地区
     * @apiDescription 添加地区
     * @apiName Add
     * @apiGroup area
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {string} dtype 类型
     * @apiParam {string} name 地区名
     * @apiParam {double} agent_get 代理抽点
     * @apiParam {double} p_get 平台抽点
     * @apiParam {int} sort  序号
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/area/add
     * @apiVersion 1.0.0
     */
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.add({
                name: form.name,
                atype: form.atype,
                sort: form.sort,
                agent_get: form.agent_get,
                p_get: form.p_get
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该地区名已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.insertId
                result.msg = '添加成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    /**
     * @api {post} /api/area/update 地区修改
     * @apiDescription 地区修改
     * @apiName update
     * @apiGroup area
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {string} dtype 类型
     * @apiParam {string} name 地区名
     * @apiParam {double} agent_get 代理抽点
     * @apiParam {double} p_get 平台抽点
     * @apiParam {int} sort  序号
     * @apiParam {int} pkId  pkId
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/area/update
     * @apiVersion 1.0.0
     */
    async update(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.update({
                name: form.name,
                atype: form.atype,
                sort: form.sort,
                p_get: form.p_get,
                pkId: form.pkId
            })
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该地区名称已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.changedRows
                result.msg = '修改成功'
            }
            db.setLog({
                uid: auth.uid,
                ped_operation: '角色修改',
                operation_code: result.code,
                operation_msg: result.codeMsg,
                api_url: '/api/role/update'
            })
        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    /**
     * @api {post} /api/area/del 地区删除
     * @apiDescription 地区删除
     * @apiName del
     * @apiGroup area
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {int} ids  pkId
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/area/del
     * @apiVersion 1.0.0
     */
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
        return com.filterReturn(result)
    },
    /**
     * @api {post} /api/area/get 地区查询
     * @apiDescription 地区查询
     * @apiName Get
     * @apiGroup area
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {string} fields 查询字段 例('name,id') 传空代表查询所有
     * @apiParam {string} wheres 查询条件 例('name=0 and id=3')
     * @apiParam {string} sorts  查询排序 例('name desc, id asc')
     * @apiParam {int} pageIndex  页码
     * @apiParam {int} pageSize  每页条数
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/area/get
     * @apiVersion 1.0.0
     */
    async getList(ctx) {
        ctx.request.body.tables = 'area'
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

    },

    async wxget(ctx) {
        let result = retCode.Success
        result.data = await model.wxget()
        return result
    }

}
module.exports = roles
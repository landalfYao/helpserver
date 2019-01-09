const model = require('./../model/dlServer.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const roles = {
    /**
     * @api {post} /api/server/add 添加帮助
     * @apiDescription 添加帮助
     * @apiName Add
     * @apiGroup Server
     * @apiParam {string} dl_id 代理ID
     * @apiParam {string} server_name 服务名
     * @apiParam {string} dl_sy 代理收益
     * @apiParam {string} user_sy  用户收益
     * @apiParam {string} p_sy  平台收益
     * @apiParam {string} is_show  是否显示
     * @apiVersion 1.0.0  
     * @apiSampleRequest http: //localhost:3000/api/server/add
     * @apiVersion 1.0.0
     */
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let bkdata = await model.add(form)
        if (bkdata.errno) {
            if (bkdata.errno == 1062) {
                result = retCode.Fail
                result.msg = '失败'
            } else {
                result = retCode.ServerError
                result.msg = '服务端错误'
            }
        } else {
            result.data = bkdata.insertId
            result.msg = '添加成功'
        }
        return com.filterReturn(result)
    },
    /**
     * @api {post} /api/server/update 地区修改
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
            let bkdata = await model.update(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该名称已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.changedRows
                result.msg = '修改成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },

    /**
     * @api {post} /api/server/get 查询
     * @apiDescription 查询
     * @apiName Get
     * @apiGroup Server
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {string} fields 查询字段 例('name,id') 传空代表查询所有
     * @apiParam {string} wheres 查询条件 例('name=0 and id=3')
     * @apiParam {string} sorts  查询排序 例('name desc, id asc')
     * @apiParam {int} pageIndex  页码
     * @apiParam {int} pageSize  每页条数
     * @apiVersion 1.0.0  
     * @apiSampleRequest http: //localhost:3000/api/server/get
     * @apiVersion 1.0.0
     */
    async getList(ctx) {
        ctx.request.body.tables = 'dl_server'
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

    async getListByUid(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.getListByUid(ctx.request.body.uid)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {

                delete result.uid
                result.msg = '获取成功'
                result.data = bkdata
            }
            return com.filterReturn(result)
        } else {
            return com.filterReturn(auth)
        }

    },
    async getById(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.getListById(ctx.request.body.id)
            if (bkdata.errno) {
                result = retCode.ServerError
                result.msg = '服务端错误'
            } else {

                delete result.uid
                result.msg = '获取成功'
                result.data = bkdata
            }
            return com.filterReturn(result)
        } else {
            return com.filterReturn(auth)
        }
    }

}
module.exports = roles
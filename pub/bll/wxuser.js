const model = require('./../model/wxuser.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const db = require('./../db/mysqlHelper.js')
const config = require('../config/config.js')
const roles = {
    /**
     * @api {post} /api/wx/user/login 微信用户登录
     * @apiDescription 微信用户登录
     * @apiName login
     * @apiGroup wxuser
     * @apiParam {string} js_code code
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/wx/user/login
     * @apiVersion 1.0.0
     */
    async login(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let http = await com.http.request('https://api.weixin.qq.com/sns/jscode2session?appid=' +
            config.APP_ID + '&secret=' + config.APP_SECRET + '&js_code=' +
            form.js_code + '&grant_type=authorization_code', 'GET', {})

        let byo = await model.getByOpenid(http.openid)
        if (byo.length == 0) {
            let add = await model.add({
                openid: http.openid
            })
            if (add.errno) {
                result = retCode.Fail

            } else {
                result.data = (await model.getByOpenid(http.openid))[0]
            }
        } else {
            result.data = byo[0]
        }

        return result
    },
    /**
     * @api {post} /api/wx/user/update 微信用户修改
     * @apiDescription 微信用户修改
     * @apiName update
     * @apiGroup wxuser
     * @apiHeader {string} openid
     * @apiParam {string} nick_name 昵称
     * @apiParam {string} avatar_url 头像
     * @apiParam {string} gender 性别
     * @apiParam {string} province 省
     * @apiParam {string} city  市
     * @apiParam {string} phone  手机号
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/wx/user/update
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
                    result.msg = '失败'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                let data = await model.getById(form.id)
                result.data = data[0]
                result.msg = '修改成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },

    /**
     * @api {post} /api/wx/user/get 微信用户查询
     * @apiDescription 微信用户查询
     * @apiName Get
     * @apiGroup wxuser
     * @apiHeader {string} token token
     * @apiHeader {string} uid 用户ID
     * @apiParam {string} fields 查询字段 例('name,id') 传空代表查询所有
     * @apiParam {string} wheres 查询条件 例('name=0 and id=3')
     * @apiParam {string} sorts  查询排序 例('name desc, id asc')
     * @apiParam {int} pageIndex  页码
     * @apiParam {int} pageSize  每页条数
     * @apiVersion 1.0.0  
     * @apiSampleRequest http://localhost:3000/api/wx/user/get
     * @apiVersion 1.0.0
     */
    async getList(ctx) {
        ctx.request.body.tables = 'wxuser'
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

}
module.exports = roles
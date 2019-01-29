const config = require('./../config/config')
const fs = require('fs')
const model = require('./../model/analysis')
const com = require('../utils/common')
const retCode = require('../utils/retcode')
const db = require('./../db/mysqlHelper.js')
let app = {

    async getAnalysisData(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if(auth.code == 1){
            let data = await model.getAgentData()
            result.data = data
        }else{
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, '数据分析', '', '查询平台数据 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    async getAnalysisDataByAgent(ctx) {
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if(auth.code == 1){
            let data = await model.getAgentData(auth.payload.a_id)
            result.data = data
        }else{
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, '数据分析', '', '查询代理数据 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    },
    async getWxuserData(ctx){
        let result = retCode.Success
        let form = ctx.request.body  
        let auth = await com.jwtFun.checkAuth(ctx)
        if(auth.code == 1){
            let data = await model.getWxuserData(form.jd_id)
            result.data = data
        }else{
            result = auth
        }
        if (auth.uid) {
            db.setLog(auth.uid, result.code, '数据分析', '', '查询代理数据 ' + result.msg, ctx.request.url)
        }
        return com.filterReturn(result)
    }

}
module.exports = app
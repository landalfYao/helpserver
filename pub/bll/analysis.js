const config = require('./../config/config')
const fs = require('fs')
const model = require('./../model/analysis')
const com = require('../utils/common')
const retCode = require('../utils/retcode')

let app = {

    async getAnalysisData(ctx) {
        let result = retCode.Success
        let form = ctx.request.body
        let data = await model.getAgentData(form.a_id)
        result.data = data
        return result
    },
    async getAnalysisDataByAgent(ctx) {
        let result = retCode.Success
        let form = ctx.request.body
        let data = await model.getAgentData(form.a_id)
        result.data = data
        return result
    }

}
module.exports = app
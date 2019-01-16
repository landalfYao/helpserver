const config = require('./../config/config')
const fs = require('fs')
const model = require('./../model/analysis')
const com = require('../utils/common')
const retCode = require('../utils/retcode')

let app = {

    async getAnalysisData(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let cbdata = {}
        cbdata.wxuserTotal = (await model.getWxuserTotal())[0].total
        cbdata.wxuserTotalDaily = (await model.getWxuserTotalByDaily())[0].total
        cbdata.orderTotal = (await model.getOrderTotal())[0].total
        // cbdata.orderTotalDaily = (await model.get())[0].total
        cbdata.orderTotalWaiting = (await model.getOrderTotalByState(0))[0].total
        cbdata.orderTotalPayed = (await model.getOrderTotalByState(1))[0].total
        cbdata.orderTotalTaked = (await model.getOrderTotalByState(2))[0].total
        cbdata.orderTotalComplete = (await model.getOrderTotalByState(3))[0].total
        cbdata.orderTotalCancel = (await model.getOrderTotalByState(4))[0].total
        cbdata.turnover = (await model.getTurnover())[0].turnover
        cbdata.turnoverDaily = (await model.getTurnoverByDaily())[0].turnover
        cbdata.refund = (await model.getRefund())[0].refund
        cbdata.refundDaily = (await model.getRefundByDaliy())[0].refund
        cbdata.areaTotal = (await model.getAreaTotal())[0].total
        cbdata.taking = (await model.getTakingTotal())[0].total

        result.data = cbdata
        return com.filterReturn(result)
    },
    
}
module.exports = app
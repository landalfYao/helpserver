const router = require('koa-router')()
const bll = require('./../pub/bll/analysis.js')

router.prefix('/api/anlysis')

router.post('/get', async (ctx, next) => {
    let result = await bll.getAnalysisData(ctx)
    ctx.body = result;
})
router.post('/get/agent', async (ctx, next) => {
    let result = await bll.getAnalysisDataByAgent(ctx)
    ctx.body = result;
})
router.post('/get/wx', async (ctx, next) => {
    let result = await bll.getWxuserData(ctx)
    ctx.body = result;
})
router.post('/get/wx/sm', async (ctx, next) => {
    let result = await bll.getWxuserSmData(ctx)
    ctx.body = result;
})
router.post('/get/order/state', async (ctx, next) => {
    let result = await bll.getOrderStateData(ctx)
    ctx.body = result;
})
router.post('/get/order/type', async (ctx, next) => {
    let result = await bll.getOrderTypeData(ctx)
    ctx.body = result;
})
module.exports = router
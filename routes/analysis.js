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

module.exports = router
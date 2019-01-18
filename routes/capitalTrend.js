const router = require('koa-router')()
const bll = require('./../pub/bll/capitalTrend.js')

router.prefix('/api/ct')

router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})

module.exports = router
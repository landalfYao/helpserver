const router = require('koa-router')()
const bll = require('./../pub/bll/capitalTrend.js')

router.prefix('/api/capitalTrend')

// router.post('/add', async (ctx, next) => {
//     let result = await bll.add(ctx)
//     ctx.body = result;
// })
// router.post('/get', async (ctx, next) => {
//     let result = await bll.getList(ctx)
//     ctx.body = result;
// })



module.exports = router
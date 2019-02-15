const router = require('koa-router')()
const bll = require('./../pub/bll/wallet.js')

router.prefix('/api/wallet')



router.post('/get/uid', async (ctx, next) => {
    let result = await bll.getByUid(ctx)
    ctx.body = result;
})
router.post('/cash', async (ctx, next) => {
    let result = await bll.cash(ctx)
    ctx.body = result;
})
router.post('/cash/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})


module.exports = router
const router = require('koa-router')()
const bll = require('./../pub/bll/helplist.js')
const wxpay = require('./../pub/bll/wxpay')

router.prefix('/api/help')

router.post('/add', async (ctx, next) => {
    let result = await wxpay.wxpay(ctx)
    ctx.body = result;
})
router.post('/update', async (ctx, next) => {
    let result = await bll.update(ctx)
    ctx.body = result;
})
router.post('/update/state', async (ctx, next) => {
    let result = await bll.updateState(ctx)
    ctx.body = result;
})
router.post('/del', async (ctx, next) => {
    let result = await bll.del(ctx)
    ctx.body = result;
})

router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})

router.post('/get2', async (ctx, next) => {
    let result = await bll.getList2(ctx)
    ctx.body = result;
})

module.exports = router
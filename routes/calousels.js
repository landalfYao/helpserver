const router = require('koa-router')()
const bll = require('./../pub/bll/calousels.js')

router.prefix('/api/calousels')

router.post('/add', async (ctx, next) => {
    let result = await bll.add(ctx)
    ctx.body = result;
})
router.post('/update', async (ctx, next) => {
    let result = await bll.update(ctx)
    ctx.body = result;
})
router.post('/del', async (ctx, next) => {
    let result = await bll.del(ctx)
    ctx.body = result;
})
router.post('/show', async (ctx, next) => {
    let result = await bll.updateShow(ctx,1)
    ctx.body = result;
})
router.post('/unshow', async (ctx, next) => {
    let result = await bll.updateShow(ctx,0)
    ctx.body = result;
})

router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})



module.exports = router
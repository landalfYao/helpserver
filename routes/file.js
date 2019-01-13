const router = require('koa-router')()
const bll = require('./../pub/bll/file.js')

router.prefix('/api/file')

router.post('/upload', async (ctx, next) => {
    let result = await bll.add(ctx)
    ctx.body = result;
})
router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})

module.exports = router
const router = require('koa-router')()
const bll = require('./../pub/bll/wxuser.js')

router.prefix('/api/wx/user')

router.post('/login', async (ctx, next) => {
    let result = await bll.login(ctx)
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

router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})

module.exports = router
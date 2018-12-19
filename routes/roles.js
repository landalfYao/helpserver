const router = require('koa-router')()
const bll = require('./../pub/bll/roles.js')

router.prefix('/api/role')

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
router.post('/checked', async (ctx, next) => {
    let result = await bll.checked(ctx,'checked')
    ctx.body = result;
})
router.post('/unchecked', async (ctx, next) => {
    let result = await bll.checked(ctx,'unchecked')
    ctx.body = result;
})
router.post('/disable', async (ctx, next) => {
    let result = await bll.disable(ctx,'disable')
    ctx.body = result;
})
router.post('/avaliable', async (ctx, next) => {
    let result = await bll.disable(ctx,'avaliable')
    ctx.body = result;
})
router.post('/grant', async (ctx, next) => {
    let result = await bll.grantAuth(ctx)
    ctx.body = result;
})
router.post('/ungrant', async (ctx, next) => {
    let result = await bll.grantCancel(ctx)
    ctx.body = result;
})
module.exports = router
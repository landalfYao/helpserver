const router = require('koa-router')()
const bll = require('./../pub/bll/ptfile.js')

router.prefix('/api/ptfile')

router.post('/upload', async (ctx, next) => {
    let result = await bll.add(ctx)
    ctx.body = result;
})
router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
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
router.post('/group/add', async (ctx, next) => {
    let result = await bll.addGroup(ctx)
    ctx.body = result;
})
router.post('/group/del', async (ctx, next) => {
    let result = await bll.delgroup(ctx)
    ctx.body = result;
})
router.post('/group/update', async (ctx, next) => {
    let result = await bll.upgroup(ctx)
    ctx.body = result;
})
router.post('/group/get', async (ctx, next) => {
    let result = await bll.getGlist(ctx)
    ctx.body = result;
})

module.exports = router
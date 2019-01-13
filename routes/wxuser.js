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
router.post('/update/wx', async (ctx, next) => {
    let result = await bll.updateWX(ctx)
    ctx.body = result;
})
router.post('/update/def/address', async (ctx, next) => {
    let result = await bll.updateDefAddress(ctx)
    ctx.body = result;
})
router.post('/del', async (ctx, next) => {
    let result = await bll.del(ctx)
    ctx.body = result;
})
router.post('/get/com', async (ctx, next) => {
    let result = await bll.getComList(ctx)
    ctx.body = result;
})
router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})
router.post('/get/id', async (ctx, next) => {
    let result = await bll.getById(ctx)
    ctx.body = result;
})
router.post('/get/info/wxid', async (ctx, next) => {
    let result = await bll.getInfoById(ctx)
    ctx.body = result;
})
router.post('/get/info', async (ctx, next) => {
    let result = await bll.getInfos(ctx)
    ctx.body = result;
})
router.post('/regis', async (ctx, next) => {
    let result = await bll.addInfo(ctx)
    ctx.body = result;
})
router.post('/update/info', async (ctx, next) => {
    let result = await bll.updateInfo(ctx)
    ctx.body = result;
})
router.post('/update/info/state', async (ctx, next) => {
    let result = await bll.updateInfoState(ctx)
    ctx.body = result;
})
router.post('/info/pass', async (ctx, next) => {
    ctx.request.body.state = 1
    ctx.request.body.msg = '通过审核'
    let result = await bll.updateInfoState(ctx)
    ctx.body = result;
})
router.post('/info/unpass', async (ctx, next) => {
    ctx.request.body.state = 2
    let result = await bll.updateInfoState(ctx)
    ctx.body = result;
})
module.exports = router
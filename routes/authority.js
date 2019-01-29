const router = require('koa-router')()
const bll = require('./../pub/bll/authority')
const bll2 = require('./../pub/bll/authGrant')

router.prefix('/api/auth')


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
router.post('/get', async (ctx, next) => {
  let result = await bll.getList(ctx)
  ctx.body = result;
})
router.post('/grant', async (ctx, next) => {
  let result = await bll2.add(ctx)
  ctx.body = result;
})
router.post('/grant/del', async (ctx, next) => {
  let result = await bll2.del(ctx)
  ctx.body = result;
})
router.post('/grant/get', async (ctx, next) => {
  let result = await bll2.getList(ctx)
  ctx.body = result;
})

module.exports = router
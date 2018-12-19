const router = require('koa-router')()
const bll = require('./../pub/bll/authorityCategory')

router.prefix('/api/auth/cate')


router.post('/add', async (ctx, next) => {
  let result = await bll.add(ctx)
  ctx.body = result;
})

router.post('/update', async (ctx, next) => {
  let result = await bll.update(ctx)
  ctx.body = result;
})

router.post('/update/onShow', async (ctx, next) => {
  let result = await bll.updateShow(ctx,'onShow')
  ctx.body = result;
})

router.post('/update/unShow', async (ctx, next) => {
  let result = await bll.updateShow(ctx,'unShow')
  ctx.body = result;
})
router.post('/update/sort', async (ctx, next) => {
  let result = await bll.updateSort(ctx)
  ctx.body = result;
})

router.post('/del', async (ctx, next) => {
  let result = await bll.updateDel(ctx)
  ctx.body = result;
})

router.get('/get', async (ctx, next) => {
  let result = await bll.getListByCate(ctx)
  ctx.body = result;
})

module.exports = router
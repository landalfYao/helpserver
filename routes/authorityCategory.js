const router = require('koa-router')()
const bll = require('./../pub/bll/authorityCategory')

router.prefix('/api/auth/cate')

/**
 * @api {post} /api/auth/cate/add 新增权限类目
 * @apiDescription 新增权限类目
 * @apiName add
 * @apiGroup Auth
 * @apiHeader {string} token token
 * @apiHeader {string} uid 用户ID
 * @apiParam {string} cate_name
 * @apiVersion 1.0.0  
 * @apiSampleRequest https://hapi.ypyzy.top/api/auth/cate/get
 * @apiVersion 1.0.0
 */
router.post('/add', async (ctx, next) => {
  let result = await bll.add(ctx)
  ctx.body = result;
})

router.post('/update', async (ctx, next) => {
  let result = await bll.update(ctx)
  ctx.body = result;
})

router.post('/update/onShow', async (ctx, next) => {
  let result = await bll.updateShow(ctx, 'onShow')
  ctx.body = result;
})

router.post('/update/unShow', async (ctx, next) => {
  let result = await bll.updateShow(ctx, 'unShow')
  ctx.body = result;
})

// router.post('/update/sort', async (ctx, next) => {
//   let result = await bll.updateSort(ctx)
//   ctx.body = result;
// })

router.post('/del', async (ctx, next) => {
  let result = await bll.updateDel(ctx)
  ctx.body = result;
})

router.post('/get', async (ctx, next) => {
  let result = await bll.getList(ctx)
  ctx.body = result;
})

module.exports = router
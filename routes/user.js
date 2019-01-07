const router = require('koa-router')()
const userBll = require('./../pub/bll/user.js')

router.prefix('/api/user')


router.post('/get', async (ctx, next) => {
  let result = await userBll.getList(ctx)
  ctx.body = result;
})
router.post('/get/aid', async (ctx, next) => {
  let result = await userBll.getInfoByArea(ctx)
  ctx.body = result;
})
router.post('/register', async (ctx, next) => {
  let result = await userBll.register(ctx)
  ctx.body = result;
})
router.post('/login', async (ctx, next) => {
  let result = await userBll.login(ctx)
  ctx.body = result;
})
router.post('/info', async (ctx, next) => {
  let result = await userBll.getUserInfo(ctx)
  ctx.body = result;
})
router.post('/update', async (ctx, next) => {
  let result = await userBll.updateUserInfo(ctx)
  ctx.body = result;
})
router.post('/update/pwd', async (ctx, next) => {
  let result = await userBll.updatePwd(ctx)
  ctx.body = result;
})
router.post('/update/role', async (ctx, next) => {
  let result = await userBll.updateRole(ctx)
  ctx.body = result;
})
router.post('/state/disable', async (ctx, next) => {
  let result = await userBll.disableUser(ctx, 'DISABLE')
  ctx.body = result;
})
router.post('/state/available', async (ctx, next) => {
  let result = await userBll.disableUser(ctx, 'AVAILABLE')
  ctx.body = result;
})

module.exports = router
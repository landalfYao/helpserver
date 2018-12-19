const router = require('koa-router')()
const bll = require('./../pub/bll/secret.js')
router.prefix('/api/secret')
router.post('/encrypt', async (ctx, next) => {
    let result = await bll.setSecret(ctx)
    ctx.body = result;
})

module.exports = router
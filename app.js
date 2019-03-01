const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const cors = require('koa2-cors');
const config = require('./pub/config/config.js');
const session = require('koa-session');
const RedisStore = require('koa2-session-redis');

const index = require('./routes/index')
const user = require('./routes/user')
const secret = require('./routes/secret')
const authorityCategory = require('./routes/authorityCategory')
const authority = require('./routes/authority')
const roles = require('./routes/roles')
const area = require('./routes/area')
const wxuser = require('./routes/wxuser')
const helplist = require('./routes/helplist')
const dlServer = require('./routes/dlServer')
const file = require('./routes/file')
const address = require('./routes/address')
const addressCate = require('./routes/addressCate')
const addressUser = require('./routes/addressUser')
const analysis = require('./routes/analysis')
const capitalTrend = require('./routes/capitalTrend')
const ptfile = require('./routes/ptfile')
const calousels = require('./routes/calousels')
const wallet = require('./routes/wallet')
const richtext = require('./routes/richtext')

const koaBody = require('koa-body');
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 20000 * 1024 * 1024 // 设置上传文件大小最大限制，默认200M
  }
}));
// const secretKey = 'adfbrw32rfr23'
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
// app.use(jwtKoa({secretKey}).unless({
//         path: ['/^\/api\/user\/login/,/^\/api\/user\/register/,/^\/apidoc\/index.html#api-User-Login/'] 
//     }))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['Porschev'];
const redis_conf = {
  key: 'Porschev',
  maxAge: config.REDIS.maxAge,
  overwrite: true,
  httpOnly: true,
  rolling: false,
  sign: true,
  store: new RedisStore({
    host: config.REDIS.host,
    port: config.REDIS.port,
    password: config.REDIS.password
  })
};


app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous', 'token', 'uid'],
}));

app.use(session(redis_conf, app));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(secret.routes(), secret.allowedMethods())
app.use(authorityCategory.routes(), authorityCategory.allowedMethods())
app.use(authority.routes(), authority.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())
app.use(area.routes(), area.allowedMethods())
app.use(wxuser.routes(), wxuser.allowedMethods())
app.use(helplist.routes(), helplist.allowedMethods())
app.use(dlServer.routes(), dlServer.allowedMethods())
app.use(file.routes(), file.allowedMethods())
app.use(address.routes(), address.allowedMethods())
app.use(addressCate.routes(), addressCate.allowedMethods())
app.use(addressUser.routes(), addressUser.allowedMethods())
app.use(analysis.routes(), analysis.allowedMethods())
app.use(capitalTrend.routes(), capitalTrend.allowedMethods())
app.use(ptfile.routes(), ptfile.allowedMethods())
app.use(calousels.routes(), calousels.allowedMethods())
app.use(wallet.routes(), wallet.allowedMethods())
app.use(richtext.routes(), richtext.allowedMethods())

// error-handling 
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




module.exports = app
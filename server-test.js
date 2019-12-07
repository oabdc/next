const Koa = require('koa');
const Router = require('koa-router')
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
// 处理http请求响应
const handle = app.getRequestHandler()

// app.prepare().then(()=> {

    const server  = new Koa()
    const router = new Router()
// 对路径特殊处理
    router.get('/test/:id', (ctx) => {
        // ctx.body = `<p>request /test${ctx.params.id}</p>`
        ctx.body = { success: true}
        ctx.set('Content-type', "application/json")
    })
// 可能使用到多个中间件，但并不知道是否有异步的中间件，所以统一使用async/await
    server.use(async (ctx, next) => {
        // const path = ctx.path;
        // const method = ctx.method
        // // ctx 记录所有请求内容，以及要返回，也挂在上面
        // ctx.body = `koa,${path}${method}`
        await next()
    })

    server.use(router.routes())

    // server.use(async (ctx, next) => {
    //     // ctx 记录所有请求内容，以及要返回，也挂在上面
    //     ctx.body = "<span>Koa render2</span>"
    // })
    // server.use(async (ctx, next) => {
    //     await handle(ctx.req, ctx.res)
    //     ctx.respond = false
    // })
    server.listen(3000, () => {
        console.log('koa server listing 3000');
    })
// })
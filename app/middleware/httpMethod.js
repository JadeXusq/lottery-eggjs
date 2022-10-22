// 判断是否是否支持该请求方法

module.exports = (options, app) => {
  return async function methodHandler(ctx, next) {
    const { method, url } = ctx.request
    const originUrl = url.split('?')[0] // 去除接口参数，保留请求url路径

    const result = app.router.stack.find(item => !!item.regexp.test(originUrl)) // 找到对应路由

    // 接口请求方式不对，报错提示用户
    if (result && !result.methods.includes(method)) {
      ctx.status = 405
      ctx.body = {
        message: `Request method '${method}' not supported, only supported by ${result.methods.map(item => `'${item}'`).join(', ')}`
      }
      return
    }
    await next();
  }
}
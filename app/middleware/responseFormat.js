// 格式化请求数据

module.exports = (options, app) => {
  return async function (ctx, next) {
    await next();
    const { successMessage, successCode, errorMessage, errorCode } = options
    if (ctx.status === 200) {
      ctx.body = {
        ...ctx.body,
        message: ctx.body.message || (ctx.body.param ? successMessage : errorMessage),
        code: ctx.body.param ? successCode : errorCode,
        timestamp: Date.now()
      }
    }
  }
}
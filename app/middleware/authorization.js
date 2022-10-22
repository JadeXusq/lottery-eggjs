// 接口中间件，基于egg-jwt上统一做处理，做用户信息校验白名单及转化token报文格式

module.exports = (options, app) => {
  return async function authorization(ctx, next) {
    if (options.whiteList.some(item => ctx.request.url.startsWith(item))) {
      return await next();
    }

    let token = ctx.request.header.authorization;
    if (token) {
      try {
        token = token.replace('Bearer ', ''); // 先去除Bearer 
        app.userInfo = ctx.app.jwt.verify(token, app.config.jwt.secret); // 解码token,挂载到app上面

        // 保险起见再查询一次数据库，避免用户数据已被删除
        const result = await ctx.service.user.getUserInfo({ phone: app.userInfo.phone })
        if (!result) {
          ctx.status = 401
          ctx.body = {
            message: '用户不存在或已被删除'
          }
          return
        }

        await next();
      } catch (error) {
        // 错误提示处理枚举
        const errorEnum = {
          TokenExpiredError: '登录信息已过期，请重新登录',
          JsonWebTokenError: '不合法的token',
          NotBeforeError: 'jwt not active'
        }

        // 不在枚举中，服务器错误
        if (!errorEnum[error.name]) {
          ctx.status = 500;
          ctx.body = {
            message: error.message
          }
          return
        }

        ctx.status = 401;
        ctx.body = {
          message: errorEnum[error.name] || error.message,
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '登录信息为空，请先登录',
      };
      return;
    }
  };
};
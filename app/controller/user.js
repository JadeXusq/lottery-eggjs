'use strict';

const Controller = require('egg').Controller;
const { tokenExpiresIn } = require('../constant')

class UserController extends Controller {
  // 登录接口
  async login() {
    const { ctx, app } = this

    const data = ctx.request.body; // 获取用户端传递过来的参数
    data.lastLoginTime = Date.now(); // 登录时间

    // 校验数据合法性
    const errs = app.validator.validate({
      userName: 'userName',
      phone: 'phone',
      password: 'password'
    }, data);

    if (errs && errs.length > 0) {
      ctx.body = {
        message: errs.map(err => `${err.field} ${err.message}`).join(', ')
      }
      return
    }

    const result = await ctx.service.user.getUserInfo({ phone: data.phone }); // 把phone当做主键唯一值
    data.password = ctx.service.user.getMd5Data(data.password); // 密码加密

    // 未注册用户直接注册，否则校验数据合法性
    if (!result) {
      await ctx.service.user.insertUser(data)
    } else {
      if (result.userName !== data.userName || result.password !== data.password) {
        ctx.body = {
          message: '用户名或密码有误'
        }
        return
      }
    }

    // 生成 token 的方式
    const token = app.jwt.sign({
      userName: data.userName,
      phone: data.phone,
      // password: data.password // 密码不允许放到jwt里面
    }, app.config.jwt.secret, {
      // 过期时间格式
      /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
      expiresIn: tokenExpiresIn
    });

    ctx.body = {
      param: {
        token: `Bearer ${token}`,
      }
    }
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, app: { userInfo } } = this

    const result = await ctx.service.user.getUserInfo({ phone: userInfo.phone }) // 保险起见再查询一次接口
    ctx.body = {
      param: {
        phone: result.phone,
        userName: result.userName,
      }
    }
  }
}

module.exports = UserController;

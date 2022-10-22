'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 添加用户信息
   * @param {Object} data 
   */
  async insertUser(data = {}) {
    const result = await this.ctx.model.User.insertMany(data)
    return result
  }

  /**
   * 获取用户信息
   * @param {Object} query 查询参数
   * @returns 
   */
  async getUserInfo(query = {}) {
    const result = await this.ctx.model.User.findOne(query)
    return result
  }
}

module.exports = UserService;

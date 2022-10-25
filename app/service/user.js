'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

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

  // 专门对数据进行md5加密的方法，输入明文返回密文
  getMd5Data(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }
}

module.exports = UserService;

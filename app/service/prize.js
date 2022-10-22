'use strict';

const Service = require('egg').Service;

class PrizeService extends Service {
  /**
   * 添加抽奖信息
   * @param {Object} data 
   */
  async insertPrize(data = {}) {
    const result = await this.ctx.model.Prize.insertMany(data)
    return result
  }

  /**
   * 获取中奖信息信息
   * @param {Object} query 查询参数, 默认倒序，20条
   * @returns 
   */
  async getRankList(query = {}, sort = -1, limit = 20) {
    const result = await this.ctx.model.Prize.find(query).sort({ lotteryTime: sort }).limit(limit)
    return result
  }
}

module.exports = PrizeService;

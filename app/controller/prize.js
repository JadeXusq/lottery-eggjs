'use strict';
const dayjs = require('dayjs')

const { prizeList } = require('../constant')

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 获取中奖对应的号码
  async getPrizeNo() {
    const { ctx, app: { userInfo } } = this

    const result = await ctx.service.user.getUserInfo({ phone: userInfo.phone }) // 保险起见再查询一次接口

    const prizeTotal = prizeList.length
    const prizeNo = Math.round(Math.random() * (prizeTotal - 1)) // 中奖号

    if (!prizeList[prizeNo].fail) {
      // 插入数据库
      await ctx.service.prize.insertPrize({
        phone: result.phone,
        userName: result.userName,
        prizeNo,
        lotteryTime: Date.now()
      })
    }

    ctx.body = {
      param: { prizeNo }
    }
  }

  // 获取中奖名单，取最新20名
  async getRankList() {
    const { ctx } = this
    const result = await ctx.service.prize.getRankList()
    ctx.body = {
      param: result.map(item => ({
        phone: item.phone,
        userName: item.userName,
        prizeNo: item.prizeNo,
        lotteryTime: dayjs(item.lotteryTime).format('YYYY-MM-DD HH:mm:ss'),
      }))
    }
  }

  // 获取自己的中奖记录
  async getUserPrizeList() {
    const { ctx, app: { userInfo } } = this
    const result = await ctx.service.prize.getRankList({ phone: userInfo.phone })

    ctx.body = {
      param: result.map(item => ({
        phone: userInfo.phone,
        userName: userInfo.userName,
        prizeNo: item.prizeNo,
        lotteryTime: dayjs(item.lotteryTime).format('YYYY-MM-DD HH:mm:ss'),
      }))
    }
  }
}

module.exports = UserController;

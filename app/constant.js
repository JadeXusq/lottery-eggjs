module.exports = {
  /**
   * 过期时间
   */
  tokenExpiresIn: '2h',

  /**
   * 请求返回默认配置
   */
  responseConfig: {
    successMessage: '操作成功',
    successCode: '00000',
    errorMessage: '未知错误',
    errorCode: '99999'
  },

  /**
   * 奖品列表
   */
  prizeList: [
    {
      title: "网易云音乐会员月卡",
    },
    {
      title: "5元话费券",
    },
    {
      title: "腾讯视频会员月卡",
    },
    {
      title: "QQ音乐会员月卡",
    },
    {
      title: "15元话费券",
    },
    {
      title: "爱奇艺视频会员月卡",
    },
    {
      title: "继续努力",
      fail: true,
    },
    {
      title: "10元话费券",
    },
  ]
}
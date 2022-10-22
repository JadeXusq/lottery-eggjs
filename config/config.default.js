/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1666269700082_9314';

  // add your middleware config here
  config.middleware = ['authorization', 'httpMethod', 'responseFormat'];

  // 默认格式化配置
  config.responseFormat = {
    successMessage: '操作成功',
    successCode: '00000',
    errorMessage: '未知错误',
    errorCode: '99999'
  }

  // 配置免校验登录信息白名单
  config.authorization = {
    whiteList: ['/user/login', '/prize/getRankList'],
  };
  config.jwt = {
    secret: 'YHLottery', // 自定义 token 的加密条件字符串
  };

  // 是否开启csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  // 跨域逻辑判断
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/lottery',
      options: {},
    },
  };

  config.validate = {
    // convert: false,
    // validateRoot: false,
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

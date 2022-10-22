'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/login', controller.user.login);
  router.get('/user/getUserInfo', controller.user.getUserInfo);

  router.get('/prize/getPrizeNo', controller.prize.getPrizeNo);
  router.get('/prize/getRankList', controller.prize.getRankList);
  router.get('/prize/getUserPrizeList', controller.prize.getUserPrizeList);
};

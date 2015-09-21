var mainCtrl = require('./mainCtrl.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  console.log("in mainRoute!")
  app.get('', mainCtrl.getLoginUser);
};
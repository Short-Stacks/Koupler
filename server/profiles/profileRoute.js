var profileCtrl = require('./profileCtrl.js');

module.exports = function (app) {
  console.log("in profileRoute!");
  
  app.get('/:username', profileCtrl.loadProfile);
  app.post('/:username/edit', profileCtrl.editProfile);

  app.post('/:username/addActivity', profileCtrl.addActivity);

  app.get('/:username/pic', profileCtrl.loadProfilePic);
  app.post('/:username/pic', profileCtrl.storeProfilePic);

  //app.get('/:username/memory', profileCtrl.loadMemories);
  //app.post('/:username/memory', profileCtrl.storeToMemories);
};

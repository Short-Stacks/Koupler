var profileCtrl = require('./profileCtrl.js');

module.exports = function (app) {
  console.log("in profileRoute!");
  
  app.get('/:username', profileCtrl.loadProfile);
  app.post('/:username/edit', profileCtrl.editProfile);
<<<<<<< HEAD

  app.post('/:username/addActivity', profileCtrl.addActivity);
=======
>>>>>>> (feature) can fully edit and update profile, can view activities in profile, working on adding activities during edit of profile

  app.get('/:username/pic', profileCtrl.loadProfilePic);
  app.post('/:username/pic', profileCtrl.storeProfilePic);

  //app.get('/:username/memory', profileCtrl.loadMemories);
  //app.post('/:username/memory', profileCtrl.storeToMemories);
};

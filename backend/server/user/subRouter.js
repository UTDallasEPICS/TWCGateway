const controller = require('./userController');
const addRoutes = router => {
  router.post('/user', controller.addUser);

  router.get('/users', controller.getAllUsers);
  router.get('/user/:id', controller.getUserById);
  router.post('/checkEmail/', controller.getUserByEmail); //Why is this a post request? -> https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
  router.get('/users/archived', controller.getAllArchivedUsers);

  router.put('/user/:id', controller.updateUser);
  router.put('/user/archived/:id', controller.updateArchivedUser);
  router.put('/users/archived', controller.updateAllArchivedUsers);

  router.delete('/user/:id', controller.deleteUser);
  router.delete('/users', controller.deleteAllUsers);
  router.delete('/users/archived', controller.deleteAllArchivedUsers);
};
module.exports = {
  addRoutes,
};

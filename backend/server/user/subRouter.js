const controller = require('./userController');

const addRoutes = router => {
  router.post('/user/new-employee-user', controller.addUserEmployee);
  router.post('/user/new-supervisor-user', controller.addUserSupervisor);
  router.post('/user/new-admin-user', controller.addUserAdmin);
  router.post('/checkEmail/', controller.getUserByEmail); //Why is this a post request? -> https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request

  router.get('/users', controller.getAllUsers);
  router.get('/users/employees', controller.getAllEmployeeUsers);
  router.get('/users/supervisors', controller.getAllSupervisorUsers);
  router.get('/users/admins', controller.getAllAdminUsers);
  router.get('/user/:id', controller.getUserById);
  router.get('/users/archived', controller.getAllArchivedUsers);
  router.get('/users/archived/employees', controller.getAllArchivedEmployees);
  router.get('/users/archived/supervisors', controller.getAllArchivedSupervisors);
  router.get('/users/archived/admins', controller.getAllArchivedAdmins);
  router.get('/user/archived/:id', controller.getArchivedUserById);

  router.put('/user/update-user-employee/:id', controller.updateUserEmployee);
  router.put('/user/update-user-supervisor/:id', controller.updateUserSupervisor);
  router.put('/user/update-user-admin/:id', controller.updateUserAdmin);
  router.put('/users/archive/employees', controller.archiveAllEmployees);
  router.put('/users/archive/supervisors', controller.archiveAllSupervisors);

  router.delete('/users/archived', controller.deleteAllArchivedUsers);
  router.delete('/user/archived/:id', controller.deleteArchivedUser);
};

module.exports = {
  addRoutes,
};

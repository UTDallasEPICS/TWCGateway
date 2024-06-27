const controller = require('./usersController');

const addRoutes = router => {
  router.post('/auth', controller.auth);
  router.post('/checkEmail', controller.checkEmail);
  router.post('/addEmployee', controller.addEmployee);
  router.post('/addSupervisor', controller.addSupervisor);
  router.post('/addAdmin', controller.addAdmin);

  router.get('/getAllUsers', controller.getAllUsers);
  router.get('/getAllArchivedUsers', controller.getAllArchivedUsers);
  router.get('/getAllEmployees', controller.getAllEmployees);
  router.get('/getAllArchivedEmployees', controller.getAllArchivedEmployees);
  router.get('/getAllSupervisors', controller.getAllSupervisors);
  router.get(
    '/getAllArchivedSupervisors',
    controller.getAllArchivedSupervisors
  );
  router.get('/getAllAdmins', controller.getAllAdmins);
  router.get('/getAllArchivedAdmins', controller.getAllArchivedAdmins);
  router.get('/getUser/:id', controller.getUser);
  router.get('/getArchivedUser/:id', controller.getArchivedUser);

  router.patch('/archiveUsers', controller.archiveUsers);
  router.patch('/unArchiveUsers', controller.unArchiveUsers);

  router.put('/updateEmployee/:id', controller.updateEmployee);
  router.put('/updateSupervisor/:id', controller.updateSupervisor);
  router.put('/updateAdmin/:id', controller.updateAdmin);

  router.post(
    '/onboardingEmployee/getUserByEmail',
    controller.getOnboardingEmployeeByEmail
  );
  router.post('/supervisor/getUserByEmail', controller.getSupervisorByEmail);
  router.post('/supervisor/getSupervisorTasks', controller.getSupervisorTasks);
  router.post('/supervisor/getEmployeeTasks', controller.getEmployeeTasks);
};

module.exports = {
  addRoutes,
};

const controller = require('./tasksController');

const addRoutes = router => {
  //GET
  router.get('/allTasksForEmployee/:id', controller.getAllTasksForEmployee);
  router.get('/allTasksForSupervisor/:id', controller.getAllTasksForSupervisor);

  //POST
  router.post('/addTaskForDepartment', controller.addTaskForDepartment);
  router.post('/addTaskForSupervisor', controller.addTaskForSupervisor);
  router.post('/addTaskForEmployee', controller.addTaskForEmployee);
};

module.exports = {
  addRoutes,
};

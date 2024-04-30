const controller = require('./tasksController');

const addRoutes = router => {
  //GET
  router.post('/getAllTasksForEmployee/:id', controller.getAllTasksForEmployee);
  router.post(
    '/getAllTasksForSupervisor/:id',
    controller.getAllTasksForSupervisor
  );
  router.post(
    '/getAllTasksForDepartment/:id',
    controller.getAllTasksForDepartment
  );
  router.post(
    '/getAllTasksForAllDepartments',
    controller.getAllTasksForAllDepartments
  );

  router.get(
    '/getAllTaskTagsForEmployee/:id',
    controller.getAllTaskTagsForEmployee
  );
  router.get('/getAllTaskTagsForDepartment/:id', controller.getAllTaskTagsForDepartment);

  //POST
  router.post('/addTaskForDepartment', controller.addTaskForDepartment);
  router.post('/addTaskForSupervisor', controller.addTaskForSupervisor);
  router.post('/addTaskForEmployee', controller.addTaskForEmployee);

  //PUT
  router.put('/archiveTaskForEmployee', controller.archiveTaskForEmployee);
  router.put('/archiveTaskForSupervisor', controller.archiveTaskForSupervisor);
  router.patch('/archiveTasksForDepartment', controller.archiveTasksForDepartment);

  //PATCH
  router.patch('/completeTask', controller.completeTask);
  router.patch('/uncompleteTask', controller.uncompleteTask);
  router.patch('/updateTask', controller.updateTask);
};

module.exports = {
  addRoutes,
};

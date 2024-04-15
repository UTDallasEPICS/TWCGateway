const controller = require('./tasksController');

const addRoutes = router => {
  //GET
  router.post('/getAllTasksForEmployee/:id', controller.getAllTasksForEmployee);
  router.get(
    '/getAllTasksForSupervisor/:id',
    controller.getAllTasksForSupervisor
  );
  router.get(
    '/getAllTasksForDepartment/:id',
    controller.getAllTasksForDepartment
  );
  router.get(
    '/getAllTaskTagsForEmployee/:id',
    controller.getAllTaskTagsForEmployee
  );

  //POST
  router.post('/addTaskForDepartment', controller.addTaskForDepartment);
  router.post('/addTaskForSupervisor', controller.addTaskForSupervisor);
  router.post('/addTaskForEmployee', controller.addTaskForEmployee);

  //PUT
  router.put('/archiveTaskForEmployee', controller.archiveTaskForEmployee);
  router.put('/archiveTaskForSupervisor', controller.archiveTaskForSupervisor);
  router.put('/archiveTaskForDepartment', controller.archiveTaskForDepartment);

  //PATCH
  router.patch('/completeTask', controller.completeTask);
  router.patch('/uncompleteTask', controller.uncompleteTask);
  router.patch('/updateTask', controller.updateTask);
};

module.exports = {
  addRoutes,
};

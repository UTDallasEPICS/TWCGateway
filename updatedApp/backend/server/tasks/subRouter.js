const controller = require('./tasksController');

const addRoutes = router => {
  //GET
  router.get('/getAllTasksForEmployee/:id', controller.getAllTasksForEmployee);
  router.get('/getAllTasksForSupervisor/:id', controller.getAllTasksForSupervisor);

  //POST
  router.post('/addTaskForDepartment', controller.addTaskForDepartment);
  router.post('/addTaskForSupervisor', controller.addTaskForSupervisor);
  router.post('/addTaskForEmployee', controller.addTaskForEmployee); 

  //PUT
  router.put('/archiveTaskForEmployee', controller.archiveTaskForEmployee);
  router.put('/archiveTaskForSupervisor', controller.archiveTaskForSupervisor);
  router.put('/archiveTaskForDepartment', controller.archiveTaskForDepartment);
  
//   router.put('/task/update-employee-task/:id', controller.updateEmployeeTask);
//   router.put('/task/update-department-task/:id', controller.updateDepartmentTask);  
  
//   //PATCH
//   router.patch('/task/complete-task/', controller.completeTask);
//   router.patch('/task/uncomplete-task/', controller.uncompleteTask);

};

module.exports = {
  addRoutes,
};


// const taskController = require('./taskController');

// module.exports = {
//     getTaskRoutes: function(router) {
//         router.get('/getAllTasks', taskController.getAllTasks);
//     }
// };

const controller = require('./taskController');
const addRoutes = (router) => {
    router.post('/task', controller.addTask);
    router.get('/tasks', controller.getAllTasks);

    router.get('/task/:id', controller.getTaskByID);
    router.delete('/task/:id', controller.deleteTask);

    router.put('/updateTask/:id', controller.updateTask);



   // router.get('/departments/tasks', controller.getAllDepartmentsTasks)
   // router.get('/department/tasks', controller.getAllDepartmentTasks)
   // router.get('/users/tasks', controller.getAllUsersTasks)
   // router.get('/user/tasks', controller.getAllUserTasks)
}
module.exports = {
    addRoutes,
  };


const controller = require('./departmentsController');

const addRoutes = (router) => {
  router.get('/getAllDepartments', controller.getAllDepartments);
  router.get('/getDepartment/:id', controller.getDepartment);
  router.patch('/updateDepartmentName', controller.updateDepartmentName);
  router.post('/addDepartment', controller.addDepartment);
  router.patch('/archiveDepartments', controller.archiveDepartments);
};

module.exports = {
  addRoutes,
};

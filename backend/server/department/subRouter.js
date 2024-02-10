const controller = require('./departmentController');
const addRoutes = router => {
  router.get('/departments', controller.getAllDepartments);
  router.put('/department/:id', controller.updateDepartment);
  router.put('/department/archive/:id', controller.archiveDepartment);

  router.get('/departments/archived', controller.getAllArchivedDepartments);
  router.put('/department/unarchive/:id', controller.unarchiveDepartment);
};
module.exports = {
  addRoutes,
};

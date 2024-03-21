const controller = require('./departmentsController');

const addRoutes = (router) => {
  router.get('/getAllDepartments', controller.getAllDepartments);
};

module.exports = {
  addRoutes,
};

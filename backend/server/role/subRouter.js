const controller = require('./roleController');
const addRoutes = router => {
  router.get('/roles', controller.getAllRoles);
};
module.exports = {
  addRoutes,
};

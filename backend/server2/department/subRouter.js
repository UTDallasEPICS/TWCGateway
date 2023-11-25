const controller = require('./departmentController');
const addRoutes = (router) => {
    router.get('/departments', controller.getAllDepartments);
}
module.exports = {
    addRoutes
}
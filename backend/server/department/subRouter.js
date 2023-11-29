const controller = require('./departmentController');
const addRoutes = (router) => {
    router.get('/departments', controller.getAllDepartments);
    router.put('/department/:id', controller.updateDepartment);
    router.put('/department/archive/:id', controller.archiveDepartment);
}
module.exports = {
    addRoutes
}
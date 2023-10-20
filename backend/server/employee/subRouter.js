const controller = require('./employeeController');
const addRoutes = (router) => {
    router.route('/employee').get(controller.getAllEmployees)

    router.route('/employee/:id').get(controller.getEmployee)
}
module.exports = {
    addRoutes
}
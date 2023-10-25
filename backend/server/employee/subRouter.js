const controller = require('./employeeController');
const addRoutes = (router) => {
    router.route('/employee').post(controller.addEmployee)

    router.route('/employee').get(controller.getAllEmployees)

    router.route('/employee/:id').get(controller.getEmployeeByID)

    router.route('employee/:email').get(controller.getEmployeeByEmail)

    router.route('/deleteEmployee/:id').delete(controller.deleteEmployee)
}
module.exports = {
    addRoutes
}
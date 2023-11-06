const controller = require('./employeeController');
const addRoutes = (router) => {
    router.route('/addEmployee').post(controller.addEmployee)

    router.route('/getAllEmployees').get(controller.getAllEmployees)

    router.route('/getEmployee/:id').get(controller.getEmployeeByID)

    router.route('getEmployee/:email').get(controller.getEmployeeByEmail)

    router.route('/deleteEmployee/:id').delete(controller.deleteEmployee)
}
module.exports = {
    addRoutes
}
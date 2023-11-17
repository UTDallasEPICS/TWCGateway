const controller = require('./userController');
const addRoutes = (router) => {
    router.route('/addUser').post(controller.addUser)

    router.route('/getAllUsers').get(controller.getAllUsers)

    router.route('/getUser/:id').get(controller.getUserByID)

    router.route('/getUserByEmail').get(controller.getUserByEmail)

    router.route('/updateUser/:id').put(controller.updateUser)

    router.route('/deleteUser/:id').delete(controller.deleteUser)
}
module.exports = {
    addRoutes
}
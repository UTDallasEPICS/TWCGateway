const controller = require('./userController');
const addRoutes = (router) => {
    router.post('/user', controller.addUser);
    router.get('/users', controller.getAllUsers);
    router.get('/user/:id', controller.getUserById);
    router.get('/checkEmail/:email', controller.getUserByEmail);
    router.put('/user/:id', controller.updateUser);
    router.delete('/user/:id', controller.deleteUser);
    router.delete('/users', controller.deleteAllUsers);
    router.get('/users/archived', controller.getAllArchivedUsers);
    router.put('/user/archived/:id', controller.updateArchivedUser);
    router.put('/users/archived', controller.updateAllArchivedUsers);
    router.delete('/users/archived', controller.deleteAllArchivedUsers);
}
module.exports = {
    addRoutes
}
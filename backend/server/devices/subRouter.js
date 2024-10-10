const controller = require('./deviceController');

const addRoutes = router => {
  router.get('/getAllDevices', controller.getAllDevices);
  router.get('/getDeviceID/:id', controller.getDeviceID);
  router.get('/getDeviceSerial/:serialNumber', controller.getDeviceSerial);
  router.post('/createDevice', controller.createDevice);
  router.put('/updateDevice', controller.updateDevice);
  router.put('/deleteDevice', controller.deleteDevice);
  router.get('/getDeviceByUser/:userId', controller.getDeviceByUser);
};

module.exports = {
  addRoutes,
};

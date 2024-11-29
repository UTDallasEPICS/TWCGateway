const controller = require('./checkoutController');

//getCheckouts 
//getCheckouts based on user 
//getCheckouts based on devices
//update checkout
//create checkout

const addRoutes = (router) => {
router.get('/checkouts', controller.getCheckouts);
router.get('/checkouts/user/:userId', controller.getCheckoutsByUser);
router.get('/checkouts/device/:deviceId', controller.getCheckoutsByDevice);
router.get('/getCheckoutsBySerial/:serialNumber', controller.getCheckoutsByDeviceSerial);
router.put('/updateCheckout/:id', controller.updateCheckout);
router.post('/createCheckout', controller.createCheckout);
router.patch('/archiveCheckout', controller.archiveCheckout);
  };
  
  module.exports = {
    addRoutes,
  };


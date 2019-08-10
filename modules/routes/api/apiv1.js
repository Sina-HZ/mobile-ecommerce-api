const express = require('express');
const router = express.Router();

//Middleware
const {uploadImage} = require('./middleware/uploadImage');
const apiAuth = require('./middleware/apiAuth');

//Controllers
const MobileController = require(`${config.controllers.apiv1}/MobileController`);
const AuthController = require(`${config.controllers.apiv1}/AuthController`);

//AdminControllers
const AdminMobileController = require(`${config.controllers.apiv1}/admin/MobileController`)

//Authenticat Api
router.post('/login',AuthController.login.bind(AuthController));
router.post('/regist',AuthController.register.bind(AuthController));
router.get('/logout',AuthController.logout.bind(AuthController));


//Product API
router.get('/mobile', MobileController.index.bind(MobileController));


const adminRouter = express.Router();
router.post('/mobile', apiAuth, uploadImage.single('MobileImg'), AdminMobileController.store.bind(AdminMobileController));
router.put('/mobile/:id', apiAuth, AdminMobileController.update.bind(AdminMobileController));
router.delete('/mobile/:id', apiAuth, AdminMobileController.remove.bind(AdminMobileController));
router.use('/admin', adminRouter)
module.exports = router;
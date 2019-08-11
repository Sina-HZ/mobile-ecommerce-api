const express = require('express');
const router = express.Router();

//Middleware
const {uploadImage} = require('./middleware/uploadImage');
// const apiAuth = require('./middleware/apiAuth');
const roleRestrictionAdmin = require('./middleware/roleRestrictionAdmin');
const roleRestriction = require('./middleware/roleRestriction');
//Controllers
const MobileController = require(`${config.controllers.apiv1}/MobileController`);
const AuthController = require(`${config.controllers.apiv1}/AuthController`);

//ExpertController


//AdminControllers
const AdminMobileController = require(`${config.controllers.apiv1}/admin/MobileController`)
const AdminUserController = require(`${config.controllers.apiv1}/admin/UserController`)

//Authenticat Api
router.post('/login',AuthController.login.bind(AuthController));
router.post('/register',AuthController.register.bind(AuthController));
router.post('/logout',AuthController.logout.bind(AuthController));


//Product API
router.get('/mobile', MobileController.index.bind(MobileController));
router.post('/mobile', roleRestriction, uploadImage.single('MobileImg'), AdminMobileController.store.bind(AdminMobileController));
router.put('/mobile/:id', roleRestriction, AdminMobileController.update.bind(AdminMobileController));
router.delete('/mobile/:id', roleRestriction, AdminMobileController.remove.bind(AdminMobileController));

//User API
router.get('/user', roleRestrictionAdmin, AdminUserController.index.bind(AdminUserController));
router.post('/user', roleRestrictionAdmin, uploadImage.single('MobileImg'), AdminUserController.addUser.bind(AdminUserController));
router.put('/user/:id', roleRestrictionAdmin, AdminUserController.updateUser.bind(AdminUserController));
router.delete('/user/:id', roleRestrictionAdmin, AdminUserController.removeUser.bind(AdminUserController));

module.exports = router;
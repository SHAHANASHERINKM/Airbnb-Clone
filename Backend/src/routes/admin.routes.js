const express=require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware=require('../middlewares/roleMiddleware')
const router=express.Router();

router.get('/',adminController.home)
router.patch('/block-user/:id',authMiddleware,roleMiddleware("admin"),adminController.blockUser);
router.patch('/unblock-user/:id',authMiddleware,roleMiddleware("admin"),adminController.unblockUser);
router.patch('/block-host/:id',authMiddleware,roleMiddleware("admin"),adminController.blockHost);
router.patch('/unblock-host/:id',authMiddleware,roleMiddleware("admin"),adminController.unblockHost);
router.patch('/host-approval/:id',authMiddleware,roleMiddleware("admin"),adminController.approveHost)
router.get('/users',authMiddleware,roleMiddleware("admin"),adminController.getAllUsers);  //query for user and host
router.get('/properties',authMiddleware,roleMiddleware("admin"),adminController.getProperties);  //Query based on status.
router.patch('/property/:id/approve',authMiddleware,roleMiddleware("admin"),adminController.approveProperty);
router.patch('/property/:id/reject',authMiddleware,roleMiddleware('admin'),adminController.rejectProperty);
router.post("/cancellation-policy",authMiddleware,roleMiddleware("admin"),adminController.setCancellationPolicy);
router.get('/bookings',authMiddleware,roleMiddleware("admin"),adminController.getAllBookings);

module.exports=router;
const express=require('express');
const router=express.Router();
///console.log("In index routes");
const userRoutes=require('./user.routes');
const hostRoutes=require('./host.routes');
const adminRoutes=require('./admin.routes');
const authRoutes=require('./auth.routes');
const bookingRoutes=require('./booking.routes');



router.use('/users',userRoutes);
router.use('/host',hostRoutes);
router.use('/admin',adminRoutes)
router.use('/auth',authRoutes);
router.use('/bookings',bookingRoutes);

module.exports=router;
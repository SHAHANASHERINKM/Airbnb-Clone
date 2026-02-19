const express=require("express");
const router=express.Router();
const bookingController=require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post('/check-availabilty',bookingController.checkAvailabilty);
router.post('/booking',authMiddleware,bookingController.createBooking);
router.patch('/:id/pay',authMiddleware,bookingController.fakePayment);
router.patch('/:id/cancel-booking',authMiddleware,bookingController.cancelBooking);
router.get('/cancellation-policy',bookingController.getCancellationPolicy);
router.get('/booking/:id',authMiddleware,bookingController.getSinlgeBooking);

module.exports=router;
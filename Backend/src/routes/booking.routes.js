const express=require("express");
const router=express.Router();
const bookingController=require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post('/check-availabilty',authMiddleware,bookingController.checkAvailabilty);
router.post('/booking',authMiddleware,bookingController.createBooking);
router.patch('/:id/pay',authMiddleware,bookingController.fakePayment);
router.patch('/:id/cancel-booking',authMiddleware,bookingController.cancelBooking);
router.get('/cancellation-policy',authMiddleware,bookingController.getCancellationPolicy)

module.exports=router;
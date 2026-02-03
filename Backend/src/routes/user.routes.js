const express=require('express');
const router=express.Router();
const userController=require("../controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

//router.get('/',userController.home)
router.put('/become-host',authMiddleware,userController.becomeHost);
router.get("/properties",authMiddleware,roleMiddleware("user","host"),userController.getProperties);
router.get('/property/:id',authMiddleware,roleMiddleware("user","host"),userController.getSingleProperty);
router.get('/my-bookings',authMiddleware,userController.getBookings);
router.get('/search-properties',authMiddleware,userController.searchProperties);
router.post('/review',authMiddleware,userController.addReview);
router.get('/review/:id',authMiddleware,userController.getReview);
router.post('/:id/wishlist',authMiddleware,userController.WishList);
router.get('/wishlist',authMiddleware,userController.viewWishlist);


module.exports= router;
const express=require('express');;
const router=express.Router();
const hostController=require('../controllers/hostController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload=require("../middlewares/cloudinaryUpload");
const hostBlockMiddleware = require('../middlewares/hostBlockMiddleware');


router.get('/',hostController.home)
router.post('/property',authMiddleware,roleMiddleware("host"),hostBlockMiddleware,upload.array("images",5),hostController.addProperty);
router.get("/properties",authMiddleware,roleMiddleware("host"),hostController.getMyProperties);
router.patch("/property/:id",authMiddleware,roleMiddleware("host"),hostBlockMiddleware,upload.array("images",5),hostController.updateProperty);
router.delete("/property/:id",authMiddleware,roleMiddleware("host"),hostBlockMiddleware,hostController.deleteProperty);
router.get("/property/:id/bookings",authMiddleware,roleMiddleware("host"),hostController.getBookings);
router.get("/AllBookings" ,authMiddleware,roleMiddleware("host"),hostController.getAllBookings)
module.exports=router;
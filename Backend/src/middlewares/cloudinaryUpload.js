//cloudinaryUpload.js
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Store in RAM (NOT cloud)//Store in ram to avoid multiple image upload when db fails
const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;

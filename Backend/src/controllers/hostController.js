const Property = require('../models/propertyModel')
const cloudinary = require("../config/cloudinary");
const Booking=require("../models/bookingModel");
module.exports = {
  home: (req, res) => {
    res.send("hello host")
  },
  addProperty: async (req, res) => {
    const images = [];
    try {
      const hostId = req.user.id;

      // Validate required fields BEFORE upload
      const requiredFields = ["title", "description", "location", "roomType", "maxGuests", "pricePerNight"];
      for (let field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({ message: `${field} is required` });
        }
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "At least one image is required" });
      }

      // Upload images to Cloudinary
      for (const file of req.files) {
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        const publicId = `${req.user.id}-${Date.now()}-${file.originalname}`; // Unique ID
        const result = await cloudinary.uploader.upload(dataUri, {
          folder: "airbnb-properties",
          public_id: publicId,
          overwrite: false
        });

        images.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }


      // Save property in DB
      const property = await Property.create({
        ...req.body,
        images,
        host: hostId,
        status: "pending",
      });

      res.status(201).json({
        success: true,
        message: "Property submitted for approval",
        property,
      });

    } catch (error) {
      // Delete images uploaded in this request if something fails
      for (const img of images) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
        } catch (deleteError) {
          console.error("Failed to delete image:", deleteError);
        }
      }

      console.error("Add property error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
  getMyProperties: async (req, res) => {
    try {
      const hostId = req.user.id;
      const properties = await Property.find({ host: hostId });
      if (properties.length === 0) {
        return res.status(200).json({
          success: true,
          message: "You have not added any properties yet",
          properties: []
        });
      }
      res.status(200).json({
        success: true,
        count: properties.length,
        properties
      });
    }
    catch (error) {
      console.error("Error while fetching host properties", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })

    }
  },
  updateProperty: async (req, res) => {
    const newImages = [];
    try {
      const hostId = req.user.id;
      const propertyId = req.params.id;

      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ success: false, message: "Property not found" });
      }

      if (property.host.toString() !== hostId) {
        return res.status(403).json({ success: false, message: "Not authorized" });
      }

      // ================= DELETE IMAGES =================
      if (req.body.removeImages) {
        const removeImages = JSON.parse(req.body.removeImages); // array of public_ids

        for (const publicId of removeImages) {
          await cloudinary.uploader.destroy(publicId);

          // remove from DB
          property.images = property.images.filter(img => img.public_id !== publicId);
        }
      }

      // ================= ADD NEW IMAGES =================
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const base64 = file.buffer.toString("base64");
          const dataUri = `data:${file.mimetype};base64,${base64}`;

          const result = await cloudinary.uploader.upload(dataUri, {
            folder: "airbnb-properties",
            public_id: `${hostId}-${Date.now()}-${file.originalname}`,
          });

          newImages.push({
            url: result.secure_url,
            public_id: result.public_id
          });
        }

        property.images.push(...newImages);
      }

      // ================= UPDATE OTHER FIELDS =================
      Object.assign(property, req.body);

      await property.save();

      res.status(200).json({
        success: true,
        message: "Property updated successfully",
        property
      });

    } catch (error) {

      // rollback newly uploaded images if DB fails
      for (const img of newImages) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
        } catch (e) { }
      }

      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
  deleteProperty: async (req, res) => {
    try {
      const propertyId = req.params.id;
      const hostId = req.user.id;
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found"
        });
      }
      if (property.host.toString() !== hostId) {
        return res.status(403).json({
          success: false,
          message: "Not authorised to delete this property"
        });

      }
      for (const img of property.images) {
        try {
          await cloudinary.uploader.destroy(img.public_id);

        }
        catch (err) {
          console.error("Cloudinary delete fails", err);

        }
      }
      await Property.findByIdAndDelete(propertyId);
      res.status(200).json({
        success: false,
        message: "Property deleted successfully"
      });
    }
    catch (error) {
      console.error("delete property error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })

    }
  },
  //booking for a single property
  getBookings:async(req,res)=>{
    try{
      const propertyId=req.params.id;
      
      const statusFilter=req.query.status;
      const filter={};
      if(statusFilter){
        filter.status=statusFilter;
      }
      filter.property=propertyId;
      const property=await Property.findById(propertyId);
      if(!property){
        return res.status(404).json({
          success:false,
          message:"Property not found"
        });

      }
      
      if(property.host.toString()!==req.user.id.toString()){
        return res.status(403).json({
          success:false,
          message:"Access denieddd"
        });
      }
      const bookings=await Booking.find(filter).populate("user","name email").populate("property","title location pricePerNight");
      if(bookings.length===0){
        return res.status(200).json({
          success:true,
          message:`No ${statusFilter} property`,
          count:0,
          bookings:[]
        });
      }

      return res.status(200).json({
        success:true,
        message:"Bookings fetched successfully",
        count:bookings.length,
        bookings
      });



    }
    catch(error){
      console.error("Booking fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })


    }
  }












};
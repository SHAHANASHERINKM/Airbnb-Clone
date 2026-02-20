import React, { useEffect, useRef, useState } from "react";
import { addProperty, getSingleProperty, updateProperty } from "../../services/propertyService";
import { useNavigate, useParams } from "react-router-dom";


const AMENITIES = [
  "WiFi",
  "AC",
  "Kitchen",
  "Washing Machine",
  "Free Parking",
  "Pool",
  "TV",
  "Heater",
  "Workspace",
  "Pets Allowed",
];

function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const isEdit = !!id;
  const [imagePreview, setImagePreview] = useState([]);
  const fileInputRef = useRef(null);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    roomType: "entire",
    propertyType: "house",
    maxGuests: 1,
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: "",
    amenities: [],
    instructions: "",
    blockedDate: [{ startDate: "", endDate: "" }],
  });

  const [existingImages, setExistingImages] = useState([]);
const [images, setImages] = useState([]); // new files
const [removeImages, setRemoveImages] = useState([]);


  useEffect(() => {
    if (!isEdit) return;

    const fetchProperty = async () => {
      const res = await getSingleProperty(id);
      const property = res.property;
      console.log("prope", property)
      setFormData({
        title: property.title,
        description: property.description,
        location: property.location,
        roomType: property.roomType,
        propertyType: property.propertyType,
        maxGuests: property.maxGuests,
        beds: property.beds,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        pricePerNight: property.pricePerNight,
        amenities: property.amenities || [],
        instructions: property.instructions || "",
        blockedDate:
          property.blockedDate?.length > 0
            ? property.blockedDate
            : [{ startDate: "", endDate: "" }],
      });
      
    setExistingImages(property.images || []);
    };

    fetchProperty();
  }, [id, isEdit]);

  useEffect(() => {
    return () => {
      imagePreview.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, [imagePreview]);



  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === "startDate" || name === "endDate") {
      setFormData((prev) => ({
        ...prev, blockedDate: [
          {
            ...prev.blockedDate[0],
            [name]: value,
          },
        ],
      }));
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // ===== AMENITIES =====
  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // ===== IMAGES =====
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length !== 5) {
      alert("Upload exactly 5 images");
      return;
    }

    const previews = files.map((file) => ({
      id: crypto.randomUUID(),   // unique id
      file,
      url: URL.createObjectURL(file),
    }));

    setImagePreview(previews);
    setImages(files);

  };

 const removeImage = (id) => {
  setImagePreview((prev) => {
    const updated = prev.filter((img) => img.id !== id);

    
    setImages(updated.map((img) => img.file));

    return updated;
  });

  // reset input if all removed
  if (imagePreview.length === 1 && fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const removeExistingImage = (publicId) => {
  // remove from UI
  setExistingImages((prev) =>
    prev.filter((img) => img.public_id !== publicId)
  );

  // send to backend later
  setRemoveImages((prev) => [...prev, publicId]);
};





  const handleSubmit = async (e) => {
    e.preventDefault();

   if (!isEdit && images.length !== 5) {
  alert("Please upload exactly 5 images");
  return;
}


    try {
      setLoading(true);
      const submitData = new FormData();

      // simple fields
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("location", formData.location);
      submitData.append("roomType", formData.roomType);
      submitData.append("propertyType", formData.propertyType);
      submitData.append("maxGuests", formData.maxGuests);
      submitData.append("beds", formData.beds);
      submitData.append("bedrooms", formData.bedrooms);
      submitData.append("bathrooms", formData.bathrooms);
      submitData.append("pricePerNight", formData.pricePerNight);
      submitData.append("instructions", formData.instructions);
      submitData.append(
        "blockedDate",
        JSON.stringify(formData.blockedDate)
      );
      // send removed images
submitData.append(
  "removeImages",
  JSON.stringify(removeImages)
);


      // amenities (array)
      formData.amenities.forEach((item) => {
        submitData.append("amenities", item);
      });

      // images (VERY IMPORTANT)
      images.forEach((img) => {
        submitData.append("images", img);
      });

      console.log("Submitting property...", submitData);
let res;
      if (isEdit) {
        res = await updateProperty(id, submitData);
      } else {
        res = await addProperty(submitData); // POST API
      }
      //  console.log("res",res)
      alert(res.message);
      navigate("/host/property")


    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false)
    }
  };


  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold text-primary mb-6">
       { isEdit?"Edit Property":"Add Property"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">


        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="entire">Entire</option>
              <option value="private">Private</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="hotel">Hotel</option>
              <option value="guesthouse">Guesthouse</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div>
            <label className="block mb-1 font-medium">Guests</label>
            <input type="number" name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Beds</label>
            <input type="number" name="beds"
              value={formData.beds}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Bedrooms</label>
            <input type="number" name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Bathrooms</label>
            <input type="number" name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div>
          <label className="block mb-1 font-medium">Price Per Night (₹)</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {AMENITIES.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Blocked Dates</label>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              name="startDate"
              value={formData.blockedDate[0]?.startDate?.split("T")[0] || ""}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              name="endDate"
              value={formData.blockedDate[0]?.endDate?.split("T")[0] || ""}
              onChange={handleChange}
              className="border rounded-lg p-3"
            />
          </div>
        </div>


        <div>
          <label className="block mb-1 font-medium">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Upload Exactly 5 Images
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="w-full border rounded-lg p-3"
          />
          <p className="text-sm text-gray-500 mt-1">
            Selected: {images.length}/5
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {imagePreview.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={img.url}
                alt="preview"
                className="h-24 w-full object-cover rounded"
              />

              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6"
              >
                ✕
              </button>
            </div>
          ))}

        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
  {existingImages.map((img) => (
    <div key={img.public_id} className="relative">

      <img
        src={img.url}
        alt="property"
        className="h-24 w-full object-cover rounded-lg"
      />

      <button
        type="button"
        onClick={() => removeExistingImage(img.public_id)}
        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6"
      >
        ✕
      </button>

    </div>
  ))}
</div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:opacity-90"
            }`}
        >
          {loading ? "Submitting..." :isEdit?"Edit Property": "Add Property"}
        </button>


      </form>
    </div>
  );
}

export default AddProperty;

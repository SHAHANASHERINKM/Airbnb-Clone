import React from "react";

function FeaturesCard({ property }) {
  return (
    <div className="w-full bg-white border border-gray-200 shadow-lg rounded-2xl p-6">

      <h2 className="text-xl font-semibold mb-4">Room Details</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">


        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Bedrooms</p>
          <p className="font-semibold">{property.bedrooms}</p>
        </div>

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Beds</p>
          <p className="font-semibold">{property.beds}</p>
        </div>

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Bathrooms</p>
          <p className="font-semibold">{property.bathrooms} </p>
        </div>

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Property Type</p>
          <p className="font-semibold">{property.propertyType} </p>
        </div>

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Room Type</p>
          <p className="font-semibold">{property.roomType} </p>
        </div>

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-xs">Guests</p>
          <p className="font-semibold">{property.maxGuests}</p>
        </div>
  
      </div>
           
     {property?.amenities?.length > 0 && (
  <div>
    <h3 className="text-lg font-semibold mt-6 mb-3">What we offer</h3>

    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {property.amenities.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default FeaturesCard;

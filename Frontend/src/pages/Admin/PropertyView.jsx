import React, { useEffect, useState } from "react";
import { MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { approveProperty, getSingleProperty, rejectProperty } from "../../services/propertyService";

export default function PropertyView() {
    const { propertyId } = useParams();
    const [property, setProperty] = useState();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await getSingleProperty(propertyId);
                console.log("response", res);
                setProperty(res.property);
            } catch (error) {
                alert(error?.response?.data?.message || "Something went wrong");
            }
        };

        if (propertyId) {
            fetchProperty();
        }
    }, [propertyId]);

    const data = property;
    if (!property) {
        return <div className="p-6">Loading...</div>;
    }
    const mainImage = data.images[0];
    const smallImages = data.images.slice(1, 5);

    
      const handleApprove = async () => {
        try {
          const res = await approveProperty(propertyId);
          const updatedProperty = res.property;
          setProperty(updatedProperty)
          console.log(res);
          alert(res.message);
    
    
        }
        catch (error) {
          alert(error?.response?.data?.message || "something wrong")
        }
      }
    
      const handleReject = async () => {
        try {
          const res = await rejectProperty(propertyId);
          const updatedProperty = res.property;
          setProperty(updatedProperty);
          console.log(res);
          alert(res.message);
    
    
        }
        catch (error) {
          alert(error?.response?.data?.message || "something wrong")
        }
      }
    


    return (
        <div className="w-full space-y-8">

            {/* Header + Buttons */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {property.title}
                </h1>

                {data.status === "pending" && (
                    <div className="flex gap-3">
                        <button onClick={handleApprove} className="px-5 py-2 rounded-xl bg-green-600 text-white">
                            Approve
                        </button>
                        <button onClick={handleReject} className="px-5 py-2 rounded-xl bg-red-600 text-white">
                            Reject
                        </button>
                    </div>
                )}
                {data.status==="rejected" && (
                    <div className="flex gap-3">
                        <button onClick={handleApprove} className="px-5 py-2 rounded-xl bg-green-600 text-white">
                            Reapprove
                        </button>
                        
                    </div>
                )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-500">
                <MapPinIcon className="w-4 h-4" />
                {data.location}
            </div>

            <div className="w-full mt-10">
                <div className="grid md:grid-cols-3 gap-4">

                    {/* Large Image */}
                    <div className="md:col-span-2 h-64 md:h-[380px] rounded-lg overflow-hidden">
                        <img
                            src={mainImage.url}
                            alt="Main"
                            className="w-full h-full object-cover "
                        />
                    </div>

                    {/* Small Images Grid */}
                    <div className="grid grid-cols-2 gap-4 h-64 md:h-[380px]">
                        {smallImages.map((img) => (
                            <div key={img._id} className="h-full rounded-lg overflow-hidden">
                                <img
                                    src={img.url}
                                    alt="Small"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Property Details + Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

                <div>
                    <h2 className="text-lg font-semibold text-[#0F766E]">
                        Property Details
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                        <div><strong>Guests:</strong> {data.maxGuests}</div>
                        <div><strong>Bedrooms:</strong> {data.bedrooms}</div>
                        <div><strong>Beds:</strong> {data.beds}</div>
                        <div><strong>Bathrooms:</strong> {data.bathrooms}</div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-[#0F766E] mb-2">
                        Description
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {data.description}
                    </p>
                </div>

            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-[#0F766E] mb-4">
                    Amenities
                </h2>

                {data.amenities && data.amenities.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {data.amenities.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">
                        No amenities provided
                    </p>
                )}
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
                <h2 className="text-lg font-semibold text-[#0F766E]">
                    Host Information
                </h2>

                {data.host ? (
                    <>
                        <div className="flex items-center gap-3">
                            <UserIcon className="w-5 h-5 text-[#0F766E]" />
                            <p className="font-medium">{data.host.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                            {data.host.email}
                        </p>
                    </>
                ) : (
                    <p className="text-red-500 text-sm">
                        Host not available
                    </p>
                )}
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
                <h2 className="text-lg font-semibold text-[#0F766E]">
                    Pricing
                </h2>

                <p className="text-3xl font-bold text-[#0F766E]">
                    ₹{data.pricePerNight}
                    <span className="text-sm text-gray-500 font-normal">
                        /night
                    </span>
                </p>
            </div>

            {/* Submission Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
                <h2 className="text-lg font-semibold text-[#0F766E]">
                    Submission Info
                </h2>

                <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{data.status}</span>
                </p>

                <p className="text-sm text-gray-500">
                    Submitted on:{" "}
                    {new Date(data.createdAt).toDateString()}
                </p>
            </div>

        </div>
    );
}

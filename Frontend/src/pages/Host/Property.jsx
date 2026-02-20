
import React, { useEffect, useState } from "react";
import { deleteProperty, fetchHostProperties } from "../../services/propertyService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Property() {

    const [property, setProperty] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetchHostProperties();
                setProperty(res.properties);
            }
            catch (error) {
                alert(error?.response?.data.message);
            }
        }
        fetchProperties();
    }, []);
  

    const handleDelete = async (propertyId) => {
        const confirm = window.confirm("Are you sure to delete this property?");
        if (!confirm) return;
        try {
            const res = await deleteProperty(propertyId);
            setProperty((prev) =>
                prev.filter((property) => property._id !== propertyId)
            );
            alert(res.message)
        }
        catch (error) {
            alert(error?.response?.data.message);
        }
    }

    return (
        <div>
 
            <h1 className="text-2xl font-bold mb-2 text-dark">
                My Properties
            </h1>

            <p className="text-gray-500  mb-5">
                    Manage and view all your properties.
                </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {property?.map((property) => (
                    <div
                        key={property._id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition"
                        onClick={()=>navigate(`/property-details/${property._id}`)}
                    >

                        <img
                            src={property.images?.[0]?.url}
                            alt={property.title}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4">
                            <h2 className="font-semibold text-lg truncate">
                                {property.title}
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                {property.location}
                            </p>

                            <p className="text-primary font-semibold mt-2">
                                ₹{property.pricePerNight} / night
                            </p>

                            <span
                                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${property.status === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : property.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : property.status === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-red-100 text-gray-700"
                                    }`}
                            >
                                {property.status}
                            </span>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 mt-4">
                                <button  onClick={(e)=>{
                                    e.stopPropagation();
                                    navigate(`/host/editProperty/${property._id}`)
                                }
                                    } className="flex items-center px-3 rounded-lg bg-bg  text-primary py-2  hover:opacity-60">
                                    <PencilIcon className="w-4 h-4" />
                                    Edit
                                </button>

                                <button onClick={(e) =>{ e.stopPropagation();handleDelete(property._id)}} className="flex  items-center py-1 text-red-500 bg-red-50 px-5 rounded-lg hover:opacity-60">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Property;


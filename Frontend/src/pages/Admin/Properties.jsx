import React, { useEffect, useState } from "react";
import { approveProperty, fetchPropertiesAdmin, rejectProperty } from "../../services/propertyService";
import { useNavigate } from "react-router-dom";

export default function Properties() {

  // demo data (replace with API data)
  //   const [properties, setProperties] = useState([
  //     {
  //       _id: "1",
  //       title: "Luxury Beach Villa",
  //       location: "Goa, India",
  //       hostName: "Sarah",
  //       pricePerNight: 4500,
  //       status: "pending",
  //       image:
  //         "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  //     },
  //     {
  //       _id: "2",
  //       title: "Mountain Cabin",
  //       location: "Manali, India",
  //       hostName: "John",
  //       pricePerNight: 3200,
  //       status: "approved",
  //       image:
  //         "https://images.unsplash.com/photo-1494526585095-c41746248156",
  //     },
  //   ]);
  const [properties, setProperties] = useState([])

  const [filter, setFilter] = useState("all");
  const navigate=useNavigate();

  const filteredProperties =
    filter === "all"
      ? properties
      : properties.filter((p) => p.status === filter);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetchPropertiesAdmin();
        console.log("res", res);
        setProperties(res.property)

      }
      catch (error) {

      }
    }
    fetchProperties();
  }, [])

  const handleApprove = async (propertyId) => {
    try {
      const res = await approveProperty(propertyId);
      const updatedProperty = res.property;
      setProperties(prev =>
        prev.map(p =>
          p._id === updatedProperty._id ? updatedProperty : p
        )
      );
      console.log(res);
      alert(res.message);


    }
    catch (error) {
      alert(error?.response?.data?.message || "something wrong")
    }
  }

  const handleReject = async (propertyId) => {
    try {
      const res = await rejectProperty(propertyId);
      const updatedProperty = res.property;
      setProperties(prev =>
        prev.map(p =>
          p._id === updatedProperty._id ? updatedProperty : p
        )
      );
      console.log(res);
      alert(res.message);


    }
    catch (error) {
      alert(error?.response?.data?.message || "something wrong")
    }
  }




  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Properties</h1>
        <p className="text-primary mt-1">
          Review and manage all listed properties
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === item
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Property Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
          >

            {/* Image */}
            <img
              src={property.images[0]?.url}
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">

              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{property.title}</h3>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : property.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {property.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {property.location}
              </p>

              <p className="text-sm text-gray-500">
                Host: <span className="font-medium">{property.host.name}</span>
              </p>

              <p className="mt-3 font-semibold text-primary">
                ₹{property.pricePerNight} / night
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-4">

                <button onClick={()=>navigate(`/admin/viewProperty/${property._id}`)} className="flex-1 border border-gray-300 text-sm rounded-lg py-2 hover:bg-gray-50">
                  View
                </button>

                {property.status === "pending" && (
                  <>
                    <button onClick={() => handleApprove(property._id)} className="flex-1 bg-primary text-white rounded-lg py-2 text-sm hover:opacity-90">
                      Approve
                    </button>

                    <button onClick={() => handleReject(property._id)} className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm hover:opacity-90">
                      Reject
                    </button>
                  </>
                )}

                {property.status === "rejected" && (
                  <button 
                  onClick={() => handleApprove(property._id)}
                    className="flex-1 bg-primary text-white rounded-lg py-2"
                  >
                    Re-Approve
                  </button>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

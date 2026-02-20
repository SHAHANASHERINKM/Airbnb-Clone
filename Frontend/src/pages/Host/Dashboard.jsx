import React, { useEffect, useState } from "react";
import { fetchHostBookings, fetchHostProperties } from "../../services/propertyService";

function Dashboard() {


  const [bookings, setBookings] = useState(null);
  const [properties, setProperties] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await fetchHostBookings(true);
   
      setBookings(bookings);
    }
    const fetchProperty = async () => {
      const property = await fetchHostProperties();
      setProperties(property);
    }
    fetchBookings();
    fetchProperty();

  }, bookings)

  return (
    <div className="w-full">


      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">
          Welcome back, Host 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your properties and bookings
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Properties</p>
          <h2 className="text-3xl font-bold text-primary mt-2"> {properties?.count} </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <h2 className="text-3xl font-bold text-primary mt-2"> {bookings?.totalCount} </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <h2 className="text-3xl font-bold text-primary mt-2">₹ 45,000</h2>
        </div>

      </div>


      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="border-b">
              <tr className="text-gray-500 text-sm">
                <th className="py-3">Property</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings?.bookings?.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No bookings yet
                  </td>
                </tr>

              ) : (

                bookings?.bookings.map((booking) => (
                  <tr key={booking._id} className="border-b h-16 text-sm">
                    <td className="py-3 font-medium">
                      {booking?.property?.title}
                    </td>

                    <td>
                      {new Date(booking.checkIn).toISOString().split("T")[0]}
                    </td>

                    <td>
                      {new Date(booking.checkOut).toISOString().split("T")[0]}
                    </td>

                    <td className="font-semibold">₹{booking.totalPrice}</td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
              ${booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>


          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

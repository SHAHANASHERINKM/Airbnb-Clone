import React, { useEffect, useState } from "react";
import { fetchHostBookings } from "../../services/propertyService";

function HostBookings() {
  const booking = [
    {
      _id: 1,
      propertyName: "Luxury Beach Villa",
      checkIn: "12 Feb 2026",
      checkOut: "15 Feb 2026",
      totalAmount: 8500,
      status: "confirmed",
    },
    {
      _id: 2,
      propertyName: "Mountain View Home",
      checkIn: "18 Feb 2026",
      checkOut: "20 Feb 2026",
      totalAmount: 6200,
      status: "pending",
    },
  ];
  const [bookings,setBookings]=useState([]);

  useEffect(()=>{
      const fetchBookings = async () => {
                const res = await fetchHostBookings();
                const bookings=res.bookings;
                console.log("bookings", bookings);
                setBookings(bookings);
            }
            fetchBookings();
  },[])

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-1 text-dark">
        Bookings
      </h1>
      <p className="text-gray-500 mb-6">View and manage bookings</p>

      
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

        <table className="min-w-[700px] w-full text-left">

          {/* Table head */}
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600 text-sm">
              <th className="py-3 px-4">Property Name</th>
              <th className="px-4">Booked On</th>
              <th className="px-4">Check-in</th>
              <th className="px-4">Check-out</th>
              <th className="px-4">Total Amount</th>
              <th className="px-4">Status</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b h-16 text-sm hover:bg-gray-50">

                <td className="py-3 px-4 font-medium">
                  {booking?.property?.title}
                </td>

                 <td className=" px-4">
                  {new Date(booking.createdAt).toISOString().split("T")[0]}
                </td>

                <td className="px-4 ">{new Date(booking.checkIn).toISOString().split("T")[0]}</td>
                <td className="px-4">{new Date(booking.checkOut).toISOString().split("T")[0]}</td>

                <td className="px-4 font-semibold">
                  ₹{booking.totalPrice}
                </td>

                <td className="px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          :booking.status ==="cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default HostBookings;

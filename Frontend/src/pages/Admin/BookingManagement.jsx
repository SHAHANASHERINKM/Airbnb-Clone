import React, { useEffect, useState } from "react";
import { fetchAllBookingsAdmin } from "../../services/propertyService";

export default function BookingManagement() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetchAllBookingsAdmin();
        console.log("res", res.bookings)

        setBookings(res.bookings);

      }
      catch (error) {
        alert(error?.response?.data?.message || "something wrong")
      }
    }
    fetchBookings();
  }, [])

  const [filter, setFilter] = useState("all");

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const pendingBookings = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">
          Booking Management
        </h1>
        <p className="text-primary mt-1">
          Manage all bookings on the platform
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold text-primary mt-2">
            {totalBookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Confirmed Bookings</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {confirmedBookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Pending Bookings</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {pendingBookings}
          </h2>
        </div>

      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((item) => (
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-[700px] w-full text-left">

          <thead className="border-b">
            <tr className="text-gray-500 text-sm">
              <th className="px-4 py-3">Guest</th>
              <th className="px-4">Property</th>
              <th className="px-4">Check In</th>
              <th className="px-4">Check Out</th>
              <th className="px-4">Amount</th>
              <th className="px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b h-14 text-sm hover:bg-gray-50"
                >
                  <td className="px-4 font-medium">{booking.user.name}</td>
                  <td>
                    {booking.property ? (
                      booking.property.title
                    ) : (
                      <span className="text-red-500">Property removed</span>
                    )}
                  </td>
                  <td className="px-4">
                    {new Date(booking.checkIn).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4">
                    {new Date(booking.checkOut).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 font-semibold">₹{booking.totalPrice}</td>

                  <td className="px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
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
  );
}

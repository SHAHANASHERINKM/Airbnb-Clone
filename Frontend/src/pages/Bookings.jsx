import React, { useEffect, useState } from 'react'
import { cancelBooking, getMyBookings } from '../services/propertyService'
import { addPropertyReview } from '../services/propertyService'
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const navigate = useNavigate();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    useEffect(() => {
        const getBookings = async () => {
            try {
                const res = await getMyBookings();
                setBookings(res.bookings || []);

            }
            catch (err) {
                console.error(err);

            }
            finally {
                setLoading(false)
            }
        }
        getBookings();
    }, [])

    const handleClick = (bookinId) => {
        const booking = bookings.find(b => b._id === bookinId);
        if (booking.status === "pending") {
            navigate(`/payment/${bookinId}`);
        }
        else {
            navigate(`/property-details/${booking.property._id}`)
        }
    }

    const handleCancelBooking = async (bookingId) => {
        try {
            const res = await cancelBooking(bookingId);
            if (res?.message) {
                const refundText = res.refundAmount ?
                    `Refund:₹${res.refundAmount}`
                    : "";
                alert(res.message + refundText);
            }
        }
        catch (error) {
            alert(error.response?.data?.message || "something wrong")

        }

    }

    const handleAddReview = async () => {
        if (!selectedBooking) return;
        const data = {
            rating,
            comment,
            propertyId: selectedBooking.property._id,
            bookingId: selectedBooking._id
        }
        try {
            const res = await addPropertyReview(data);
            if (res?.message || res?.success) {
                alert(res.message || 'Review added successfully');
            }
            setReviewOpen(false);
            setSelectedBooking(null);
        }
        catch (error) {
            alert(error.response?.data?.message || "something wrong")
        }
    }


    if (loading) return <p>Loading....</p>
    return (
        <>
            <div className="p-6 ">
                <h1 className="text-3xl font-semibold">My Bookings</h1>
                <p className='text-gray-600'>View and manage your reservations</p>

                <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bookings.length === 0 ? (
                        <p>No bookings found</p>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking._id} onClick={() => handleClick(booking._id)} className="bg-white shadow rounded-xl">
                                <div className='h-40'>
                                    <img
                                        src={booking.property?.images?.[0]?.url}
                                        className="h-full w-full object-cover rounded-lg p-0"
                                    />
                                </div>
                                <div className='p-4'>

                                    <h2 className="mt-2 font-semibold">{booking.property?.title}</h2>
                                    <p className="text-gray-500">{booking.property?.location}</p>

                                    <p className="mt-2 flex mb-3">
                                        <CalendarDaysIcon className="w-5 h-5 text-primary " /> {new Date(booking.checkIn).toLocaleDateString()} → <CalendarDaysIcon className="w-5 h-5 text-primary " /> {new Date(booking.checkOut).toLocaleDateString()}
                                    </p>

                                    <p className="mt-2 mb-3 text-primary font-semibold">
                                        ₹{booking.totalPrice}
                                    </p>
                                    <div className='flex gap-2'>
                                        <span className={`px-3 py-1 rounded-full text-sm 
                ${booking.status === "confirmed" && "bg-green-100 text-green-700"}
                ${booking.status === "pending" && "bg-yellow-100 text-yellow-700"}
                ${booking.status === "cancelled" && "bg-red-100 text-red-700"}
                 ${booking.status === "completed" && "bg-gray-200 text-primary"}
              `}>
                                            {booking.status}
                                        </span>
                                        {booking.status === "pending" && (
                                            <p className='text-red-500'> Will expires soon </p>
                                        )}

                                    </div>

                                    <div className='flex gap-2 mt-3'>
                                        {booking.status === "pending" && (
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                handleClick(booking._id);
                                            }} className='bg-secondary rounded-lg p-2'>Pay & Proceed</button>
                                        )}
                                        {
                                            (booking.status === "pending" || booking.status === "confirmed") && (
                                                <button onClick={(e) => { e.stopPropagation(), handleCancelBooking(booking._id) }} className='bg-red-300 rounded-lg p-1 '>Cancel Booking</button>
                                            )
                                        }
                                    </div>
                                    <div>
                                        {booking.status === "completed" && !booking.isReviewed && (
                                            <button
                                                className='bg-primary text-white px-2 rounded-lg'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedBooking(booking);
                                                    setReviewOpen(true);
                                                }}
                                            >
                                                Add review
                                            </button>
                                        )}
                                    </div>

                                </div>

                            </div>
                        ))
                    )}
                </div>
            </div>
            {reviewOpen === true && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={() => setReviewOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Your Review</h2>

                        <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); handleAddReview(); }}>
                            <div className="flex items-center gap-2">
                                <label className="font-medium text-gray-700">Rating:</label>
                                <select
                                    value={rating}
                                    onChange={(e) => { e.stopPropagation(), setRating(Number(e.target.value)) }}
                                    className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                >
                                    <option value={5}>5</option>
                                    <option value={4}>4</option>
                                    <option value={3}>3</option>
                                    <option value={2}>2</option>
                                    <option value={1}>1</option>
                                </select>
                            </div>

                            <textarea
                                value={comment}
                                onChange={(e) => { e.stopPropagation(), setComment(e.target.value) }}
                                placeholder="Write your review..."
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                                rows={3}
                            />

                            <button
                                type="submit"
                                className="bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Bookings

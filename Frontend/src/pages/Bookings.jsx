import React, { useEffect, useState } from 'react'
import { cancelBooking, getMyBookings } from '../services/propertyService'
import { CalendarDateRangeIcon } from '@heroicons/react/16/solid';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const getBookings = async () => {
            try {
                const res = await getMyBookings();
                console.log("respon", res.bookings);

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

    const handleCancelBooking=async(bookingId)=>{
        try{
            const res=await cancelBooking(bookingId);
            if(res?.message){
                const refundText=res.refundAmount?
                `Refund:₹${res.refundAmount}`
                :"";
                alert(res.message + refundText);
            }
        }
        catch(error){
            alert(err.response?.data?.message || "something wrong")

        }

    }
    

    if (loading) return <p>Loading....</p>
    return (
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
              `}>
                                        {booking.status}
                                    </span>
                                    {booking.status === "pending" && (
                                        <p className='text-red-500'> Will expires soon </p>
                                    )}

                                </div>
                            
                            <div className='flex gap-2 mt-3'>
                                {booking.status==="pending" && (
                                    <button onClick={(e)=>{
                                        e.stopPropagation(),
                                        handleClick()
                                    }} className='bg-secondary rounded-lg p-2'>Pay & Proceed</button>
                                )}
                                {
                                    (booking.status==="pending" || booking.status==="confirmed" )&&(
                                        <button onClick={(e)=>{ e.stopPropagation(),handleCancelBooking(booking._id)}} className='bg-red-300 rounded-lg p-1 '>Cancel Booking</button>
                                    )
                                }
                            </div>


                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Bookings

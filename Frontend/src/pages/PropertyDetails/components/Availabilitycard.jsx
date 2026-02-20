import { CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { checkAvailability, createBooking } from '../../../services/propertyService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Availabilitycard({ property }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [available, setAvailable] = useState(null);
  const [guests, setGuests] = useState(1);
  const token = useSelector(state => state.auth.token);
  const userId = useSelector(state => state.auth?.user?.id)
  const navigate = useNavigate();
  const hostId = property.host._id;
  const isHost = userId === hostId;

  useEffect(() => {
    setAvailable(null);
  }, [checkIn, checkOut, guests]);

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select both checkin and checkout");
      return;
    }

    const data = {
      checkIn,
      checkOut,
      guests,
      propertyId: property._id
    };

    try {
      if (available) {
        if(!userId){
          alert("You must login first");
          navigate("/login");
          return;
        }
        const bookingResult = await createBooking(data);
        console.log(bookingResult)
        console.log("booking id", bookingResult.booking._id)
        const bookingId = bookingResult.booking._id;

        alert(bookingResult.message);
        navigate(`/payment/${bookingId}`)


        return;
      }

      const result = await checkAvailability(data);
      console.log("Availability Result:", result);

      if (result.available === true || result.message === "Dates available") {
        setAvailable(true);

      } else {
        setAvailable(false);
      }

    } catch (error) {
      console.error("Error:", error);
      const message = error.response?.data?.message || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div className="w-full md:w-[360px] bg-white border border-gray-200 shadow-lg rounded-2xl p-6">
      <span className='flex items-center text-lg font-semibold mb-4 '>
        <CurrencyRupeeIcon className='w-5 h-5 text-blue-500' />
        {property?.pricePerNight || 0} for 1 Night</span>

      <h1 className="text-lg font-semibold mb-4">
        Check Availability
      </h1>


      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-2">

          <div className="p-3 border-r">
            <label className="text-xs font-semibold text-gray-600">CHECK-IN</label>
            <input
              type="date"
              className="w-full text-sm outline-none bg-transparent"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="p-3">
            <label className="text-xs font-semibold text-gray-600">CHECK-OUT</label>
            <input
              type="date"
              className="w-full text-sm outline-none bg-transparent"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

        </div>

      </div>

      <div className="border rounded-xl mt-4 p-3">
        <label className="text-xs font-semibold text-gray-600">GUESTS</label>
        <input
          type="number"
          min="1"

          className="w-full text-sm outline-none bg-transparent"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Guests"
        />

      </div>

      {available === true && (<p className="text-green-600 text-center mt-4 font-semibold">Dates are available</p>)}
      {available === false && (<p className="text-green-600 text-center mt-4 font-semibold">Dtaes not availbale</p>)}

      <button
        className={`mt-4 w-full py-3 rounded-xl font-semibold transition
    ${isHost ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-teal-700"}
  `}
        onClick={handleSubmit}
        disabled={isHost}
      >
        {isHost ? "Your Property" : available ? "Reserve" : "Check"}
      </button>


    </div>
  )
}

export default Availabilitycard

import { CalendarDaysIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function PropertyCard({property}) {
    const bookingDetails=property;
    const propertyDetails=property.property;
    console.log(propertyDetails)
    const navigate=useNavigate();
    
  
  return (
    <div className="max-w-4xl mx-auto bg-white border rounded-xl shadow-md flex overflow-hidden mt-7 grid md:grid-cols-2">

      <div className="w-full">
        <img
          src={propertyDetails.images[0]?.url}
          alt="Property"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-2/3 p-5 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
           {propertyDetails.title}
          </h2>
          <p className="text-sm text-gray-500">{propertyDetails.location} </p>

          <p className="mt-2 text-gray-600 text-sm flex gap-2 ">
             <CalendarDaysIcon className="w-5 h-5 text-primary "/> Checkin : {new Date(bookingDetails.checkIn).toISOString().split("T")[0]}

          </p>
          <p className="mt-2 text-gray-600 text-sm flex gap-2 ">
             <CalendarDaysIcon className="w-5 h-5 text-primary "/> Checkout : {new Date(bookingDetails.checkOut).toISOString().split("T")[0]}

          </p>

          <p className="mt-2 text-gray-600 text-sm flex gap-2 ">
             <UserGroupIcon className="w-5 h-5 text-primary "/> Guests : {bookingDetails.guests}
          </p>

          <p className="mt-2 text-gray-700 text-sm line-clamp-2">
            {propertyDetails.description}
          </p>
        </div>

      
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-primary">
            ₹{propertyDetails.pricePerNight} / night
          </p>

          <button onClick={()=>navigate(`/property-details/${propertyDetails._id}`)} className="bg-primary text-white md:px-4 md:py-2 px-2 py-1 rounded-lg hover:bg-teal-700 transition">
            View Details
          </button>
        </div>

      </div>
    </div>
  );
}

export default PropertyCard;

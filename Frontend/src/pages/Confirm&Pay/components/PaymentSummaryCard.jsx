import { useEffect, useState } from "react";
import { paymentApi } from "../../../services/propertyService";
import { useNavigate } from "react-router-dom";

function PaymentSummaryCard({ property }) {

    const pricePerNight = property.pricePerNight;
    const totalPrice = property.totalPrice;
    const night = Math.ceil(totalPrice / pricePerNight);
    const navigate=useNavigate();

    const bookingId = property._id;
    const expiresAt = property.expiresAt;


    const expiryTime = new Date(expiresAt).getTime();
    const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.floor((expiryTime - Date.now()) / 1000)));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryTime]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    const handleClick = async () => {
        try {
            const response = await paymentApi(bookingId);
            alert(response.message);
            navigate("/bookings")





        }
        catch (error) {
            alert(error.response?.data?.message);

        }

    }

    return (
        <div className="bg-white border rounded-xl shadow-lg p-4 sm:p-6 w-full mt-7">

            {/* ALERT */}
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded-md text-sm font-medium mb-4">
                ⚠️ Your reservation will expire in 15 minutes
            </div>

            {/* RESPONSIVE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* LEFT - PRICE */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-800">Price Details</h2>

                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>₹{pricePerNight} × {night} nights</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <div className="border-t pt-2 flex justify-between font-semibold text-gray-800 text-lg">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <button onClick={handleClick} className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition">
                        Pay Now
                    </button>
                </div>

                {/* RIGHT - TIMER */}
                <div className="flex flex-col items-center justify-center bg-bg border rounded-xl p-4 w-full">
                    <p className="text-sm text-gray-600 mb-2 text-center">
                        Time left to complete payment
                    </p>

                    <div className="text-3xl md:text-2xl font-bold text-primary text-center">
                        {timeLeft > 0
                            ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                            : "Reservation expired"}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PaymentSummaryCard;

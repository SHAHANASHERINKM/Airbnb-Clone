import React, { useEffect, useState } from 'react'
import PropertyCard from './components/PropertyCard'
import { useParams } from 'react-router-dom'
import { getSingleBooking } from '../../services/propertyService';
import { useSelector } from 'react-redux';
import PolicySection from './components/PolicySection';
import PaymentSummaryCard from './components/PaymentSummaryCard';

function ConfirmAndPay() {
  const { id } = useParams();
  const [reservedProperty, setReservedProperty] = useState(null);
  const token = useSelector(state => state.auth.token)
  console.log(token)

  useEffect(() => {
    const fetchReservedProperty = async () => {
      try {
        const response = await getSingleBooking(id);
        console.log("property in card", response.booking)
        setReservedProperty(response.booking);

      }
      catch (error) {
        alert(error.response?.data?.message)

      }

    };
    fetchReservedProperty();
  }, [id]);

  if (!reservedProperty) {
    return <p>Loading</p>
  }
  console.log("reserve", reservedProperty)


  return (
  <>
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-[30px] font-semibold">Confirm And Pay</h1>
      <p className="text-gray-500">
        Review your booking details before payment
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <div className="col-span-2">
          <div className="max-w-4xl space-y-6">

            <PropertyCard property={reservedProperty} />

            <PolicySection />

          </div>
        </div>

        <div className="w-full lg:col-span-1">
         <PaymentSummaryCard property={reservedProperty}/>
        </div>

      </div>
    </div>
  </>
);

}

export default ConfirmAndPay

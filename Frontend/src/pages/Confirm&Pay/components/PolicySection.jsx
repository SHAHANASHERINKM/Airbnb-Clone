import { useEffect, useState } from "react";
import { getCancellationPolicy } from "../../../services/propertyService";

function PolicySection() {
const [policy,setPolicy]=useState(null);
const [loading,setLoading]=useState(true);
     useEffect(()=>{
        const fetchCancellationPolicy=async()=>{
            try{
                const response=await getCancellationPolicy();
                setPolicy(response.policy);
                // console.log(policy)
                // console.log(policy.policy.fullRefundBeforeDays)

            }
            catch(error){
                alert(error.response?.data?.message || "Error fetching policy");

            }
            finally{
                setLoading(false);
            }
        }
        fetchCancellationPolicy();
     },[])
  return (
    <div className="max-w-4xl mx-auto bg-white border rounded-xl shadow-sm p-6 mt-6">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Cancellation Policy
      </h2>
      {loading && <p className="text-gray-500">Loading policy...</p>}

      {!loading && !policy && <p>No cancellation policy available</p>}
{policy && ( <p className="text-sm text-gray-600 leading-relaxed">
        Free cancellation within {policy.fullRefundBeforeDays} days  of booking. After that, cancel before 
         {policy.partialRefundBeforeDays} days of check-in to receive a {policy.partialRefundPercent}% refund. No
        refunds for cancellations made after this.
      </p>)}
     

     

    </div>
  );
}

export default PolicySection;

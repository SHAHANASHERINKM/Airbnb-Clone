import { BuildingOffice2Icon, CalendarDaysIcon, CalendarIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { fetchDashboardCounts, fetchRecentHostReq, fetchRecentPropertyReq } from '../../services/propertyService'
import { approveHost, rejectHost } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [reqHost, setReqHost] = useState([]);
  const [propertyReq, setPropertyReq] = useState([]);
  const [counts,setCounts]=useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchRecentHostRequest = async () => {
      try {
        const res = await fetchRecentHostReq();
        setReqHost(res.users);
        
        console.log("resss", res)


      }
      catch (error) {
        alert(error?.response?.data?.message || "something wrong")

      }
    }

    const RecentPropertyReq = async () => {
      try {
        const res = await fetchRecentPropertyReq();
        console.log("re", res);
        setPropertyReq(res.property);
        

      }
      catch (error) {

      }
    }
    const dashboardCounts=async()=>{
      try{
        const res=await fetchDashboardCounts();
        console.log("countss",res);
        setCounts(res.counts);


      }
      catch(error){
                alert(error?.response?.data?.message || "something wrong")


      }
    }
    fetchRecentHostRequest();
    RecentPropertyReq();
    dashboardCounts();
  }, [])

  const handleApprove = async (hostId) => {
    try {
      const res = await approveHost(hostId);
      const updatedUser = res.user;
      setReqHost(prev => prev.filter(user => user.id !== updatedUser._id));
      alert(" Approved Successfully")

    } catch (error) {
      alert(error?.response?.data?.message || "Failed to approve host");
    }
  };

  const handleReject = async (hostId) => {
    try {
      const res = await rejectHost(hostId);
      const updatedUser = res.user;


      setReqHost(prev => prev.filter(user => user.id !== updatedUser._id));
      alert("Rejected successfully")

    } catch (error) {
      alert(error?.response?.data?.message || "Failed to reject host");
    }
  };


  return (
    <div className='w-full '>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">
          Dashboard Overview
        </h1>
        <p className="text-primary mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-primary text-lg flex  gap-5">Total Users <UserGroupIcon className='w-8 h-8 text-primary' /></p>
          <h2 className="text-3xl font-bold text-primary mt-2"> {counts.users} </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-primary flex gap-5 text-lg">Total Hosts <UserGroupIcon className='w-8 h-8 text-primary' /> </p>
          <h2 className="text-3xl font-bold text-primary mt-2"> {counts.hosts} </h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-primary flex gap-5 text-lg">Total Properties <BuildingOffice2Icon className='w-8 h-8 text-primary' /> </p>
          <h2 className="text-3xl font-bold text-primary mt-2"> {counts.properties}</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-primary flex gap-5 text-lg">Total Bookings <CalendarIcon className='w-8 h-8' />  </p>
          <h2 className="text-3xl font-bold  text-primary mt-2">{counts.bookings}</h2>
        </div>

      </div>


      {/* ////////////////////////////////////////////// */}

      <div className="bg-white mb-8 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold ">Recent Host Requests</h2>
        <p className="text-primary mt-1 mb-4 ">
        Review and approve new host applications
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left ">

            <thead className="border-b">
              <tr className="text-gray-500 text-sm">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reqHost?.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No host requests
                  </td>
                </tr>

              ) : (

                reqHost?.map((req) => (
                  <tr key={req.id} className="border-b h-16 text-sm ">
                    <td className="py-3 font-medium">
                      {req.name}
                    </td>

                    <td className=" py-3 font-semibold">{req.email}</td>
                    <td>
                      <span
                        className={"px-2 py-2 bg-yellow-100 text-yellow-700  rounded-full text-xs font-medium"}
                      >
                        {req.hostStatus}
                      </span>
                    </td>
                    <td className='flex gap-4 py-3 '>
                      <button onClick={() => handleApprove(req.id)} className='rounded-md bg-primary text-white px-2 py-2'>Approve</button>
                      <button onClick={() => handleReject(req.id)} className='rounded-md bg-red-600 text-white px-2 py-2'>Reject</button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>


          </table>
        </div>
      </div>
      {/* ////////////////////////////////////////////////////// */}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold ">Recent Property Requests</h2>
        <p className="text-primary mt-1 mb-4 ">
       Review properties pending approval
        </p>


        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="border-b">
              <tr className="text-gray-500 text-sm">
                <th className="py-3">Property</th>
                <th>Host</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {propertyReq?.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No property requests
                  </td>
                </tr>

              ) : (

                propertyReq?.map((property) => (
                  <tr key={property._id} className="border-b h-16 text-sm hover:bg-gray-50">
                    <td className="py-3 font-medium">
                      {property.title}
                    </td>

                    <td className="py-3 font-medium">
                      {property.host.name}
                    </td>
                    <td className=" py-3 font-semibold">{property.location}</td>
                    <td>
                      <span
                        className={"px-2 py-2 bg-yellow-100 text-yellow-700  rounded-full text-xs font-medium"}
                      >
                        {property.status}
                      </span>
                    </td>



                    <td className='flex gap-4 py-3 '>
                      <button onClick={() => navigate(`/admin/viewProperty/${property._id}`)} className='rounded-md bg-primary text-white px-2 py-2'>Review</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

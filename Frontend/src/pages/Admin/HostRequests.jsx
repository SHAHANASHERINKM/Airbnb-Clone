

import React, { useEffect, useState } from "react";
import { approveHost, fetchHostReq, rejectHost } from "../../services/userService";

export default function HostRequests() {
   
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        const getHostReq = async () => {
            try {
                const res = await fetchHostReq();
                console.log("host", res);
                setHosts(res.users);
            }
            catch (error) {
                alert(error?.response?.data?.message || "Failed to approve host");

            }
        }
        getHostReq();
    }, [])

     const handleApprove = async (hostId) => {
        try {
          const res = await approveHost(hostId);
          const updatedHost = res.user;
    
    
          setHosts(prev => prev.filter(host => host.id !== updatedHost._id));
          alert(" Approved Successfully")
    
        } catch (error) {
          alert(error?.response?.data?.message || "Failed to approve host");
        }
      };
    
      const handleReject = async (hostId) => {
        try {
          const res = await rejectHost(hostId);
          const updatedHost = res.user;
    
    
          setHosts(prev => prev.filter(host => host.id !== updatedHost.id));
          alert("Rejected successfully")
    
        } catch (error) {
          alert(error?.response?.data?.message || "Failed to reject host");
        }
      };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark">Host Requests</h1>
                <p className="text-primary mt-1">
                    Review and approve host applications
                </p>
            </div>

            {/* Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                {hosts.length===0?(
                    <p className="text-center col-span-5 py-5">No Host Requests</p>
                ):(hosts.map((host) => (
                    <div
                        key={host.id}
                        className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {host.name}
                                </h3>
                                <p className="text-sm text-gray-500">{host.email}</p>
                            </div>

                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                {host.hostStatus}
                            </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            Requested on:{" "}
                            <span className="font-medium text-gray-700">
                                {new Date(host.hostRequestedAt).toISOString().split("T")[0]}
                            </span>
                        </p>
                  
                        <div className="flex gap-3 mt-5">
                            <button onClick={()=>handleApprove(host.id)} className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
                                Approve
                            </button>

                            <button onClick={()=>handleReject(host.id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
                                Reject
                            </button>
                        </div>
                    </div>
                )))}
                
            </div>
        </div>
    );
}


import React, { useEffect, useState } from 'react'
import { blockHost,  getHosts,  unblockHost } from '../../services/userService'

function HostList() {
    const [hosts, setHosts] = useState([]);
    useEffect(() => {
        const fetchHost = async () => {
            try {
                const res = await getHosts();
                console.log("res", res);
                setHosts(res.users)
            }
            catch (error) {
                alert(error?.response?.data?.message || "something wrong")
            }
        }
        fetchHost();

    }, [])

    const handleBlock = async (hostId) => {
        try {
            const res = await blockHost(hostId);

            const updatedHost = res.user;

            setHosts(prev =>
                prev.map(host =>
                    host.id === updatedHost.id ? updatedHost : host
                )
            );
              alert(res.message);

        }
        catch(error) {
                  alert(error?.response?.data?.message || "Failed to approve host");
        }
    }

    const handleUnblock=async(hostId)=>{
        try{
            const res=await unblockHost(hostId);
             const updatedHost = res.user;

            setHosts(prev =>
                prev.map(host =>
                    host.id === updatedHost.id ? updatedHost : host
                )
            );
              alert(res.message);


        }
        catch(error){
      alert(error?.response?.data?.message || "Failed to approve host");
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark">
                    Host Management
                </h1>
                <p className="text-primary mt-1">
                    Manage all  hosts on the platform
                </p>
            </div>


            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

                <table className="min-w-[700px] w-full text-left">

                    <thead className="border-b">
                        <tr className="text-gray-500 text-sm">
                            <th className="px-4 py-3">Host</th>
                            <th className="px-4">Email</th>

                            <th className="px-4">Join Date</th>
                            <th className="px-4">Status</th>
                            <th className="px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {hosts?.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500"
                                >No users
                                </td>
                            </tr>

                        ) : (

                            hosts?.map((host) => (
                                <tr key={host.id} className="border-b h-16 text-sm hover:bg-gray-50 ">
                                    <td className="py-3 px-4 font-medium">
                                        {host.name}
                                    </td>

                                    <td className=" px-4 py-3 ">{host.email}</td>

                                    <td className="px-4 ">
                                        {new Date(host.createdAt).toISOString().split("T")[0]}
                                    </td>
                                    <td className="px-4 ">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${host.hostStatus === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : host.hostStatus === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : host.hostStatus === "blocked"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"   
                                                }`}
                                        >
                                            {host.hostStatus}
                                        </span>

                                    </td>
                                    <td className="flex gap-2 py-3 px-4">
                                        {host.hostStatus === "active" && (
                                            <button onClick={()=>handleBlock(host.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">
                                                Block
                                            </button>
                                        )}

                                        {host.hostStatus === "blocked" && (
                                            <button onClick={()=>handleUnblock(host.id)} className="bg-green-600 text-white px-3 py-1 rounded-md">
                                                Unblock
                                            </button>
                                        )}

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HostList

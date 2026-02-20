import React, { useEffect, useState } from 'react'
import { blockUser, getUsers, unblockUser } from '../../services/userService'

function UsersList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers();
                console.log("res", res);
                setUsers(res.users)
            }
            catch (error) {
                alert(error?.response?.data?.message || "something wrong")
            }
        }
        fetchUsers();

    }, [])

    const handleBlock = async (userId) => {
        try {
            const res = await blockUser(userId);
        
            const updatedUser = res.user;

            setUsers(prev =>
                prev.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
              alert(res.message);

        }
        catch(error) {
                  alert(error?.response?.data?.message || "Failed to approve host");
        }
    }

    const handleUnblock=async(userId)=>{
        try{
            const res=await unblockUser(userId);
             const updatedUser = res.user;

            setUsers(prev =>
                prev.map(users =>
                    users.id === updatedUser.id ? updatedUser : users
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
                    Users Management
                </h1>
                <p className="text-primary mt-1">
                    Manage all users and hosts on the platform
                </p>
            </div>


            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

                <table className="min-w-[700px] w-full text-left">

                    <thead className="border-b">
                        <tr className="text-gray-500 text-sm">
                            <th className="px-4 py-3">User</th>
                            <th className="px-4">Email</th>
                            
                            <th className="px-4">Join Date</th>
                            <th className="px-4">Status</th>
                            <th className="px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500"
                                >No users
                                </td>
                            </tr>

                        ) : (

                            users?.map((user) => (
                                <tr key={user.id} className="border-b h-16 text-sm hover:bg-gray-50 ">
                                    <td className="py-3 px-4 font-medium">
                                        {user.name}
                                    </td>

                                    <td className=" px-4 py-3 ">{user.email}</td>
                                   
                                    <td className="px-4 ">
                                        {new Date(user.createdAt).toISOString().split("T")[0]}
                                    </td>
                                    <td className="px-4 ">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${user.userStatus === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {user.userStatus}
                                        </span>
                                    </td>
                                    <td className="flex gap-4 py-3 px-4">
                                        {user.userStatus === "active" ? (
                                            <button onClick={() => handleBlock(user.id)} className="bg-red-600 text-white px-3 py-1 rounded-md">
                                                Block
                                            </button>
                                        ) : (
                                            <button onClick={()=>handleUnblock(user.id)} className="bg-green-600 text-white px-3 py-1 rounded-md">
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

export default UsersList

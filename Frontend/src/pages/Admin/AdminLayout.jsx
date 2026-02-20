import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon, Bars3Icon, BuildingOfficeIcon, CalendarDateRangeIcon, CheckBadgeIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, HomeIcon, PlusCircleIcon, TicketIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
// import * as Icons from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.svg";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";




function AdminLayout() {
    // console.log(Icons);

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleLogout = () => {

        // localStorage.clear();


        dispatch(logout());


        navigate("/login");
    };

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>
            <aside
                className={`
          fixed md:static top-0 left-0 h-screen overflow-hidden w-64 bg-white border-r shadow-sm p-6
          transform transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 
        `}
            >

                <div className="flex justify-end md:hidden mb-4">
                    <button onClick={() => setOpen(false)}>
                        <XMarkIcon className="w-6 h-6 text-red-600" />
                    </button>
                </div>
                <NavLink to="#" className='flex items-center text-primary text-2xl mb-5 font-bold'>
                    <img src={logo} className='w-10 h-10 mr-2' />

                    NestAway
                </NavLink>

                <h1 className="text-2xl font-bold mb-8 text-primary">Admin Hub</h1>

                <nav className="flex flex-col gap-3">
                    <NavLink to="/admin/dashboard" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <HomeIcon className="w-5 h-5 text-primary " />
                        Dashboard
                    </NavLink>

                    <NavLink to="/admin/users" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <UserGroupIcon className="w-5 h-5" />
                        Users
                    </NavLink>

                    <NavLink to="/admin/hosts" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <UserIcon className="w-5 h-5 text-gray-600" />
                        Hosts
                    </NavLink>

                    <NavLink to="/admin/host-requests" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <UserPlusIcon className="w-5 h-5 text-gray-600" />
                        Host Requests
                    </NavLink>

                    <NavLink to="/admin/properties" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <BuildingOfficeIcon className="w-5 h-5 text-gray-600" />
                        Properties
                    </NavLink>

                    <NavLink to="/admin/property-approvals" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <CheckCircleIcon className="w-5 h-5 text-gray-600" />
                        Property Approvals
                    </NavLink>

                    <NavLink to="/admin/bookings" className={({ isActive }) =>
                        `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${isActive
                            ? "bg-bg text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                    }>
                        <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                        Bookings
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition text-gray-600 hover:bg-red-100 w-full"
                    >
                        <ArrowLeftEndOnRectangleIcon className="w-5 h-5 text-gray-600" />
                        Logout
                    </button>

                </nav>
            </aside>
            <main className="flex-1 p-6 overflow-y-auto md:p-8 mt-10 w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;

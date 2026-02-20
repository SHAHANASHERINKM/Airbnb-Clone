import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {  ArrowLeftStartOnRectangleIcon, Bars3Icon, BuildingOfficeIcon, CalendarDateRangeIcon, HomeIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

function HostLayout() {
  const [open, setOpen] = useState(false);

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
     
        <button
          onClick={() => setOpen(false)}
          className="md:hidden mb-4"
        >
          <XMarkIcon className="w-6 h-6 text-red-300" />
        </button>

        <h1 className="text-2xl font-bold text-primary">Property Hub</h1>
        <p className="text-sm text-gray-500 mb-8">Host Dashboard</p>

        <nav className="flex flex-col gap-3">
          <NavLink to="/host/dashboard"  className={({ isActive }) =>
              `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-bg text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }>
          <HomeIcon className="w-5 h-5 text-primary "/>
            Dashboard
          </NavLink>

          <NavLink to="/host/addProperty" className={({ isActive }) =>
              `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-bg text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }>
          <PlusCircleIcon className="w-5 h-5"/>
            Add Property
          </NavLink>

          <NavLink to="/host/property" className={({ isActive }) =>
              `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-bg text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }>
          <BuildingOfficeIcon className="w-5 h-5 text-gray-600"/>
            My Property
          </NavLink>

          <NavLink to="/host/propertyBookings" className={({ isActive }) =>
              `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-bg text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }>
          <CalendarDateRangeIcon className="w-5 h-5 text-gray-600"/>
            Bookings
          </NavLink>

          <NavLink to="/" className={({ isActive }) =>
              `px-2 py-2 flex justify-start items-center gap-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-bg text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }>
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-gray-600"/>
            Exit
          </NavLink>
        </nav>
      </aside>

  
      <main className="flex-1 p-6 overflow-y-auto md:p-8 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default HostLayout;

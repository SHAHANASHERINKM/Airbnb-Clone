import { CalendarDateRangeIcon, ChevronDownIcon, MagnifyingGlassIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchProperties } from '../redux/slices/propertySlice';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [location, setLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSearch=()=>{
        const filters={
            location,
            checkIn,
            checkOut,
            guests
        }
        dispatch(fetchProperties(filters))
        navigate("/explore")
    }



    return (
        <div className='relative w-full flex justify-center mt-6'>
            {/* desktopview */}
            <div className='hidden md:flex max-w-5xl w-auto items-center bg-white rounded-full shadow-md overflow-hidden'>

                <div className='flex-1 px-4 py-2 border-r border-gray-200 flex items-center gap-2'>
                    <MapPinIcon className='h-5 w-5 text-gray-400' />
                    <div className='flex flex-col text-left w-full'>
                        <label htmlFor="location" className='text-md font-semibold text-gray-500' >Location</label>
                        <input
                            id="location"
                            className='w-full outline-none text-sm '
                            type="text"
                            placeholder='Where are you going?'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className='flex-1 px-4 py-2 border-r border-gray-200 flex items-center gap-2'>
                    <CalendarDateRangeIcon className='h-5 w-5 text-gray-400' />
                    <div className='flex flex-col w-full text-left'>
                        <label htmlFor='checkin' className='text-md font-semibold text-gray-500'>CheckIn</label>
                        <input id="checkin" className='w-full outline-none text-sm' type="date" placeholder='CheckIn' value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex-1 px-4 py-2 border-r border-gray-200 flex items-center gap-2'>
                    <CalendarDateRangeIcon className='h-5 w-5 text-gray-400' />
                    <div className='flex flex-col text-left w-full'>
                        <label className='text-md text-gray-500 font-semibold'>CheckOut</label>
                        <input className='w-full outline-none text-sm' type="date" placeholder='CheckOut' value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex-1 px-4 py-2 border-r border-gray-200 flex items-center gap-2'>
                    <UserIcon className='h-5 w-5 text-gray-400' />
                    <div className='flex flex-col text-left w-full'>
                        <label className='text-md font-semibold text-gray-500'>Guests</label>
                        <input
                            className='w-full outline-none text-sm'
                            type="number"
                            placeholder='Guests'
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)} />
                    </div>
                </div>

                <button
                    className='bg-primary h-full text-white px-8 py-2 rounded-r-full hover:bg-secondary transition'
                 onClick={handleSearch}
                >
                    Search
                </button>
            </div>


            {/* mobile open */}
            <div className='md:hidden'>
                <button
                    className='flex items-center justify-between w-full bg-white p-3 rounded-full shadow-md '
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                                        <MagnifyingGlassIcon className='w-5 h-5 '/>

                    <span>Search your destination</span>

                </button>
                {mobileOpen && (
                    <div className="fixed inset-0 bg-black/50 z-[9999] p-4 mt-20 flex items-center justify-center">

                        {/* Popup Box */}
                        <div className="bg-white w-[95%] max-w-md rounded-2xl p-4 space-y-4 relative">

                            {/* Close Button */}
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-3 right-3 text-xl "
                            >
                                ✕
                            </button>

                            <h2 className="text-lg font-bold text-center">Search Your Destiny</h2>

                            {/* Location */}
                            <div className="flex flex-col gap-1 text-left">
                                <label className="text-sm font-semibold">Location</label>
                                <input
                                    type="text"
                                    className="border p-2 rounded outline-none"
                                    placeholder="Where are you going?"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            {/* Check In */}
                            <div className="flex flex-col gap-1 text-left w-full">
                                <label className="text-sm font-semibold">Check In</label>
                                <input
                                    type="date"
                                    className="border p-2 rounded outline-none w-full"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                />
                            </div>

                            {/* Check Out */}
                            <div className="flex flex-col gap-1 text-left w-full">
                                <label className="text-sm font-semibold">Check Out</label>
                                <input
                                    type="date"
                                    className="border p-2 rounded outline-none w-full"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                />
                            </div>

                            {/* Guests */}
                            <div className="flex flex-col gap-1 text-left">
                                <label className="text-sm font-semibold">Guests</label>
                                <input
                                    type="number"
                                    className="border p-2 rounded outline-none"
                                    placeholder="Guests"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.valueAsNumber)}
                                />
                            </div>

                            {/* Search Button */}
                            <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold" 
                            onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>

                    </div>
                )}


            </div>
        </div>
    )
}

export default SearchBar

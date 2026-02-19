import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchUser, logout } from '../redux/slices/authSlice';
import { becomeHost } from '../services/userService';



function Navbar() {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.auth.user);
    console.log("user from navbar", user);
    const [isHostReq, setIsHostReq] = useState(false);
    // console.log("usersts",user.hostStatus)

    useEffect(() => {
        //  if(user.hostStatus==="pending"){

        //  }

        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login")

    }

    const handleBecomeHost = async () => {
        if (!token) {
            alert("You must login first");
            navigate("/login");
            return;
        }
        const confirm = window.confirm("Are you sure you want to become a host?");
        if (!confirm) return;
        try {
            const res = await becomeHost(token);
            console.log("response:", res);
            alert(res.message);
            setIsHostReq(true)



        }
        catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }


    }

    const checkHostStatus = async () => {
        try {
            const result = await dispatch(fetchUser());
            const updatedUser = result.payload.user || result.payload;
            console.log("updated user:", updatedUser);

            if (updatedUser?.hostStatus === "pending") {
                alert("Your host request is still pending approval");
            }
            else if (updatedUser?.hostStatus === "active") {
                alert("Congratulations! Your host request has been approved");
                setIsHostReq(false);
            }
        } catch (err) {
            alert("Error fetching status. Please try again");
        }
    }


    return (
        <header className='w-full bg-white border-b sticky top-0 z-50  '>
            <nav className='max-w-7xl mx-auto flex items-center justify-between px-6 py-4'>
                <NavLink to="#" className='flex items-center text-primary text-2xl font-bold'>
                    <img src={logo} className='w-10 h-10 mr-2' />

                    NestAway
                </NavLink>
                <div className='hidden md:flex  gap-8 text-dark font-medium' >
                    <NavLink to="/" className={({ isActive }) =>
                        `pb-1 ${isActive
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-600 hover:text-primary"
                        }`
                    } >

                        Home
                    </NavLink>
                    <NavLink to="/explore"

                        className={({ isActive }) =>
                            `pb-1 ${isActive
                                ? "text-primary border-b-2 border-primary"
                                : "text-gray-600 hover:text-primary"
                            }`
                        }>
                        Explore
                    </NavLink>
                    {(user?.hostStatus === "pending" || isHostReq === true) && (
                        <button onClick={checkHostStatus} className="cursor-pointer hover:text-primary text-gray-600">
                            Check host status
                        </button>
                    )}

                    {user?.hostStatus === null && isHostReq === false && (
                        <button onClick={handleBecomeHost} className="cursor-pointer hover:text-primary text-gray-600">
                            Become a host
                        </button>
                    )}

                    {user?.hostStatus === "active" && (
                        <button onClick={() => navigate("/host/dashboard")} className="cursor-pointer hover:text-primary text-gray-600">
                            Switch to host
                        </button>
                    )

                    }

                </div>
                {/* <div>{user.name} </div> */}
                <div className='relatiive' ref={profileRef}>
                    <button className='flex items-center border border-accent px-3 py-1.5 rounded-full hover:bg-bg hover:shadow-md  transition'
                        onClick={() => setProfileOpen(!profileOpen)}
                    >
                        {user && (
                            <span className="text-sm font-medium text-gray-700  sm:block">
                                {user.name}
                            </span>
                        )}
                        <UserCircleIcon className='h-7 w-7 text-primary' />
                    </button>
                    {profileOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg flex flex-col z-50 '>
                            <NavLink to="/" className='px-4 py-2 hover:bg-bg transition'> Home</NavLink>
                            <NavLink to="/explore" className='px-4 py-2 hover:bg-bg transition '>Explore</NavLink>
                            <NavLink to='/login' className='px-4 py-2 hover:bg-bg transition'>Login</NavLink>
                            <NavLink to='/login' onClick={handleLogout} className='px-4 py-2 hover:bg-bg transition'>Logout</NavLink>
                            <NavLink to='/wishlist' className='px-4 py-2 hover:bg-bg transition'>Wishlist</NavLink>
                            <NavLink to='/bookings' className='px-4 py-2 hover:bg-bg transition'>My Booking</NavLink>
                            {(user?.hostStatus === "pending" || isHostReq === true) && (
                                <button onClick={checkHostStatus} className='px-4 py-2 hover:bg-bg transition w-full text-left md:hidden'>
                                    Check host status
                                </button>
                            )}
                            {user?.hostStatus === null && isHostReq === false && (
                                <button onClick={handleBecomeHost} className='px-4 py-2 hover:bg-bg transition w-full text-left md:hidden'>
                                    Become Host
                                </button>
                            )}
                            {user?.hostStatus === "active" && (
                                <button onClick={() => navigate("/host/dashboard")} className='px-4 py-2 hover:bg-bg transition w-full text-left md:hidden'>
                                    Switch to Host
                                </button>
                            )}


                        </div>
                    )}


                </div>


            </nav>
        </header>
    )
}

export default Navbar

import { StarIcon, UsersIcon } from '@heroicons/react/16/solid'
import { CurrencyRupeeIcon } from '@heroicons/react/16/solid'
import { CurrencyDollarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { HeartIcon } from '@heroicons/react/16/solid'
import { toggleWishlistApi } from '../redux/slices/wishlistSlice'

export default function PropertyCard({ property, isWishlisted }) {
    if (property.length===0) return null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);



  const handleOnclick = () => {
    navigate(`/property-details/${property._id}`)
  }

  const handleWishlist = async () => {

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await dispatch(toggleWishlistApi(property._id)).unwrap();
      console.log("Wishlist response:", res);
    } catch (error) {
      alert(error?.message || "Wishlist error");
    }
  }
  return (
    <div onClick={handleOnclick} className='mt-10 bg-white rounded-xl text-sm text-gray-800 shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer'>
      <div className='relative w-full h-56'>
        <img
          src={property.images?.[0]?.url}

          alt={property.title}
          className='w-full h-full object-cover'
        />

        <button onClick={(e) => {
          e.stopPropagation();
          handleWishlist();
        }} className="absolute top-3 right-3">
          <HeartIcon

            className={`w-6 h-6 cursor-pointer absolute top-3 right-3 ${isWishlisted ? "text-red-500 fill-red-500" : "text-white"
              }`}
          />
        </button>
      </div>

      <div className='flex flex-col gap-4  mt-4 mb-4 md:m-4'>
        <div className='flex items-center '>
          <p className='flex items-center w-1/2 pl-2 truncate'>
            <MapPinIcon className='h-5 w-5 mr-1 text-blue-800' />
            {property.location}</p>
          <p className='flex items-center w-1/2 pl-2'>
            <StarIcon className='w-6 h-6 text-yellow-600' />
            {property.rating}</p>
        </div>

        <div className='flex items-center'>
          <p className='flex items-center w-1/2 pl-2'>
            <CurrencyRupeeIcon className='text-blue-300 w-5 h-5 mr-1' />
            {property.pricePerNight}/Night
          </p>

          <p className='flex items-center w-1/2 pl-2'>
            <UsersIcon className='w-5 h-5 mr-1' />
            {property.maxGuests}
          </p>
        </div>

      </div>
    </div>
  )
}

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
  console.log("Porety from card",property)
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
  <div
    onClick={handleOnclick}
    className="group w-full mt-6 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
  >
    <div className="relative w-full h-52 sm:h-60 overflow-hidden">
      <img
        src={property.images?.[0]?.url}
        alt={property.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleWishlist();
        }}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <HeartIcon
          className={`w-5 h-5 ${
            isWishlisted
              ? "text-red-500 fill-red-500"
              : "text-gray-700"
          }`}
        />
      </button>

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center shadow-sm">
        <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
        <span className="text-xs font-semibold text-gray-800">
          {property.averageRating}
        </span>
      </div>
    </div>

    <div className="p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center text-gray-600 text-sm">
        <MapPinIcon className="h-4 w-4 mr-1 text-[#0F766E]" />
        <p className="truncate">{property.location}</p>
      </div>

      <div className="flex items-center text-gray-600 text-sm">
        <UsersIcon className="w-4 h-4 mr-1 text-[#0F766E]" />
        <span>{property.maxGuests} Guests</span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center text-base sm:text-lg font-semibold text-gray-900">
          <CurrencyRupeeIcon className="w-5 h-5 mr-1 text-[#0F766E]" />
          {property.pricePerNight}
          <span className="text-sm font-normal text-gray-500 ml-1">
            / night
          </span>
        </div>
      </div>
    </div>
  </div>
);


}

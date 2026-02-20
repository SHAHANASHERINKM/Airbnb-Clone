import { AdjustmentsHorizontalIcon, BuildingOffice2Icon, BuildingOfficeIcon, HomeIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FilterModel from './FilterModel';
import { useDispatch } from 'react-redux';
import { fetchProperties } from '../redux/slices/propertySlice';

export default function CategoryBanner() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterApply = (filters) => {
    dispatch(fetchProperties(filters));
    navigate("/filter");
    setFilterOpen(false);
  };

  const handleCategory = async (type) => {
    setActiveCategory(type);
    dispatch(fetchProperties({ propertyType: type })); // store in filteredProperties
    navigate("/filter");
  }


  return (
    <div className='w-full flex flex-col border-b  relative'>
      <div className='flex flex-row gap-5 md:gap-10 w-[80%] md:justify-center items-center h-20 relative overflow-x-auto whitespace-nowrap pr-20 md:pr-0 md:ml-20'>

        <div className='flex flex-col items-center'>
          <div onClick={() => handleCategory("house")} className={`flex flex-col items-center gap-1 text-xs cursor-pointer pb-2
  ${activeCategory === "house" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
          >
            <HomeIcon className='w-4 h-4 md:w-5 md:h-5 text-blue-500 hover:text-blue-700 hover:bg-bg hover:shadow-md' />
            <span>House</span>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div onClick={() => handleCategory("apartment")} className={`flex flex-col items-center gap-1 text-xs cursor-pointer pb-2
  ${activeCategory === "apartment" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
          >
            <BuildingOffice2Icon className='w-4 h-4 md:w-5 md:h-5 text-purple-500 hover:text-purple-700 hover:bg-bg hover:shadow-md' />
            Appartment</div>
        </div>

        <div className='flex flex-col items-center'>
          <div onClick={() => handleCategory("villa")} className={`flex flex-col items-center gap-1 text-xs cursor-pointer pb-2
  ${activeCategory === "villa" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
          >
            <HomeModernIcon className='w-4 h-4 md:w-5 md:h-5 text-teal-600 hover:text-teal-700 hover:text-blue-700 hover:bg-bg hover:shadow-md' />
            Villa</div>
        </div>

        <div className='flex flex-col items-center'>
          <div onClick={() => handleCategory("hotel")} className={`flex flex-col items-center gap-1 text-xs cursor-pointer pb-2
  ${activeCategory === "hotel" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
          >
            <BuildingOfficeIcon className='w-4 h-4 md:w-5 md:h-5 text-amber-500 hover:text-teal-700 hover:text-amber-700 hover:bg-bg hover:shadow-md' />
            Hotel</div>
        </div>

        <div className='flex flex-col items-center'>
          <div onClick={() => handleCategory("guesthouse")} className={`flex flex-col items-center gap-1 text-xs cursor-pointer pb-2
  ${activeCategory === "guesthouse" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
          >
            <HomeModernIcon className='w-4 h-4 md:w-5 md:h-5 text-rose-500 hover:text-teal-700 hover:text-rose-700 hover:bg-bg hover:shadow-md' />
            Guest House</div>
        </div>


      </div>
      <div className='absolute right-2 top-1/2 -translate-y-1/2  pl-2  '>
        <button className='flex  items-center gap-1 text-sm bg-bg px-3 py-3 boder rounded-full shadow-sm '
          onClick={() => setFilterOpen(!filterOpen)}
        >

          <AdjustmentsHorizontalIcon className='w-4 h-4 md:w-6 md:h-6 text-primary  hover:bg-bg hover:shadow-md' />
          <span>Filters</span>
        </button>


      </div>
      {filterOpen && (<FilterModel
        closeModel={setFilterOpen}
        applyFilter={handleFilterApply}
      />)}


    </div>
  )
}

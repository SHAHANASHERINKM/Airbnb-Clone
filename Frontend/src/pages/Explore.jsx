import React, { useEffect } from 'react'
import PropertyGrid from '../components/PropertyGrid'
import CategoryBanner from '../components/CategoryBanner'
import { useSelector } from 'react-redux'


function Explore() {
  const allProperties=useSelector(state=>state.properties.allProperties);

 
  return (
    <div className='w-full' >
      <CategoryBanner/>
      <PropertyGrid properties={allProperties}/>
    </div>
  )
}

export default Explore

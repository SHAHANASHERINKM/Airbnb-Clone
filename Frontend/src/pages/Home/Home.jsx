import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryBanner from '../../components/CategoryBanner'

import PropertyGrid from '../../components/PropertyGrid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProperties } from '../../redux/slices/propertySlice'
import { fetchWishlist } from '../../redux/slices/wishlistSlice'


export default function Home() {
  const dispatch=useDispatch();
  const allProperties=useSelector(state=>state.properties.allProperties);
   

useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);


  useEffect(()=>{
    if(allProperties.length===0){
      dispatch(fetchProperties());
    }
    
  },[dispatch,allProperties]);


  return (
    <div>
      <HeroSection/>
      <CategoryBanner/>
     <PropertyGrid properties={allProperties} limit={8}/>
      
    </div>
  )
}

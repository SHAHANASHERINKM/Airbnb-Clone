import React from 'react'
import { useSelector } from 'react-redux';
import PropertyGrid from '../components/PropertyGrid';
import CategoryBanner from '../components/CategoryBanner';

function FilteredList() {

  const allProperties = useSelector(state => state.properties.filteredProperties);

  return (
    <div className='w-full' >
      <CategoryBanner />
      <PropertyGrid properties={allProperties} />
    </div>
  )

}

export default FilteredList

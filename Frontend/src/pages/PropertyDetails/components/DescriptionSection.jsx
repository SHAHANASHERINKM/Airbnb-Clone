import { MapPinIcon, StarIcon } from '@heroicons/react/16/solid'
import React from 'react'

function DescriptionSection({property}) {


  return (
    <div className='w-full flex flex-col mt-5 gap-2 md:pl-5 text-xl  border-b border-secondary pb-5  '>
     <div className='flex justify-between items-center'>
        <span className='flex gap-2 items-center'>
            <MapPinIcon className='w-6 h-6 text-blue-500'/>
            {property.location}

        </span>
        <span className='flex gap-2 items-center'>
            <StarIcon className='w-6 h-6 text-yellow-600'/>
            {property.rating}
        </span>
     </div>
     <div>
        <p>{property.description}</p>
     </div>
    </div>
  )
}

export default DescriptionSection

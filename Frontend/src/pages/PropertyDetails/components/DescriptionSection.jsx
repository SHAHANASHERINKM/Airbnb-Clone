import { MapPinIcon, StarIcon } from '@heroicons/react/16/solid'
import React from 'react'

function DescriptionSection({property,averageRating}) {

  return (
    <div className='w-full flex flex-col mt-5 gap-2 md:pl-5 text-xl  border-b border-secondary pb-5  '>
     <div className='flex justify-between items-center'>
        <span className='flex gap-2 items-center'>
            <MapPinIcon className='w-6 h-6 text-primary'/>
            {property.location}

        </span>
        <span className='flex gap-2 items-center'>
            <StarIcon className='w-6 h-6 text-yellow-600'/>
            {averageRating}
        </span>
     </div>
     <div>
        <p className='text-gray-700 text-[18px]'>{property.description}</p>
     </div>
    </div>
  )
}

export default DescriptionSection

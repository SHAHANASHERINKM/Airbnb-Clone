
import React from 'react';
import PropertyCard from './PropertyCard';
import { useSelector } from 'react-redux';

function PropertyGrid({ properties, limit }) {

    const wishlistItems = useSelector(state => state.wishlist?.wishlistItems);
    const displayedProperties = limit ? properties.slice(0, limit) : properties;
    console.log("wishlist items1:", wishlistItems)

    if (!properties || properties.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No properties found
            </div>
        );
    }

    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 md:gap-14'>
            {displayedProperties.map((property) => {
                const isWishlisted = wishlistItems?.some(
                    item => item._id === property._id
                );

                console.log(isWishlisted)

                return (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        isWishlisted={isWishlisted}
                    />
                );
            })}

        </div>
    );
}

export default PropertyGrid;


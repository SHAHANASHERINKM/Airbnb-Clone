import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom';
import { getSingleProperty } from '../../services/propertyService';
import { useState } from 'react';
import ImageSection from './components/ImageSection';
import DescriptionSection from './components/DescriptionSection';
import Availabilitycard from './components/Availabilitycard';
import FeaturesCard from './components/FeaturesCard';

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    console.log(id)
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getSingleProperty(id);

                console.log("data in card0",data)
                setProperty(data.property);
            }
            catch (error) {
                console.error("Failed to fetch property:", error);
                setError(error.response?.data?.message || error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProperty();

    }, [id]);
    if (loading) return <div className='text-center mt-10'> Loading..</div>
    if (error) return <div className='text-center mt-10 text-red-500'>{error} </div>

    if (!property) return <div className='text-center mt-10'>Property not found(frontend)</div>
    return (
        <div className='w-full'>
            <h1 className='font-semibold text-[30px] text-primary'>{property.title}</h1>
            <ImageSection images={property.images} />
            <DescriptionSection property={property} />
            <div className='grid md:grid-cols-2  gap-4 mt-10  items-start'>
                <div className='flex justify-center'>
                    <FeaturesCard property={property} />            </div>
                <div className='flex justify-center'>
                    <Availabilitycard property={property} />
                </div>

            </div>
            <div className='mt-5 md:pl-5'>
                <h1 className='text-xl pb-5'>Instructions for guests</h1>
                <p>{property.instructions} </p>
            </div>


        </div>
    )
}

export default PropertyDetails

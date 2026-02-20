import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom';
import { fetchPropertyReview, getSingleProperty } from '../../services/propertyService';
import { useState } from 'react';
import ImageSection from './components/ImageSection';
import DescriptionSection from './components/DescriptionSection';
import Availabilitycard from './components/Availabilitycard';
import FeaturesCard from './components/FeaturesCard';

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews,setReviews]=useState([]);
    const [showAll, setShowAll] = useState(false);
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getSingleProperty(id);
                setProperty(data.property);
                 setAverageRating(data.property.averageRating)
            }
            catch (error) {
                console.error("Failed to fetch property:", error);
                setError(error.response?.data?.message || error.message);
            }
            finally {
                setLoading(false);
            }
        };
        const fetchReview=async()=>{
            try{
                const res=await  fetchPropertyReview(id);

                setReviews(res.reviews);
            }
            catch(error){
                alert(error?.response?.data.message || "something wrong");

            }
        }
        fetchProperty();
        fetchReview();

    }, [id]);
    if (loading) return <div className='text-center mt-10'> Loading..</div>
    if (error) return <div className='text-center mt-10 text-red-500'>{error} </div>

    if (!property) return <div className='text-center mt-10'>Property not found(frontend)</div>
    return (
        <div className='w-full'>
            <h1 className='font-semibold text-[30px]  text-primary  font-serif'>{property.title}</h1>
            <ImageSection images={property.images} />
            <DescriptionSection property={property} averageRating={averageRating} />
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

             <div className='mt-5 md:pl-5'>
  <h1 className='text-xl pb-5'>Reviews</h1>

  <div>
  {(!reviews || reviews.length === 0) ? (
    <p>No reviews yet.</p>
  ) : (
    <>
      {(showAll ? reviews : reviews.slice(0, 2)).map((review, index) => (
        <div key={index} className='mb-4 border-b pb-3'>
          <p className='font-semibold'>{review.user.name}</p>
          <p className='flex items-center gap-1'>
            {Array.from({ length: review.rating }).map((_, i) => (
              <span key={i} className='text-yellow-500'>★</span>
            ))}
            {Array.from({ length: 5 - review.rating }).map((_, i) => (
              <span key={i} className='text-gray-300'>★</span>
            ))}
          </p>
          <p className='text-gray-700 mt-1'>{review.comment}</p>
        </div>
      ))}

      {reviews.length > 2 && (
        <button
          className='text-primary mt-2 font-semibold'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </>
  )}
</div>
</div>


        </div>
    )
}

export default PropertyDetails

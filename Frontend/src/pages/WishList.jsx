import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropertyGrid from '../components/PropertyGrid';
import { fetchWishlist } from '../redux/slices/wishlistSlice';

function WishList() {
    const dispatch=useDispatch();
    useEffect(() => {
  if (!wishlist || wishlist.length === 0) {
    dispatch(fetchWishlist());
  }
}, [dispatch]);
    const wishlist = useSelector(state => state.wishlist.wishlistItems);
    console.log("wishlist page", wishlist)
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-col justify-center'>
                <h1 className='text-[40px] font-semibold'>Your Wishlist</h1>
                <p className='text-gray-500 text-[20px]'>Saved properties you love</p>
            </div>
            <PropertyGrid properties={wishlist} />


        </div>
    )
}

export default WishList

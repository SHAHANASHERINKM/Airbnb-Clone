import React from 'react'
import heroImage from "../../assets/hero.jpg"
import SearchBar from '../../components/SearchBar'

function HeroSection() {
  return (
    <section className='relative w-full h-[500px] rounded-b-3xl overflow-hidden'>
        <img src={heroImage} 
        alt="Hero Image"
        className='absolute inset-0 w-full h-full object-cover' 
        />
        {/* overlay */}
         <div className="absolute inset-0 bg-black/50 b"></div> 

        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center px-6'>
            <h1 className='text-white text-4xl md:text-5xl font-bold mb-4'>Not sure where to go? Perfect</h1>
            <p className='text-white text-lg md:text-xl mb-8'>Discover stays to live,work,or just relax.</p>
            <SearchBar/>
        </div>

    </section>
  )
}

export default HeroSection

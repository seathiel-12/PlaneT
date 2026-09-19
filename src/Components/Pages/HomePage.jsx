import React, { useEffect } from 'react'
import Hero from '../Presentation/Hero/Hero'
import CallToAction from '../Presentation/CallToAction/CallToAction'
import AboutUs from '../Presentation/AboutUs/AboutUs'
import PopularDestinations from '../Presentation/PopularDestinations/PopularDestinations';
import BestDeals from '../Presentation/BestDeals/BestDeals';
import { useBookFlightStore } from '../Features/BookFlight/store';

function HomePage() {
  const {reset, isBooked} = useBookFlightStore();
  useEffect(()=>{
    if(isBooked)
      reset();
  }, [isBooked])
  return (
    <div>
        <Hero/>
        <PopularDestinations/>
        <BestDeals/>
        <AboutUs/>
        <CallToAction/>
    </div>
  )
}

export default HomePage
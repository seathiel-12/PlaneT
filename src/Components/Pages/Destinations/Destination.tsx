import { MapPin } from 'lucide-react'
import Bubble from '../../../Utils/Components/Bubble/Bubble'
import SearchFlightForm, { type SearchFlightProps } from '../../Features/SearchFlight/SearchFlightForm'
import FlightCard from '../../Features/SearchFlight/FlightCard';
import { useState, useRef, useMemo } from 'react';
import { useGsapCardReveal, useGsapTextReveal } from '../../../Utils/Components/AnimationComponent/GsapReveal';
import SearchDestination from '/assets/Images/search-destinations.png';
import { useBookFlightStore } from '../../Features/BookFlight/store';
import { LoadingSkeleton } from '../../../Utils/Components/AnimationComponent/LoadingStates/LoadingSkeleton';


const Destination = () => {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {lookingFlights} = useBookFlightStore();

    const initialFilter: SearchFlightProps = {
      destination: '',
      continent: 'All',
      sortBy: 'Most Popular',
      priceRange: [0,5000]
    }
    const [filter, setFilter] = useState(initialFilter);

    const sortedFlights = useMemo(()=> {
      switch(filter.sortBy){
          case 'Most Popular':
              return lookingFlights.sort((a,b) =>b.ratingCount - a.ratingCount)
          case 'Price: Low to High' :
              return lookingFlights.sort((a,b) => a.price - b.price)
          case 'Price: High to Low':
              return lookingFlights.sort((a,b) => b.price - a.price)
          case 'Highest Rated':
              return lookingFlights.sort((a,b) => b.rating - a.rating)
          case 'Name A-Z':
              return lookingFlights.sort((a,b) => a.city.localeCompare(b.city))
          default:
              return lookingFlights;
      }         
    },[lookingFlights, filter.sortBy]);

    useGsapTextReveal({ containerRef: pageRef, start: 'top 90%' });
    useGsapCardReveal({ containerRef: pageRef, start: 'top 88%', stagger: 0.1, refreshKey: sortedFlights.length });

  return (
    <div ref={pageRef} className='px-4 py-10 sm:px-6 sm:py-15 bg-gray-100'>
      <div className='mb-10 w-full max-w-3xl m-auto text-center'>
            <Bubble text='Explore the World' Icons={MapPin} />
        <h1 data-reveal-text className='text-3xl sm:text-5xl playfair-display my-2'>Discover Amazing Destinations</h1>
        <p data-reveal-text className='text-base sm:text-lg text-gray-500 w-full sm:w-[70%] m-auto'>From iconic cities to hidden gems, find your perfect travel destination from our curated collection of global locations.</p>
        </div>

      <div className='w-full max-w-7xl lg:w-[80%] m-auto'>
            <div data-reveal-card>
              <SearchFlightForm
                setFilter={setFilter}
                filter={filter}
                initialFilter={initialFilter}
                setIsLoading={setIsLoading}
              />
            </div>
          <div>
            {
              isLoading ? (
                <>
                  <p className="my-10 text-gray-500">Loading destinations...</p>
                  <LoadingSkeleton />
                </>
              ) : (sortedFlights.length > 0) ? (
                <>
                  <p data-reveal-text className="my-10">Showing <strong>{sortedFlights.length}</strong> destinations</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-10 my-5">
                      {
                      sortedFlights.map((card, index) => (
                          <div data-reveal-card key={`${card.city}-${index}`}>
                            <FlightCard card={card} hasBookingButton={true} />
                          </div>
                        ))  
                      }
                  </div>
                </>
              ) : (
                <div data-reveal-card className='rounded-2xl my-10 sm:my-15 text-center'>
                  <img
                    src={SearchDestination}
                    className="w-full max-w-[37.5rem] h-auto max-h-[25rem] object-contain block m-auto"
                  />
                  <p data-reveal-text className="max-w-full m-auto text-xl sm:text-3xl" >Search a flight and quickly book your ticket.</p>
                </div>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Destination
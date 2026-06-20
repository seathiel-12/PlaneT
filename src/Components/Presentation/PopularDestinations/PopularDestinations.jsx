import { Badge, Button } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import { flightCardsMock } from '../../../mocks/flightCardsMock';
import FlightCard from '../../Features/SearchFlight/FlightCard';
import { Link } from 'react-router';
import { useEffect } from 'react';

const PopularDestinations = () => {
    
  return (
    <div className="px-20 py-30 bg-gray-50">
        <Badge variant="light" size="md" color="gray" style={{color:'gray'}}>
            Popular Destinations
        </Badge>

        <h2 className="playfair-display my-5 text-3xl">Explore Trending Locations</h2>

        <div className="flex justify-between">
            <p className="text-gray-500 w-[60%] text-2xl ">Discover our most sought-after destinations around the globe, handpicked for unforgettable experiences.</p>
            <Link to={'/destinations'} >
                <Button
                    variant="default"
                    rightSection={<ArrowRight className="stroke-gray-600" />}
                    size="lg"
                    bd={'solid 1px var(--color-gray-200)'}
                    className="shadow-md bg-[#f8f8f8d0] hover:bg-gray-100"
                    style={{color:'var(--color-gray-600)'}}
                >
                    View All Destinations
                </Button>
            
            </Link>
        </div>

        <div className="grid grid-cols-[repeat(3,1fr)] gap-10 my-20">
            {
                flightCardsMock.slice(0,6).map((card, index)=>
                <FlightCard hasBookingButton={false} {...card} key={index} />)
            }
        </div>

    </div>
  )
}

export default PopularDestinations
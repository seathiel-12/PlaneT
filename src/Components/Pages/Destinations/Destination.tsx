import { MapPin } from 'lucide-react'
import Bubble from '../../../Utils/Components/Bubble/Bubble'
import SearchFlightForm from '../../Features/SearchFlight/SearchFlightForm'
import FlightCard from '../../Features/SearchFlight/FlightCard';
import { flightCardsMock } from '../../../mocks/flightCardsMock';

const Destination = () => {
  return (
    <div className='py-15 bg-gray-100'>
        <div className='mb-10 w-max m-auto text-center'>
            <Bubble text='Explore the World' Icons={MapPin} />
            <h1 className='text-5xl playfair-display my-2'>Discover Amazing Destinations</h1>
            <p className='text-lg text-gray-500 w-[70%] m-auto'>From iconic cities to hidden gems, find your perfect travel destination from our curated collection of global locations.</p>
        </div>

        <div className='w-[80%] m-auto'>
            <SearchFlightForm/>

            <p className="my-10">Showing <strong>{flightCardsMock.length}</strong> destinations</p>
            <div className="grid grid-cols-[repeat(3,1fr)] gap-10 my-5">
                {
                  flightCardsMock.map((card, index) => (
                    <FlightCard key={index} {...card}/>
                  ))
                }
            </div>
        </div>
        
    </div>
  )
}

export default Destination
import { ArrowRight } from "lucide-react";
import Bubble from "../../../Utils/Components/Bubble/Bubble";
import { FlightTicket } from "../../Features/BookFlight/FlightTicket";
import type { FlightTicketProps } from "../../Features/BookFlight/type";
import { Link } from "react-router";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useBookFlightStore } from "../../Features/BookFlight/store";

const BestDeals = () => {
    const ticketMockProps: FlightTicketProps[] = [
        {
            company: 'Air France',
            classTravel: 'Business',
            departureAt: new Date().toUTCString(),
            landingAt: new Date(Date.now()).toUTCString(),
            duration: '7h 30min',
            from: 'Paris (CDG)',
            to: 'Japan (JPY)',
            price: 869,
            typeFlight:'Direct',
            seatsLeft: '32'
        },
        {
            company: 'Air France',
            classTravel: 'Business',
            departureAt: new Date().toUTCString(),
            landingAt: new Date(Date.now()).toUTCString(),
            duration: '7h 30min',
            from: 'Paris (CDG)',
            to: 'Japan (JPY)',
            price: 869,
            typeFlight:'Direct',
            seatsLeft: '32'
        },
        {
            company: 'Air France',
            classTravel: 'Business',
            departureAt: new Date().toUTCString(),
            landingAt: new Date(Date.now()).toUTCString(),
            duration: '7h 30min',
            from: 'Paris (CDG)',
            to: 'Japan (JPY)',
            price: 869,
            typeFlight:'Direct',
            seatsLeft: '32'
        },
        {
            company: 'Air France',
            classTravel: 'Business',
            departureAt: new Date().toUTCString(),
            landingAt: new Date(Date.now()).toUTCString(),
            duration: '7h 30min',
            from: 'Paris (CDG)',
            to: 'Japan (JPY)',
            price: 869,
            typeFlight:'Direct',
            seatsLeft: '32'
        }
    ]
    const navigate = useNavigate();
    const { setFlightSelectedInfos } = useBookFlightStore();
    const onSelect = (flightSelected: FlightTicketProps) => {
        setFlightSelectedInfos(flightSelected);        
        navigate('/book-flight');
    }
  return (
    <div className="py-20 px-20 bg-gray-50">
        <Bubble text="Featured Flights"/>
        <h2 className="playfair-display text-4xl text-center mt-6">Today's Best Deals</h2>
        <p className="text-center text-xl text-gray-500 my-4">Grab these limited-time offers on popular routes before they're gone.</p>

        <div className="grid grid-cols-2 gap-10 mt-10">
            {
                ticketMockProps.map((ticket, index)=> <div key={index}><FlightTicket onSelect={()=>onSelect(ticket)} flight={ticket} variant='secondary' /></div>)
            }
        </div>
        
        <Link to={'/destinations'} className="w-max m-auto block">
            <Button
                rightSection={<ArrowRight/>}
                size="lg"
                mt={'50px'}
                bg={'#f8f8f8d0'}
                bd={'solid 1px var(--color-gray-200)'}
                style={{color:'var(--color-gray-600)'}}
                className="hover:bg-gray-100 shadow-md hover:scale-98 duration-200"
            >
                View All Flights
            </Button>
        </Link>
    </div>
  )
}

export default BestDeals
import Bubble from "../../../Utils/Components/Bubble/Bubble";
import { FlightTicket } from "../../Features/BookFlight/FlightTicket";
import { useNavigate } from "react-router-dom";
import { useBookFlightStore } from "../../Features/BookFlight/store";
import { shadowRevealOnScroll } from "../../../Utils/Components/AnimationComponent/ShadowReveal";
import { routeMatcher } from "../../router";
import type { Flight } from "../../../types";
import { useEffect, useRef, useState } from "react";
import apiFetch from "../../../Utils/Functions/apiFetch";
import { useQuery } from "@tanstack/react-query";
import { LoadingSkeletonLarge } from "../../../Utils/Components/AnimationComponent/LoadingStates/LoadingSkeletonLarge";
import { useToasting } from "../../../Utils/Functions/useToasting";

 const BestDeals = () => {
    const navigate = useNavigate();
    const { setFlightSelectedInfos } = useBookFlightStore();
    const cardsRef = useRef<HTMLDivElement | null>(null);
    const onSelect = (flightSelected: Flight) => {
        setFlightSelectedInfos(flightSelected);        
        navigate(`${routeMatcher.booking}?step=2`);
    }
    const {notify} = useToasting();
    const [flights, setFlights] = useState<Flight[]>([]);
    const getBestDeals = async () => {
        try {
            const data = await apiFetch<Flight[]>('http://localhost:3000/flights', {
                params: { price_lt: 500 },
                timeout: 10000,
            });
            if (!data.success) {
                notify('Could not load best deals.', 'error');
                return;
            }
            setFlights(Array.isArray(data.body) ? data.body : []);
            return data.body ?? [];
        } catch (error) {
            notify('Could not load best deals.', 'error');
            return error
        }
    };

    const {isLoading} = useQuery({
        queryKey: ['bestDeals'],
        queryFn: getBestDeals
    })
    useEffect(() => {
        shadowRevealOnScroll(cardsRef.current, {start: 'top 80%'})
    }, [flights]);

  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-8 sm:py-20 lg:px-10">
        <Bubble text="Featured Flights"/>
        <h2 className="playfair-display mt-6 text-center text-3xl sm:text-4xl">Today's Best Deals</h2>
        <p className="my-4 text-center text-base text-gray-500 sm:text-xl">Grab these limited-time offers on popular routes before they're gone.</p>

        {
            isLoading ? 
            <div className="mt-10">
                <LoadingSkeletonLarge/> 
            </div>
            :
            <div>
                {
                    Boolean(flights.length) ? 
                        <div ref={cardsRef} className="mx-auto mt-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {
                            flights.slice(0,4).map((ticket, index)=> <div key={index}><FlightTicket onSelect={()=>onSelect(ticket)} flight={ticket} variant='secondary' /></div>)
                        }
                        </div>
                        :
                        <div className="bg-white shadow-lg rounded-xl mt-10 py-15">
                            <img src='/assets/Images/no_results.jpg' className="w-60 block m-auto rounded-full"/>
                            <p className="mx-auto mt-5 max-w-full px-4 text-center text-xl font-semibold text-gray-500 sm:text-3xl">Soon will be available best deals</p>
                        </div>


                }
            </div>
        }
        
        {/* <Link to={'/destinations'} className="w-max m-auto block">
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
        </Link> */}
    </div>
  )
}

export default BestDeals

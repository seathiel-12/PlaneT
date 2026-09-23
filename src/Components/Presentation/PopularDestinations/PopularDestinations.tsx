import { Badge, Button, Menu, Rating, ThemeIcon } from '@mantine/core';
import { ArrowRight, Clock, HeartIcon, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useRef, useState, type FC } from 'react';
import { fadeInOnScroll } from '../../../Utils/Components/AnimationComponent/ScrollFadeIn';
import { ExpandableCard } from '../../../Utils/Components/AnimationComponent/ExpandableCard/ExpandableCard';
import { useNavigate } from 'react-router-dom';
import { useBookFlightStore } from '../../Features/BookFlight/store';
import { routeMatcher } from '../../router';
import type {Flight}  from '../../../types';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../../Utils/Functions/apiFetch';
import { LoadingSkeleton } from '../../../Utils/Components/AnimationComponent/LoadingStates/LoadingSkeleton';
import { useToasting } from '../../../Utils/Functions/useToasting';
import Image from '../../../Utils/Components/Image/Image';

const currency = '$';

const PopularDestinations = () => {
    const cardsRef = useRef<HTMLDivElement | null>(null)
    const [popularFlights, setPopularFlights] = useState<Flight[]>([]);
    const {notify} = useToasting();
    const {isLoading} = useQuery({queryKey: ['popularDestinations'], queryFn: async ()=>{
        try{
            const res = await apiFetch<Flight[]>('http://localhost:3000/flights', {
                params: {
                    isPopular: true
                }
            })
            if(res){
                if(!res.success){
                    notify('Could not load popular destinations.','error')
                    return res;
                }
                setPopularFlights(res.body ?? []);
                return res;
            }
        }catch(err){
            notify('Could not load popular destinations.','error')
            return {success:false, body:[]};
        }
    }})

    const {refetch} = useQuery({
        queryKey:['AllDestinations'],
        queryFn: async ()=>{
           const res = await apiFetch('http://localhost:3000/flights');
           return res;
        },
        enabled: false
    });
    
    useEffect(()=>{
        fadeInOnScroll(cardsRef.current, {start: 'top 90%'})
    }, [popularFlights]);
  return (
    <div className="bg-gray-50 px-4 py-16 pt-0 sm:px-8 sm:py-20 lg:px-10 lg:py-30 lg:pt-0">
        <Badge variant="light" size="md" color="gray" style={{color:'gray'}}>
            Popular Destinations
        </Badge>

        <h2 className="playfair-display my-5 text-3xl">Explore Trending Locations</h2>

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="w-full text-lg text-gray-500 sm:text-xl md:w-[60%] md:text-2xl">Discover our most sought-after destinations around the globe, handpicked for unforgettable experiences.</p>
            <Link to={'/destinations'} onClick={()=>{
                refetch();
                }}>
                <Button
                    variant="default"
                    rightSection={<ArrowRight className="stroke-gray-600" />}
                    size="lg"
                    bd={'solid 1px var(--color-gray-200)'}
                    className="w-full shadow-md bg-[#f8f8f8d0] hover:bg-gray-100 sm:w-auto"
                    style={{color:'var(--color-gray-600)'}}
                >
                    View All Destinations
                </Button>
            
            </Link>
        </div>

        {
            isLoading ?
            <div className="my-20">
                <LoadingSkeleton/>
            </div> :
            <div>
                {
                    Boolean(popularFlights.length) ?             
                    <div ref={cardsRef} className="my-12 grid grid-cols-1 gap-6 sm:my-16 sm:grid-cols-2 sm:gap-8 lg:my-20 lg:grid-cols-3 lg:gap-10">
                        {
                            popularFlights.slice(0,6).map((card, index)=>(
                            <ExpandableCard
                                key={index}
                                title={card.city}
                                category={card.toCountry}
                                images={[typeof card.imagePath === 'string' ? card.imagePath : card.imagePath[0]]}
                                previewElement={
                                <PreviewElement card={card} />
                                }
                            >
                                <DetailsElement card={card} />
                            </ExpandableCard>
                            ))
                        }
                    </div> :
                    <div className="bg-white shadow-lg rounded-xl mt-10 py-15">
                        <img src='/assets/Images/no_results.jpg' className="w-60 block m-auto rounded-full"/>
                        <p className="mx-auto mt-5 max-w-full px-4 text-center text-xl font-semibold text-gray-500 sm:text-3xl">Soon will be available popular flights</p>
                    </div>

                }
            </div>
        }
    </div>
  )
}

// Composant pour l'élément preview
const PreviewElement:FC<{card: Flight}> = ({ card }) => {
  const [isLike, setIsLiked] = useState(card.isLiked);
  
  return (
    <div className="w-full">
      <div className="w-full h-70 bg-gray-300 rounded-t-xl mb-4 relative overflow-hidden">
        <Image src={typeof card.imagePath === 'string' ? card.imagePath : card.imagePath[0]} alt={`${card.city} image`} className="w-full h-full scale-101 bg-cover rounded-t-2xl hover:scale-110 duration-200"/>
        <Badge className="absolute bottom-3 left-5" size="lg" color="white" leftSection={<MapPin size={15} stroke="var(--sb-blue-250)" />}>
            <span className="text-gray-700 text-md">{card.toCountry}</span>
        </Badge>
        <ThemeIcon
            variant="gradient"
            size="xl"
            c={isLike ? 'white' : 'gray.7'}
            bg={'white'}
            pos={'absolute'}
            top={'10px'}
            right={'10px'}
            bdrs={'xl'}
            className="hover:scale-105 duration-200 cursor-pointer"
            onClick={() => setIsLiked(!isLike)}
        >
            <HeartIcon
                className={isLike ? 'fill-red-500 stroke-red-500 stroke-2' : 'stroke-gray-700 stroke-2'}
            />
        </ThemeIcon>

        {
            card.isPopular && <p className="rounded-full py-1 px-3 absolute top-4 left-4 bg-orange-500 text-sm font-semibold">Popular</p>
        }
      </div>
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
            <span className="text-xl font-semibold playfair-display">{card.city}</span>
            <div className="flex items-center gap-1 text-md">
                <Rating defaultValue={1} readOnly count={1}/>
                <span className="translate-y-0.5 font-semibold">{card.rating}</span>
                <span className="translate-y-0.5 text-gray-600">({card.ratingCount})</span>
            </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour l'élément détails
const DetailsElement:FC<{card:Flight}> = ({ card }) => {
    const navigate = useNavigate();
    const { setFlightSelectedInfos, setFlightInfos } = useBookFlightStore();

  return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-5 w-full">
            <span className="text-xl font-semibold playfair-display">{card.city}</span>
            <div className="flex items-center gap-1 text-md">
                <Rating defaultValue={1} readOnly count={1}/>
                <span className="translate-y-0.5 font-semibold">{card.rating}</span>
                <span className="translate-y-0.5 text-gray-600">({card.ratingCount})</span>
            </div>
        </div>
        

        <p className="my-5 text-gray-700 min-h-12">{card.description}</p>

        <div className="flex gap-2 mb-5">
            {
                card.caracteristics.slice(0,3).map((carac, index)=> <Badge variant="default" size="lg" key={index}>{carac}</Badge>)
            }
        </div>
        <hr className="my-5 border-gray-300" />

        <div className="flex items-center justify-between mt-7">
            <div className="flex items-center gap-1 text-gray-700">
                <Clock width={18} height={18} className="top-[2px] relative" />
                <span className="h-5">{new Date(card.departureAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-5">
                <p className="text-right">From <br /> <span className="text-3xl font-bold text-(--sb-blue-250)">{currency}{card.price}</span></p>
            </div>
            
        </div>
            <Menu shadow="md" closeOnItemClick={false} closeOnEscape={false}>
                <Menu.Target>
                <Button
                    style={{width:'100%'}}
                    className={'rounded-xl mt-5 shadow-xs border-[0.5px] border-gray-300 flex justify-self-end bg-(--sb-blue-250) text-white py-2 px-3'}
                >Book</Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <form>
                        {
                            Array(8).fill(0).map((_, index)=> <Menu.Item 
                            key={index}
                            onClick={(e)=>{
                                if(e.currentTarget){
                                            setFlightInfos({travelFrom: card.fromCountry, travelTo: card.toCountry, departureDate: card.departureAt, returnDate: card.landingAt, travelClass: card.classTravel, passengersCount: index + 1});
                                    setFlightSelectedInfos(card);
                                    navigate(`${routeMatcher.booking}?step=2`)
                                } 
                            }}>{index+1} passenger(s)</Menu.Item>)
                        }
                    </form>
                </Menu.Dropdown>
             </Menu>
      </div>
  );
};

export default PopularDestinations;

import { Badge, HoverCard, Menu, Rating, ThemeIcon } from "@mantine/core";
import { ArrowRight, Clock, HeartIcon, MapPin } from "lucide-react";
import { useState, type FC } from "react";
import Button from "../../../Utils/Components/Button/Button";
import type { Flight } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useBookFlightStore } from "../BookFlight/store";
import { routeMatcher } from "../../router";
import Image from "../../../Utils/Components/Image/Image";


export const currency = '$';

const FlightCard:FC<{card:Flight, hasBookingButton?: boolean}> = ({card, hasBookingButton}) => {
    const [isLike, setIsLiked] = useState(card.isLiked);
    const navigate = useNavigate();
    const {setFlightSelectedInfos, setFlightInfos, flightInfos} = useBookFlightStore();
  return (
    <div className="rounded-xl border-[0.5px] bg-white border-gray-300 shadow-lg gap-5 mb-7 pb-10 duration-200 ">
        <div className="preview w-full h-70 bg-gray-300 rounded-t-lg mb-4 relative overflow-hidden border-b border-b-gray-200">
            <Image src={card.imagePath[0]} alt={`${card.city} image`} className="w-full h-full bg-cover object-cover rounded-t-xl hover:scale-110 duration-200 "/>
            <Badge className="absolute bottom-3 left-5" color="white" size="lg" leftSection={<MapPin size={15} stroke="var(--sb-blue-250)" />}>
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
        <div className="px-5">
            <div className="flex items-center justify-between">
                <span className="text-xl font-semibold playfair-display">{card.city}</span>
                <div className="flex items-center gap-1 text-md">
                    <Rating defaultValue={1} readOnly count={1}/>
                    <span className="translate-y-0.5 font-semibold">{card.rating}</span>
                    <span className="translate-y-0.5 text-gray-600">({card.ratingCount})</span>
                </div>
            </div>
            
            <HoverCard position="top">
                <HoverCard.Target>
                    <p className="my-5 text-gray-700 line-clamp-2 min-h-12">{card.description}</p>
                </HoverCard.Target>
                <HoverCard.Dropdown className="max-w-70" style={{background:'#dfdfdf'}}>
                    <p className="text-gray-700">{card.description}</p>
                </HoverCard.Dropdown>
            </HoverCard>

            <div className="flex gap-2">
                {
                    card.caracteristics.slice(0,3).map((carac, index)=> <Badge variant="default" size="lg" key={index}>{carac}</Badge>)
                }
            </div>
            <hr className="my-5 border-gray-300" />

            <div className="flex items-center justify-between mt-7">
                <div className="flex items-center gap-1 text-gray-700">
                    <Clock width={18} height={18} />
                    <span className="h-5">{card.duration}</span>
                </div>

                <div className="flex items-center gap-5">
                    <p className="text-right">From <br /> <span className="text-3xl font-bold text-(--sb-blue-250)">{currency}{card.price}</span></p>

                    {   hasBookingButton &&
                        <div>
                            {
                                !flightInfos.passengersCount ? 
                                <Menu shadow="md" closeOnItemClick={false} closeOnEscape={false}>
                                    <Menu.Target>
                                    <Button
                                        textContent={'Book'}
                                        Icon={ArrowRight}
                                        Iposition="right"
                                        className={'rounded-xl shadow-xs border-[0.5px] border-gray-300 flex justify-self-end bg-(--sb-blue-250) text-white py-2 px-3'}
                                    />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <form>
                                            {/* <Select
                                                label="Passengers"
                                                placeholder="Pick value"
                                                data={Array(8).fill(0).map((_, index)=> `${index+1} passenger(s)`)}
                                                value={`${flightInfos.passengersCount} passenger(s)`}
                                                onChange={(value)=>{
                                                    if(value){
                                                        setFlightSelectedInfos(card);
                                                        setFlightInfos({... flightInfos, travelFrom: card.fromCountry, travelTo: card.toCountry, departureDate: card.departureAt, returnDate: card.landingAt, travelClass: card.classTravel
                                                        });
                                                        navigate(`${routeMatcher.booking}?step=2`);
                                                    }                               
                                                }}  
                                            /> */}
                                            {
                                                Array(8).fill(0).map((_, index)=> <Menu.Item 
                                                key={index}
                                                onClick={(e)=>{
                                                    if(e.currentTarget){
                                                            setFlightInfos({travelFrom: card.fromCountry, travelTo: card.toCountry, departureDate: card.departureAt, returnDate: card.landingAt, travelClass: card.classTravel,
                                                            passengersCount: index + 1
                                                        });
                                                        setFlightSelectedInfos(card);
                                                        navigate(`${routeMatcher.booking}?step=2`);
                                                        
                                                    } 
                                                }}>{index+1} passenger(s)</Menu.Item>)
                                            }
                                        </form>
                                    </Menu.Dropdown>
                                </Menu>
                                :
                                <Button
                                textContent="Book"
                                className="bg-(--sb-blue-250) text-white px-3 py-2 rounded-md text-lg"
                                Icon={()=><ArrowRight className="scale-90" />}
                                Iposition="right"
                                onClick={()=>{
                                    setFlightSelectedInfos(card);
                                    setFlightInfos({...flightInfos, travelFrom: card.fromCountry, travelTo: card.toCountry, departureDate: card.departureAt, returnDate: card.landingAt, travelClass: card.classTravel
                                    });
                                    navigate(`${routeMatcher.booking}?step=2`);
                                }}
                            />

                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default FlightCard
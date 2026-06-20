import { Badge, HoverCard, Rating, ThemeIcon } from "@mantine/core";
import { ArrowRight, Clock, HeartIcon, MapPin } from "lucide-react";
import { useState, type FC } from "react";
import Button from "../../../Utils/Components/Button/Button";

type FlightCard = {
    imagePath:string,
    city: string,
    country: string,
    price: number,
    rating: number,
    departureTime: string,
    description: string,
    isLiked: boolean,
    isPopular:boolean,
    ratingNumber: number,
    caracteristics: string[],
    hasBookingButton?: boolean
}

export const currency = '$';

const FlightCard:FC<FlightCard> = ({ imagePath, city, country, price, rating, ratingNumber, departureTime, description, isLiked, isPopular, caracteristics, hasBookingButton=true }) => {
    const [isLike, setIsLiked] = useState(isLiked);
  return (
    <div className="rounded-xl border-[0.5px] bg-white border-gray-300 shadow-lg gap-5 mb-7 pb-10 duration-200 ">
        <div className="w-full h-70 bg-gray-300 rounded-t-lg mb-4 relative overflow-hidden">
            <img src={imagePath} alt={`${city} image`} className="w-full h-full object-cover rounded-t-md hover:scale-110 duration-200"/>
            <Badge className="absolute bottom-3 left-5" size="lg" color="white" leftSection={<MapPin size={15} stroke="var(--sb-blue-250)" />}>
                <span className="text-gray-700 text-md">{country}</span>
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
                isPopular && <p className="rounded-full py-1 px-3 absolute top-4 left-4 bg-orange-500 text-sm font-semibold">Popular</p>
            }
        </div>
        <div className="px-5">
            <div className="flex items-center justify-between">
                <span className="text-xl font-semibold playfair-display">{city}</span>
                <div className="flex items-center gap-1 text-md">
                    <Rating defaultValue={1} readOnly count={1}/>
                    <span className="translate-y-0.5 font-semibold">{rating}</span>
                    <span className="translate-y-0.5 text-gray-600">({ratingNumber})</span>
                </div>
            </div>
            
            <HoverCard position="top">
                <HoverCard.Target>
                    <p className="my-5 text-gray-700 line-clamp-2 min-h-12">{description}</p>
                </HoverCard.Target>
                <HoverCard.Dropdown className="max-w-70" style={{background:'#dfdfdf'}}>
                    <p className="text-gray-700">{description}</p>
                </HoverCard.Dropdown>
            </HoverCard>

            <div className="flex gap-2">
                {
                    caracteristics.slice(0,3).map((carac, index)=> <Badge variant="default" size="lg" key={index}>{carac}</Badge>)
                }
            </div>
            <hr className="my-5 border-gray-300" />

            <div className="flex items-center justify-between mt-7">
                <div className="flex items-center gap-1 text-gray-700">
                    <Clock width={18} height={18} />
                    <span className="h-5">{departureTime.replace(':', 'h ')}min</span>
                </div>

                <div className="flex items-center gap-5">
                    <p className="text-right">From <br /> <span className="text-3xl font-bold text-(--sb-blue-250)">{currency}{price}</span></p>

                    {   hasBookingButton &&
                        <Button
                            textContent="Book"
                            className="bg-(--sb-blue-250) text-white px-3 py-2 rounded-md text-lg"
                            Icon={()=><ArrowRight className="scale-90" />}
                            Iposition="right"
                    />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default FlightCard
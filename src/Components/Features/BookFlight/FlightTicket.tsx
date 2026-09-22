import { ArrowRight, Clock, Plane, Users } from 'lucide-react'
import { formatNumber } from '../../../Utils/Functions/formatNumber';
import type { FC } from 'react';
import Button from '../../../Utils/Components/Button/Button';
import { Menu } from '@mantine/core';
import { useBookFlightStore } from './store';
import type { Flight } from '../../../types';
import { clsx } from 'clsx';

type FlightTicketType = {
    variant:'primary' | 'secondary',
    flight: Flight,
    onSelect: ()=> void
}

export const FlightTicket:FC<FlightTicketType> = ({flight, variant='primary', onSelect}) => {
    const {company, classTravel} = flight;
    
    if(variant === 'primary')
        return (
            <div className='card-reveal mx-auto w-full rounded-2xl '>        
                <div className='ticket-primary-bodyrespo flex max-w-full flex-col gap-6 rounded-2xl border-[0.5px] border-gray-300 bg-white px-4 py-6 sm:px-6 sm:py-8 lg:flex-row lg:items-center lg:justify-around lg:gap-5 lg:px-10 lg:py-10'> 
                    <div className='ticket-airline flex min-w-0 items-center gap-3'>
                        <div className='rounded-full p-3 bg-[#134cdd13]'><Plane stroke='var(--sb-blue-250)'/></div>
                        <div className=''>
                            <p className='font-bold text-lg'>{company}</p>
                            <ClassTravel classTravel={classTravel} size="md" />
                        </div>
                    </div>
                    <div className="sm:grid grid-cols-[70%_1fr] gap-[10%] lg:flex lg:justify-between lg:gap-30">
                        <FromToDetails {...flight} />

                        <PricePerSeat variant="primary" onSelect={onSelect} flight={flight} />  
                    </div>
                </div> 
            </div>
        )
    if(variant === 'secondary')
        return (
            <div className="card-reveal mx-auto w-full rounded-2xl border border-gray-200 bg-white px-4 py-6 shadow-lg sm:px-6 sm:py-8 lg:px-5 xl:px-5 ">
                <div className="ticket-secondary-body flex flex-col items-stretch gap-5 px-0 sm:flex-row sm:items-center sm:justify-between sm:px-2 w-full">
                    <FromToDetails {...flight}/> 
                    <PricePerSeat flight={flight} onSelect={onSelect} variant="secondary"/>
                </div>
                <hr className="border-gray-400 my-5 mx-auto" />

                <div className="flex items-center justify-between gap-3 pr-0 mx-5 text-sm sm:text-md">
                    <div className="flex items-center gap-3">
                        <div className='rounded-full p-3 bg-[#134cdd13]'><Plane stroke='var(--sb-blue-250)'/></div>
                        <p className='text-md text-gray-500'>{company}</p>
                    </div>
                    <ClassTravel classTravel={classTravel} size="lg" />
                </div>
            </div>
        )
  
}



export const FromToDetails:React.FC<Flight> = ({departureAt, fromCountry, duration, typeFlight, landingAt, toCountry})=>{
    return (
        <div className='ticket-route grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(80px,1.15fr)_minmax(0,1fr)] items-center gap-2 text-center sm:gap-3 w-full sm:max-w-[80%]'>
                <div className='ticket-route-leg min-w-0 overflow-hidden'>
                    <h2 className='font-bold text-2xl lg:text-xl xl:text-2xl'>{formatNumber(new Date(departureAt).getHours()) + ':' + formatNumber(new Date(departureAt).getMinutes()) }</h2>
                        <p className='break-words'><span className='flex flex-row justify-center font-bold'>{fromCountry.split(' ')[1]}</span> <span className='text-gray-400 text-[14px]'>{fromCountry.split(' ')[0]}</span></p>
                </div>
                
                <div className='ticket-route-middle min-w-0 text-center'>
                    <p className='flex items-center gap-1 w-max m-auto'>
                        <Clock width={17} className='text-gray-400'/>
                        <span className='text-[13px] text-gray-500'>{duration}</span>
                    </p> 
                    
                    <div className='flex items-center gap-2 w-full'>
                        <hr className='border-[0.5px] border-gray-300 w-full lg:w-15'/>
                        <div><Plane width={20} stroke='var(--sb-blue-250)'/></div>
                        <hr className='border-[0.5px] border-gray-300 w-full lg:w-15'/>
                    </div>
                     
                    <p className='text-[13px] text-gray-400'>{typeFlight}</p>
                </div>
                

                <div className='ticket-route-leg min-w-0 overflow-hidden'>
                    <h2 className='font-bold text-2xl lg:text-xl xl:text-2xl '>{formatNumber(new Date(landingAt).getHours()) + ':' + formatNumber(new Date(landingAt).getMinutes())}</h2>
                    <p className='break-words'><span className='flex flex-row justify-center font-bold'>{toCountry.split(' ')[1]}</span> <span className='text-gray-400 text-[14px]'>{toCountry.split(' ')[0]}</span></p>
                </div>
        </div>
    )
}

export const PricePerSeat:React.FC<FlightTicketType> = ({flight, onSelect, variant})=> {
    const {setFlightInfos} = useBookFlightStore();
    return (
    <div className={clsx('ticket-price min-w-0 border-t-[0.5px] border-t-gray-300 pt-5 text-left flex items-center justify-between px-5 sm:block sm:min-w-max sm:border-l-[0.5px] sm:border-t-0 sm:border-l-gray-300 sm:pl-5 sm:pt-0 sm:text-right md:pl-10 md:pr-0 lg:pl-5', variant === 'primary' ? 'mt-5' : 'sm:pr-0')}>
            <div className="w-max sm:ml-auto">
                <p className='text-[14px] text-gray-500'>Per person</p>
                <p className='text-3xl text-(--sb-blue-250) font-bold'>{`$${flight.price}`}</p>
                <div className='flex items-center gap-2 text-gray-500 text-[14px]'>
                    <Users width={15} />
                    <span>{flight.seatsLeft} seats left</span>
                </div>
            </div>
            <div className={clsx('sm:mt-5 sm:mr-auto')}>
                {
                    variant === 'secondary' &&
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
                                            setFlightInfos({travelFrom: flight.fromCountry, travelTo: flight.toCountry, departureDate: flight.departureAt, returnDate: flight.landingAt, travelClass: flight.classTravel, passengersCount: Number(value?.charAt(0)) ?? 1});
                                            onSelect();
                                        }                               
                                    }}  
                                /> */}
                                {
                                    Array(8).fill(0).map((_, index)=> <Menu.Item 
                                    key={index}
                                    onClick={(e)=>{
                                        if(e.currentTarget){
                                                setFlightInfos({travelFrom: flight.fromCountry, travelTo: flight.toCountry, departureDate: flight.departureAt, returnDate: flight.landingAt, travelClass: flight.classTravel,
                                                passengersCount: index + 1
                                            });
                                            onSelect();
                                        } 
                                    }}>{index+1} passenger(s)</Menu.Item>)
                                }
                            </form>
                        </Menu.Dropdown>
                     </Menu>
                }
                {
                    variant === 'primary' &&
                    <Button
                        textContent={variant === 'primary' ? 'Select' : 'Book'}
                        Icon={''}
                        Iposition="right"
                        onClick={()=>{
                            onSelect();
                        }}
                        className={'rounded-xl py-1 px-3 shadow-xs border-[0.5px] border-gray-300 flex justify-self-end'}
                    /> 
                }
                
            </div>
        </div>
    )
}

export const ClassTravel:React.FC<{classTravel: string, size:'md'|'lg'}> = ({classTravel, size}) => {
    return (
        <p className={`relative rounded-full border-[0.5px] border-gray-300 px-2 py-0.7 text-center ${size === 'md' ? 'scale-80' : ''}`}>{classTravel}</p>
    )
}


import { ArrowRight, Clock, Plane, Users } from 'lucide-react'
import type { FlightTicketProps } from './type';
import { formatNumber } from '../../../Utils/Functions/formatNumber';
import type { FC } from 'react';
import Button from '../../../Utils/Components/Button/Button';
import { Menu, Select } from '@mantine/core';
import { useBookFlightStore } from './store';

type FlightTicketType = {
    variant:'primary' | 'secondary',
    flight: FlightTicketProps,
    onSelect: ()=> void
}

export const FlightTicket:FC<FlightTicketType> = ({flight, variant='primary', onSelect}) => {
    const {company, classTravel} = flight;
    
    if(variant === 'primary')
        return (
            <div className='w-full max-w-full'>        
                <div className='rounded-2xl border-[0.5px] border-gray-300 shadow-xl px-10 py-10 flex bg-white justify-around gap-5 max-w-full'>
                    <div className='flex items-center gap-3 min-w-max'>
                        <div className='rounded-full p-3 bg-[#134cdd13]'><Plane stroke='var(--sb-blue-250)'/></div>
                        <div className=''>
                            <p className='font-bold text-lg'>{company}</p>
                            <ClassTravel classTravel={classTravel} size="md" />
                        </div>
                    </div>

                    <FromToDetails {...flight} />

                    <PricePerSeat variant="primary" onSelect={onSelect} flight={flight} />
                </div> 
            </div>
        )
    if(variant === 'secondary')
        return (
            <div className="w-full bg-white rounded-2xl border border-gray-200 py-10 px-10 shadow-lg">
                <div className="flex items-center justify-between px-2">
                    <FromToDetails {...flight}/> 
                    <PricePerSeat flight={flight} onSelect={onSelect} variant="secondary"/>
                </div>
                <hr className="border-gray-400 my-5 mx-auto" />

                <div className="flex justify-between items-center pr-3">
                    <div className="flex items-center gap-3">
                        <div className='rounded-full p-3 bg-[#134cdd13]'><Plane stroke='var(--sb-blue-250)'/></div>
                        <p className='text-lg text-gray-500'>{company}</p>
                    </div>
                    <ClassTravel classTravel={classTravel} size="lg" />
                </div>
            </div>
        )
  
}



export const FromToDetails:React.FC<FlightTicketProps> = ({departureAt, from, duration, typeFlight, landingAt, to})=>{
    return (
        <div className='flex gap-4 items-center text-center'>
                <div>
                    <h2 className='font-bold text-3xl'>{formatNumber(new Date(departureAt).getHours()) + ':' + formatNumber(new Date(departureAt).getMinutes()) }</h2>
                    <p><span className='font-bold flex flex-row justify-center'>{from.split(' ')[1]}</span> <span className='text-gray-400 text-[14px]'>{from.split(' ')[0]}</span></p>
                </div>
                
                <div className='text-center'>
                    <p className='flex items-center gap-1 w-max m-auto'>
                        <Clock width={17} className='text-gray-400'/>
                        <span className='text-[13px] text-gray-500'>{duration}</span>
                    </p> 
                    
                    <div className='flex items-center gap-2'>
                        <hr className='border-[0.5px] border-gray-300 w-15  '/>
                        <div><Plane width={20} stroke='var(--sb-blue-250)'/></div>
                        <hr className='border-[0.5px] border-gray-300 w-15'/>
                    </div>
                     
                    <p className='text-[13px] text-gray-400'>{typeFlight}</p>
                </div>
                

                <div>
                    <h2 className='font-bold text-3xl'>{formatNumber(new Date(landingAt).getHours()) + ':' + formatNumber(new Date(landingAt).getMinutes())}</h2>
                    <p><span className='font-bold flex flex-row justify-center'>{to.split(' ')[1]}</span> <span className='text-gray-400 text-[14px]'>{to.split(' ')[0]}</span></p>
                </div>
        </div>
    )
}

export const PricePerSeat:React.FC<FlightTicketType> = ({flight, onSelect, variant})=> {
    const {setFlightInfos, flightInfos} = useBookFlightStore();
    return (
        <div className=' text-right border-l-[0.5px] border-l-gray-300 pl-10 min-w-max'>
            <p className='text-[14px] text-gray-500'>Per person</p>
            <p className='text-3xl text-(--sb-blue-250) font-bold'>{`$${flight.price}`}</p>
            <div className='flex items-center gap-2 text-gray-500 text-[14px]'>
                <Users width={15} />
                <span>{flight.seatsLeft} seats left</span>
            </div>
            <div className='mt-5'>
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
                                    data={Array(8).fill(0).map((val, index)=> `${index+1} passenger(s)`)}
                                    value={`${flightInfos.passengersCount} passenger(s)`}
                                    onChange={(value)=>{
                                        if(value){
                                            setFlightInfos({...flightInfos, passengersCount: Number(value?.charAt(0)) ?? 1});
                                            onSelect();
                                        }                               
                                    }}  
                                /> */}
                                {
                                    Array(8).fill(0).map((val, index)=> <Menu.Item 
                                    key={index}
                                    onClick={(e)=>{
                                        if(e.currentTarget){
                                                setFlightInfos({travelFrom: flight.from, travelTo: flight.to, departureDate: flight.departureAt, returnDate: flight.landingAt, travelClass: flight.classTravel,
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
        <p className={'rounded-full px-2 py-0.7 border-[0.5px] border-gray-300 text-center relative' + (size === 'md' && ' scale-80')}>{classTravel}</p>
    )
}


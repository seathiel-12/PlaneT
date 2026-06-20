import { useState } from 'react'
import Tab from '../../../Utils/Components/Tabs/Tab'
import { ArrowLeftRight, Calendar, ChevronsUpDown, MapPin, Search, Users } from 'lucide-react';
import Button from '../../../Utils/Components/Button/Button';
import { useStepperContext } from '../../Pages/BookFlight';
import { useBookFlightStore } from './store';
import { Select } from '@mantine/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';

const cities = ['New York (JFK)', 'Paris (CDG)', 'Dubai', 'Tokyo', 'London', 'Sydney', 'Singapour', 'Los Angeles']


const BookFlightForm = () => {
    const typeFlight = ['Round Trip', 'One Way'];
    const [currentTypeFlight, setCurrentTypeFlight] = useState(typeFlight[0]);
    const { setActiveStep } = useStepperContext();
    const [oneWay, setOneWay] = useState(false);

    const {flightInfos, setFlightInfos} = useBookFlightStore();
    
    const switchDestinations = () => {
        if(!(flightInfos.travelFrom || flightInfos.travelTo))
            return

        const to = flightInfos.travelTo;
        const from = flightInfos.travelFrom;

        setFlightInfos({...flightInfos, travelTo: from, travelFrom: to});
        
    }
    
  return (
    <form className='rounded-2xl shadow-xl bg-white p-10 my-5 mt-10 ' >
        <div className='flex items-center justify-between'>
            <h1 className='playfair-display text-2xl font-bold'>Search Flight</h1>
            <div className='w-55'>
                <Tab options={typeFlight} current={currentTypeFlight} onclick={(e)=>{
                    setCurrentTypeFlight(e.currentTarget.id)
                    if(e.currentTarget.id !== currentTypeFlight)
                        if(e.currentTarget.id === typeFlight[1])
                            setOneWay(true)
                        else setOneWay(false)
                }} />
            </div>
        </div>
        
        <div className='grid grid-cols-2 my-7 gap-10'>
            {
                ['From', 'To'].map( label => 
                    <div className="relative" key={label}>
                        <Select
                            data={cities}
                            label={
                                <label htmlFor={label} className='flex items-center gap-2'>
                                    <MapPin width={17} stroke='var(--sb-blue-250)'/>
                                    <span style={{fontWeight:'normal'}}>{label}</span>
                                </label>
                            }
                            placeholder={`Select ${label === 'From' ? 'departure' : 'destination'} city`}
                            size="md"
                            rightSection={<ChevronsUpDown size={16} />}
                            clearable
                            clearSectionMode="clear"
                            value={label === 'From' ? (flightInfos.travelFrom) : (flightInfos.travelTo)}
                            onChange={(value)=> {
                                    if(label === 'From'){
                                        console.log('h')
                                        setFlightInfos({...flightInfos, travelFrom: value});
                                        return
                                    }
                                    setFlightInfos({...flightInfos, travelTo: value})
                            }}
                            required
                            withAsterisk={false}
                            className="w-max"
                        />
                        {label === 'To' && <button type="button" onClick={switchDestinations} className='rounded-full p-2 px-3 bg-white border-[0.5px] border-gray-300 shadow-xs absolute -bottom-5 -left-7 cursor-pointer hover:bg-gray-100 scale-80'><ArrowLeftRight width={17}/></button>}
                    </div>
                )
            }
        </div>

        <div className='grid grid-cols-2 my-7 gap-7'>
            {
                ['Departure', 'Return'].filter((elem)=> oneWay ? elem === 'Departure' : elem ).map( label => 
                    <LocalizationProvider key={label} dateAdapter={AdapterDayjs}>
                        <DemoItem label={
                            <label htmlFor={label} className='flex items-center gap-2'>
                                <Calendar width={17} stroke='var(--sb-blue-250)'/>
                                <span className="text-[1rem]">{label} date</span>
                            </label>
                        }>
                            <DesktopDatePicker
                                onChange={(value)=> {
                                    if(label === 'Departure'){
                                        setFlightInfos({...flightInfos, departureDate: value?.toString() ?? ''});
                                        return
                                    }
                                    setFlightInfos({...flightInfos, returnDate: value?.toString() ?? ''})
                                }}
                                className="date-picker-planet"/>
                        </DemoItem>
                    </LocalizationProvider>
                )
            }
        </div>
        

        <div className='grid grid-cols-2 gap-7 my-7'>
            <Select
                label={
                    <label htmlFor='passengers' className='flex items-center gap-2'>
                        <Users width={17} stroke='var(--sb-blue-250)'/>
                        <span style={{fontWeight:'normal'}}>Passenger</span>
                    </label>
                }
                onChange={(value)=>setFlightInfos({...flightInfos, passengersCount: Number(value?.charAt(0) ?? 1)})}
                data={Array(8).fill(0).map( (elem, index) => `${index + 1} Passenger (s)`)}
                defaultValue={'1 Passenger (s)'}
                size="md"
                className="w-max"
            />

            <Select
                label={
                    <label htmlFor='travelclass' className='mb-2 block'>
                        <span style={{fontWeight:'normal'}}>Travel Class</span>
                    </label>
                }
                onChange={(value)=>setFlightInfos({...flightInfos, travelClass: value ?? ''})}
                data={['Economy', 'Business', 'First Class']}
                size="md"
                className="w-max"
                defaultValue={'Economy'}
            />
        </div>

        <Button disabled={!(flightInfos.departureDate && flightInfos.travelFrom && flightInfos.travelTo)} onClick={()=>{
            setActiveStep(1);
        }} textContent='Search Flights' Icon={Search} className='w-full rounded-xl bg-(--sb-blue-250) py-2.5 mt-10 text-white' style={!(flightInfos.departureDate && flightInfos.travelFrom && flightInfos.travelTo) ? {opacity: '50%', scale: '100%'} : {}}/>
    </form>
  )
}

export default BookFlightForm
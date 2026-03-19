import { useState } from 'react'
import Tab from '../../../Utils/Components/Tabs/Tab'
import { ArrowLeftRight, Calendar, MapPin, Search, Users } from 'lucide-react';
import Button from '../../../Utils/Components/Button/Button';
import { useStepperContext } from '../../Pages/BookFlight';
import { useBookFlightStore } from './store';
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
        
        <div className='grid grid-cols-2 my-7 gap-7'>
            {['From', 'To'].map( label => <div key={label} className='relative'>
                <label htmlFor={label} className='flex items-center gap-2'>
                    <MapPin width={17} stroke='var(--sb-blue-250)'/>
                    <span>{label}</span>
                </label>
                <select onChange={(e)=> {
                    if(label === 'From'){
                        setFlightInfos({...flightInfos, travelFrom: e.currentTarget.value});
                        return
                    }
                    setFlightInfos({...flightInfos, travelTo: e.currentTarget.value})
                }} value={label === 'From' ? flightInfos.travelFrom : flightInfos.travelTo} required name={label} id={label} className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-60'>
                    <option value="" selected hidden >Select {label === 'From' ? 'departure' : 'destination'} city</option>

                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                {label === 'To' && <div onClick={switchDestinations} className='rounded-full p-2 px-3 bg-white border-[0.5px] border-gray-300 shadow-xs absolute -bottom-5 -left-7 cursor-pointer hover:bg-gray-100 scale-80'><ArrowLeftRight width={17}/></div>}
            </div>) }
        </div>

        <div className='grid grid-cols-2 my-7 gap-7'>
            {['Departure', 'Return'].filter((elem)=> oneWay ? elem === 'Departure' : elem ).map( label => <div key={label} className='w-full'>
                <label htmlFor={label} className='flex items-center gap-2'>
                    <Calendar width={17} stroke='var(--sb-blue-250)'/>
                    <span>{label} date</span>
                </label>
                <input value={label === 'Departure' ? flightInfos.departureDate : flightInfos.returnDate} onChange={(e)=> {
                    if(label === 'Departure'){
                        setFlightInfos({...flightInfos, departureDate: e.currentTarget.value});
                        return
                    }
                    setFlightInfos({...flightInfos, returnDate: e.currentTarget.value})
                }} name={label}  required type="date" id={label} className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-full'/>
            </div>) }
        </div>

        <div className='grid grid-cols-2 gap-7 my-7'>
            <div>
                <label htmlFor='passengers' className='flex items-center gap-2'>
                    <Users width={17} stroke='var(--sb-blue-250)'/>
                    <span>Passenger</span>
                </label>
                <select value={flightInfos.passengersCount} onChange={(e)=>setFlightInfos({...flightInfos, passengersCount: Number(e.currentTarget.value)})}  required name='passengers' id='passengers' className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-60'>
                    {Array(8).fill(0).map( (elem, index) => <option key={elem + index} value={index + 1}>{index + 1} Passenger (s)</option>)}
                </select>
            </div>

           <div>
                <label htmlFor='travelclass' className='flex items-center gap-2'>
                    <span >Travel Class</span>
                </label>
                <select value={flightInfos.travelClass} onChange={(e)=>setFlightInfos({...flightInfos, travelClass: e.currentTarget.value})} required name='travelclass' id='travelclass' className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-60'>
                    {['Economy', 'Business', 'First Class'].map((tclass, index) => <option key={tclass} value={tclass} selected={index === 0 ? true : false}>{tclass}</option>)}
                    </select>
            </div>
        </div>

        <Button disabled={!(flightInfos.departureDate && flightInfos.travelFrom && flightInfos.travelTo)} onClick={()=>{
            setActiveStep(1);
        }} textContent='Search Flights' Icon={Search} className='w-full rounded-xl bg-(--sb-blue-250) py-2.5 mt-10 text-white' style={!(flightInfos.departureDate && flightInfos.travelFrom && flightInfos.travelTo) ? {opacity: '50%', scale: '100%'} : {}}/>
    </form>
  )
}

export default BookFlightForm
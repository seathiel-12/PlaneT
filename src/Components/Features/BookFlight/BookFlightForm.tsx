import React, { useState } from 'react'
import Tab from '../../../Utils/Components/Tabs/Tab'
import { ArrowLeftRight, Calendar, MapPin, Search, Users } from 'lucide-react';
import Button from '../../../Utils/Components/Button/Button';

const cities = ['New York (JFK)', 'Paris (CDG)', 'Dubai', 'Tokyo', 'London', 'Sydney', 'Singapour', 'Los Angeles']

type BookFlightProps = {
    onsubmit: ()=> void,
}

const BookFlightForm: React.FC<BookFlightProps> = ({onsubmit}) => {
    const typeFlight = ['Round Trip', 'One Way'];
    const [currentTypeFlight, setCurrentTypeFlight] = useState(typeFlight[0]);


  return (
    <form className='rounded-2xl shadow-2xs bg-white p-10 my-5 mt-10 ' onSubmit={onsubmit}>
        <div className='flex items-center justify-between'>
            <h1 className='playfair-display text-2xl font-bold'>Search Flight</h1>
            <div className='w-55'>
                <Tab options={typeFlight} current={currentTypeFlight} onclick={(e)=>{
                    setCurrentTypeFlight(e.currentTarget.id)
                }} />
            </div>
        </div>
        
        <div className='grid grid-cols-2 my-7 gap-7'>
            {['From', 'To'].map( label => <div key={label} className='relative'>
                <label htmlFor={label} className='flex items-center gap-2'>
                    <MapPin width={17} stroke='var(--sb-blue-250)'/>
                    <span>{label}</span>
                </label>
                <select name={label} id={label} className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-60'>
                    <option value="" selected hidden >Select {label === 'From' ? 'departure' : 'destination'} city</option>

                    {cities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                {label === 'To' && <div className='rounded-full p-2 px-3 bg-white border-[0.5px] border-gray-300 shadow-xs absolute -bottom-5 -left-7 cursor-pointer hover:bg-gray-100 scale-80'><ArrowLeftRight width={17}/></div>}
            </div>) }
        </div>

        <div className='grid grid-cols-2 my-7 gap-7'>
            {['Departure', 'Return'].map( label => <div key={label} className='w-full'>
                <label htmlFor={label} className='flex items-center gap-2'>
                    <Calendar width={17} stroke='var(--sb-blue-250)'/>
                    <span>{label} date</span>
                </label>
                <input type="date" id={label} className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-full'/>
            </div>) }
        </div>

        <div className='grid grid-cols-2 gap-7 my-7'>
            <div>
                <label htmlFor='passengers' className='flex items-center gap-2'>
                    <Users width={17} stroke='var(--sb-blue-250)'/>
                    <span>Passenger</span>
                </label>
                <select name='passengers' id='passengers' className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-60'>
                    {Array(8).fill(0).map( (elem, index) => <option key={index} value={index}>{index + 1} Passengers</option>)}
                    </select>
            </div>

           <div>
                <label htmlFor='travelclass' className='flex items-center gap-2'>
                    <span >Travel Class</span>
                </label>
                <select name='travelclass' id='travelclass' className='rounded-xl border-[0.5px] border-gray-300 shadow-xs p-3 text-gray-400 mt-2 w-60'>
                    {['Economy', 'Business', 'First Class'].map((tclass, index) => <option key={tclass} value={tclass} selected={index === 1 ? true : false}>{tclass}</option>)}
                    </select>
            </div>
        </div>

        <Button textContent='Search Flights' Icon={Search} className='w-full rounded-xl bg-(--sb-blue-250) py-2.5 mt-10 text-white'/>
    </form>
  )
}

export default BookFlightForm
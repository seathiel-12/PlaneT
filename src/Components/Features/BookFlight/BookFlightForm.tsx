import { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import Tab from '../../../Utils/Components/Tabs/Tab'
import { ArrowLeftRight, Calendar, MapPin, Search, Users } from 'lucide-react';
import Button from '../../../Utils/Components/Button/Button';
import { useStepperContext } from '../../Pages/BookFlight';
import { useBookFlightStore } from './store';
import { NativeSelect, Select, TextInput } from '@mantine/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import type { Flight } from '../../../types';
import { apiFetch } from '../../../Utils/Functions/apiFetch';
import { useQuery } from '@tanstack/react-query';
import { useToasting } from '../../../Utils/Functions/useToasting';
import { BookFlightSchema } from './validation';
import { Controller, useForm } from 'react-hook-form';
import type { BookFlightProps } from './type';
import { zodResolver } from '@hookform/resolvers/zod';

export const cities = ['New York (JFK)', 'Paris (CDG)', 'Japan (JPY)', 'Dubai', 'Tokyo', 'London', 'Sydney', 'Singapour', 'Los Angeles']


const BookFlightForm:FC<{setResearchedFlights: Dispatch<SetStateAction<Flight[]>>, setIsLoading: Dispatch<SetStateAction<boolean>>}> = ({setResearchedFlights, setIsLoading}) => {
    const typeFlight = ['Round Trip', 'One Way'];
    const [currentTypeFlight, setCurrentTypeFlight] = useState(typeFlight[0]);
    const { setActiveStep } = useStepperContext();
    const [oneWay, setOneWay] = useState(false);
    const {flightInfos, setFlightInfos } = useBookFlightStore();
    const {control} = useForm<BookFlightProps>({
        resolver: zodResolver(BookFlightSchema),
        mode: 'onChange'
    });

    const switchDestinations = () => {
        if(!(flightInfos.travelFrom || flightInfos.travelTo))
            return

        const to = flightInfos.travelTo;
        const from = flightInfos.travelFrom;

        setFlightInfos({...flightInfos, travelTo: from, travelFrom: to});
    }
    const {notify} = useToasting();
    const getFilteredFlights = async ()=> {
        setIsLoading(true);

        const formatIsoDate = (value: string) => {
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return '';
            return date.toISOString().slice(0, 10);
        };

        const params = new URLSearchParams();
        if (flightInfos.travelFrom) params.set('fromCountry_like', flightInfos.travelFrom);
        if (flightInfos.travelTo) params.set('toCountry_like', flightInfos.travelTo);
        if (flightInfos.departureDate) params.set('departureAt_like', formatIsoDate(flightInfos.departureDate));
        if (flightInfos.travelClass) params.set('classTravel', flightInfos.travelClass);

        const query = `flights?${params.toString()}`;
        const r :Flight = {
            company: "Air France",
            classTravel: "Economy",
            fromCountry: "Paris, France",
            continent: "America",
            toCountry: "New York, USA",
            departureAt: "2026-08-20T08:00:00Z",
            landingAt: "2026-08-20T12:30:00Z",
            duration: "4h30",
            price: 450,
            typeFlight: "Direct",
            seatsLeft: 12,
            city: "New York",
            rating: 4.2,
            ratingCount: 128,
            description: "Vol direct confortable avec service à bord.",
            caracteristics: ["Wifi", "Repas inclus", "Divertissement"],
            isLiked: false,
            isPopular: true,
            imagePath: ["https://loremflickr.com/1280/720/new-york,usa"]
        }
        try{
            const res = await apiFetch<Flight[]>(query, {method: 'GET'});
            if(res.success){
                setResearchedFlights(Array.isArray(res.body) ?   
                [r] : []);
            }
        }catch(error){
            notify('Error fetching filtered flights.', 'error');
        }finally{
            setIsLoading(false)
        }
    }

    const {refetch} = useQuery({
        queryKey:['getfilteredflights'],
        queryFn: getFilteredFlights,
        enabled: false
    })

    const searchFlights = () => {
        const validation = BookFlightSchema.safeParse(flightInfos);
        if (!validation.success) {
            notify(validation.error.issues[0]?.message ?? 'Please complete the search form.', 'error');
            return;
        }

        setActiveStep(1);
        refetch();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchFlights();
    }

  return (
    <form onSubmit={handleSubmit} className='rounded-2xl shadow-xl bg-white p-5 sm:p-8 md:p-10 my-5 mt-8 sm:mt-10' >
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <h1 className='playfair-display text-2xl font-bold'>Search Flight</h1>
            <div className='w-full sm:w-55'>
                <Tab options={typeFlight} current={currentTypeFlight} onclick={(e)=>{
                    setCurrentTypeFlight(e.currentTarget.id)
                    if(e.currentTarget.id !== currentTypeFlight)
                        if(e.currentTarget.id === typeFlight[1])
                            setOneWay(true)
                        else setOneWay(false)
                }} />
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 my-7 gap-6 sm:gap-10'>
            {
                ['From', 'To'].map( label => 
                    <div className="relative" key={label}>
                        <Controller
                            control={control}
                            name={label === 'From' ? 'travelFrom' : 'travelTo'}
                            render={({field, fieldState:{error:error}})=>
                                <TextInput
                                    label={
                                        <label htmlFor={label} className='flex items-center gap-2'>
                                            <MapPin width={17} stroke='var(--sb-blue-250)'/>
                                            <span style={{fontWeight:'normal'}}>{label}</span>
                                        </label>
                                    }
                                    placeholder={`Select ${label === 'From' ? 'departure' : 'destination'} city`}
                                    size="md"
                                    value={label === 'From' ? (flightInfos.travelFrom ?? '') : (flightInfos.travelTo ?? '')}
                                    onChange={(e)=> {
                                        field.onChange(e);  
                                            if(label === 'From'){
                                                setFlightInfos({...flightInfos, travelFrom: e.currentTarget.value});
                                                return
                                            }
                                            setFlightInfos({...flightInfos, travelTo: e.currentTarget.value})
                                    }}
                                    required
                                    withAsterisk={false}
                                    className="w-full"
                                    error={error?.root?.message ?? error?.message}
                                    inputWrapperOrder={['label', 'input', 'error']}
                                />
                            }
                        />
                        {label === 'To' && <button type="button" onClick={switchDestinations} className='rounded-full p-2 px-3 bg-white border-[0.5px] border-gray-300 shadow-xs absolute -bottom-10 sm:right-2 sm:bottom-0 sm:-left-15 -right-2 max-w-max cursor-pointer hover:bg-gray-100 scale-80'><ArrowLeftRight width={17}/></button>}
                    </div>
                )
            }
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 my-7 gap-6 sm:gap-7'>
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
                                minDate={dayjs()}
                                value={label === 'Departure' ? (flightInfos.departureDate ? dayjs(flightInfos.departureDate) : undefined    ) : (flightInfos.returnDate ? dayjs(flightInfos.returnDate) : undefined)}
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
        

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 my-7'>
            <NativeSelect
                label={
                    <label htmlFor='passengers' className='flex items-center gap-2'>
                        <Users width={17} stroke='var(--sb-blue-250)'/>
                        <span style={{fontWeight:'normal'}}>Passenger</span>
                    </label>
                }
                onChange={(e)=>setFlightInfos({...flightInfos, passengersCount: Number(e.target.value?.charAt(0) ?? 1)})}
                data={Array.from({length:8}, (_, index) => `${index + 1} Passenger (s)`)}
                defaultValue={`${flightInfos.passengersCount} Passenger (s)`}
                size="md"
                className="w-max"
            />

            <Select
                label={
                    <label htmlFor='travelclass' className='mb-2 block'>
                        <span style={{fontWeight:'normal'}}>Travel Class</span>
                    </label>
                }
                onChange={(value)=>setFlightInfos({...flightInfos, travelClass: value ?? 'Economy'})}
                data={['Economy', 'Business', 'First Class']}
                size="md"
                className="w-max"
                defaultValue={'Economy'}
            />
        </div>

        <Button disabled={!(flightInfos.departureDate && flightInfos.travelFrom && flightInfos.travelTo)} onClick={searchFlights} textContent='Search Flights' Icon={Search} className='w-full rounded-xl bg-(--sb-blue-250) py-2.5 mt-10 text-white' style={!(flightInfos.departureDate && flightInfos.travelFrom && flightInfos.travelTo) ? {opacity: '50%', scale: '100%'} : {}}/>
    </form>
  )
}

export default BookFlightForm
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
    const {control, handleSubmit, formState:{isValid}} = useForm<BookFlightProps>({
        resolver: zodResolver(BookFlightSchema),
        mode: 'onChange',
        defaultValues:{
            ...flightInfos,
            passengersCount: 1
        },
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
        if (flightInfos.travelFrom) params.set('fromCountry:contains', flightInfos.travelFrom);
        if (flightInfos.travelTo) params.set('toCountry:contains', flightInfos.travelTo);
        if (flightInfos.departureDate) params.set('departureAt:contains', formatIsoDate(flightInfos.departureDate));
        if (flightInfos.travelClass) params.set('classTravel', flightInfos.travelClass);
        if(flightInfos.passengersCount) params.set('seatsLeft:gte', flightInfos.passengersCount.toString());

        const query = `flights?${params.toString()}`;

        try{
            const res = await apiFetch<Flight[]>(query, {method: 'GET'});
            if(res.success){
                setResearchedFlights(Array.isArray(res.body) ?   
                res.body : []);
                return res;
            }
        }catch(error){
            notify('Error fetching filtered flights.', 'error');
        }finally{
            setIsLoading(false)
        }
        return false;
    }

    const {refetch} = useQuery({
        queryKey:['getfilteredflights'],
        queryFn: getFilteredFlights,
        enabled: false
    })

    const searchFlights = (data:BookFlightProps) => {
        const validation = BookFlightSchema.safeParse(data);
        if (!validation.success) {
            notify(validation.error.issues[0]?.message ?? 'Please complete the search form.', 'error');
            return;
        }
        setActiveStep(1);
        refetch();
    };

    const onSubmit = (data:BookFlightProps) => {
        setFlightInfos(data);
        searchFlights(data);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit, (data)=>console.error(data))} className='rounded-2xl shadow-xl bg-white p-5 sm:p-8 md:p-10 my-5 mt-8 sm:mt-10' >
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <h1 className='playfair-display text-2xl font-bold'>Search Flight</h1>
            <div className='w-full sm:w-55'>
                <Tab options={typeFlight} current={currentTypeFlight} onclick={(e)=>{
                    setCurrentTypeFlight(e.currentTarget.id)
                    if(e.currentTarget.id !== currentTypeFlight)
                        if(e.currentTarget.id === typeFlight[1]){
                            setOneWay(true)
                            setFlightInfos({...flightInfos, returnDate: ''})
                        }
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
                                    onChange={(e)=>{
                                        field.onChange(e);
                                    }}
                                    required
                                    withAsterisk={false}
                                    className="w-full md:w-[85%]"
                                    error={error?.root?.message ?? error?.message}
                                    inputWrapperOrder={['label', 'input', 'error']}
                                />
                            }
                        />
                        {label === 'To' && <button type="button" onClick={switchDestinations} className='rounded-full p-2 px-3 bg-white border-[0.5px] border-gray-300 shadow-xs absolute -bottom-11 sm:right-2 sm:bottom-0 sm:-left-15 -right-2 max-w-max cursor-pointer hover:bg-gray-100 scale-80'><ArrowLeftRight width={17}/></button>}
                    </div>
                )
            }
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 my-7 gap-6 sm:gap-7'>
            {
                ['Departure', 'Return'].filter((elem)=> oneWay ? elem === 'Departure' : elem ).map( label => <Controller
                        key={label}
                        control={control}
                        name={label === 'Departure' ? 'departureDate' : 'returnDate'}
                        render={({field})=>
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                    <DemoItem label={
                                        <label htmlFor={label} className='flex items-center gap-2'>
                                            <Calendar width={17} stroke='var(--sb-blue-250)'/>
                                            <span className="text-[1rem]">{label} date</span>
                                        </label>
                                    }>
                                        <DesktopDatePicker
                                            minDate={dayjs()}
                                            onChange={(value)=> {
                                                field.onChange(value?.toString())
                                            }}
                                            className="date-picker-planet"/>
                                    </DemoItem>
                                </LocalizationProvider>
                        }
                    />

                )
            }
        </div>
        

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 my-7'>
            <Controller
                control={control}
                name="passengersCount"
                render={({field})=>
                    <NativeSelect
                        label={
                            <label htmlFor='passengers' className='flex items-center gap-2'>
                                <Users width={17} stroke='var(--sb-blue-250)'/>
                                <span style={{fontWeight:'normal'}}>Passenger</span>
                            </label>
                        }
                        onChange={(e)=>{
                            field.onChange(Number(e.currentTarget.value[0]));
                        }}
                        data={Array.from({length:8}, (_, index) => `${index + 1} Passenger (s)`)}
                        defaultValue={`${flightInfos.passengersCount} Passenger (s)`}
                        size="md"
                        className="w-max"
                    />
                }          
            />

            <Controller
                control={control}
                name="travelClass"
                render={({field})=>
                    <Select
                        label={
                            <label htmlFor='travelclass' className='mb-2 block'>
                                <span style={{fontWeight:'normal'}}>Travel Class</span>
                            </label>
                        }
                        onChange={field.onChange}
                        data={['Economy', 'Business', 'First Class']}
                        size="md"
                        className="w-max"
                        defaultValue={'Economy'}
                    />

                }
            />
        </div>

        <Button type="submit" disabled={!isValid} textContent='Search Flights' Icon={Search} className='w-full rounded-xl bg-(--sb-blue-250) py-2.5 mt-10 text-white' style={!isValid ? {opacity: '50%', scale: '100%'} : {}}/>
    </form>
  )
}

export default BookFlightForm
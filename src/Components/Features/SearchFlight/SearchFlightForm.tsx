import { Controller, useForm } from "react-hook-form"
import { Check, Search, X } from "lucide-react";
import SelectField from "../../../Utils/SelectField/SelectField";
import clsx from 'clsx';
import { MenuItem, Slider } from "@mui/material";
import { type Dispatch, type FC, type SetStateAction } from "react";
import Button from "../../../Utils/Components/Button/Button";
import { TextInput } from "@mantine/core";
import type { Continent, Flight } from "../../../types";
import { useBookFlightStore } from "../BookFlight/store";
import { apiFetch } from "../../../Utils/Functions/apiFetch";
import { useQuery } from "@tanstack/react-query";
import { useToasting } from "../../../Utils/Functions/useToasting";

export type SearchFlightProps= {
    destination: string,
    continent: Continent | 'All',
    sortBy: string,
    priceRange: number[],
}


const SearchFlightForm: FC<{
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    filter: SearchFlightProps,
    setFilter: Dispatch<SetStateAction<SearchFlightProps>>,
    initialFilter: SearchFlightProps
}> = ({ setIsLoading, setFilter, filter, initialFilter }) => {


    const handleChange = (_event: Event, newValue: number[]) => {
        setFilter({...filter, priceRange: [newValue[0]*50, newValue[1]*50]})
    };
    const {control, handleSubmit, reset} = useForm<SearchFlightProps>();
    const {lookingFlights, setLookingFlights}=useBookFlightStore();
    const {notify} = useToasting();

    const getFilteredFlights = async ()=>{
        const requestUrl = `flights?price_gt=${filter.priceRange[0]}&price_lt=${filter.priceRange[1]}${(filter.continent !== 'All') ? `&continent=${filter.continent}` :''}${filter.destination ? `&toCountry_like=${filter.destination}` : ''}`
        try {
            const res = await apiFetch<Flight[]>(requestUrl);
            if (res.success) {
                setLookingFlights(res.body ?? []);
            }else{
                notify('Could not load filtered flights.', 'error');
            }
            return res;
        } catch (error) {
            notify('Could not load filtered flights.', 'error');
        }finally{
            setIsLoading(false);
        }          
        return false;

    }

    const {refetch} = useQuery({
        queryKey:['searchFlights'],
        queryFn: ()=> getFilteredFlights(),
        enabled: false
    });

    const onSubmit = ()=> {
        if(!lookingFlights.length){
            setIsLoading(true);
            refetch();
        }
    }


  return (
    <form className="flex flex-col items-stretch gap-3 sm:gap-5 transition-all max-w-full duration-300 lg:flex-row lg:items-center" onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-1 md:grid-cols-[35%_1fr_25%] items-end gap-5 lg:gap-7 w-full m-auto transition-all duration-300"
        >
            <Controller
                name='destination'
                control={control}
                render={({field})=> <div className="w-full transition-all duration-300">
                    <TextInput label="Search Destinations" value={field.value || ''}
                     onChange={(e)=>{
                        setFilter({...filter, destination:e?.target.value ?? ''})
                        field.onChange(e);
                    }} 
                    placeholder="Search by name, country, or tags..." leftSection={<Search/>} type="search"
                    className="flex flex-col gap-1 transition-all duration-300"
                    size="md"
                    />
                </div> }
            />
            <div className="w-full flex flex-col sm:flex-row gap-5">
                <Controller
                    name="continent"
                    control={control}
                    render={() => (
                        <div className="w-full">
                            <SelectField activeChoice={filter.continent} title="Continent">
                                {
                                    ['All', 'Asia', 'Europe', 'America', 'Africa', 'Oceania'].map((choice, index) => (
                                        <MenuItem className={choice === filter.continent ? 'Mui-selected flex items-center justify-between w-full' : ''} key={index} onClick={() => {
                                            setFilter({...filter, continent: choice as Continent});
                                        }} disableRipple>
                                            <span className="flex-1">{choice}</span>
                                            {choice === filter.continent && <span className="ml-2 text-green-500 font-bold">✓</span>}
                                        </MenuItem>
                                    ))
                                }
                            </SelectField>                            
                        </div>

                    )}
                />

                {
                    lookingFlights.length > 0 &&
                    <Controller
                        name="sortBy"
                        control={control}
                        render={({field}) => (
                        <div className="w-full">
                            <SelectField activeChoice={filter.sortBy} title="Sort By">
                                {
                                    ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Name A-Z'].map((choice, index) => (
                                        <MenuItem className={choice === filter.sortBy ? 'Mui-selected flex items-center justify-between w-full' : ''} key={index} onClick={() => {
                                            field.onChange(choice.toLowerCase().replace(/ /g, '-'));
                                            setFilter({...filter, sortBy: choice});
                                        }} disableRipple>
                                            <span className="flex-1">{choice}</span>
                                            {choice === filter.sortBy && <span className="ml-2 text-green-500 font-bold">✓</span>}
                                        </MenuItem>
                                    ))
                                }
                            </SelectField>
                        </div>

                        )}
                    />
                }                
            </div>

            <Controller
                    name="priceRange"
                    control={control}
                    render={() => (
                        <div className={clsx('w-full max-w-full flex flex-col justify-between transition-transform duration-300')}>
                            <label htmlFor="" className="text-gray-700 font-bold mb-3">Price Range: ${filter.priceRange[0]} - ${filter.priceRange[1]}</label>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={filter.priceRange.map(v=> v/50)}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                disableSwap
                                aria-labelledby="range-slider"
                                getAriaValueText={(value)=> 
                                    `$${value*50}`
                                }
                                className="transition-transform duration-300"
                            />
                        </div>
                )}
            />
        </div>
        { 
            Object.entries(filter).some(([key, value]) => value !== initialFilter[key as keyof SearchFlightProps]) &&

            <div className="flex gap-2 self-end md:self-auto">
                <Button
                    Icon={Check}
                    className="rounded-full p-2 bg-gray-200 w-max h-max md:translate-y-4 slide-left"
                    textContent=""
                    onClick={()=>{}}
                    type="submit"
                />
            
                <Button
                    textContent=""
                    Icon={X}
                    className="rounded-full p-2 bg-gray-200 w-max h-max md:translate-y-4 slide-left"
                    onClick={()=>{
                        setFilter(initialFilter);
                        reset(initialFilter);
                        setLookingFlights([])
                    }}
                />
            </div>
        }
    </form>
  )
}

export default SearchFlightForm;
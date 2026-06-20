import { Controller, useForm } from "react-hook-form"
import TextField from "../../../Utils/Components/TextField/TextField";
import { Search, X } from "lucide-react";
import SelectField from "../../../Utils/SelectField/SelectField";
import clsx from 'clsx';
import { MenuItem, Slider } from "@mui/material";
import { useState } from "react";
import Button from "../../../Utils/Components/Button/Button";
import { TextInput } from "@mantine/core";

type SearchFlightProps= {
    destination: string,
    continent: string,
    sortBy: string,
    priceRange: number[],
}


const SearchFlightForm = () => {
    
    const initialFilter:SearchFlightProps = {
        destination: '',
        continent: 'All',
        sortBy: 'Most Popular',
        priceRange: [0,5000]
    }
    const [filter, setFilter] = useState(initialFilter);
    const handleChange = (_event: Event, newValue: number[]) => {
        setFilter({...filter, priceRange: newValue})
    };
    const {control, handleSubmit, reset} = useForm<SearchFlightProps>();
    
    const onSubmit = (data:SearchFlightProps)=> {
        console.log(data)
    }

  return (
    <form className="flex items-center gap-5 transition-transform max-w-full duration-300" onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-[35%_1fr_1fr_25%] items-end gap-7 w-full m-auto transition-all duration-300"
        >
            <Controller
                name='destination'
                control={control}
                render={({field})=> <div className="w-full transition-transform duration-300">
                    <TextInput label="Search Destinations" value={field.value || ''}
                     onChange={(e)=>{
                        setFilter({...filter, destination:e?.target.value ?? ''})
                        field.onChange(e);
                    }} 
                    placeholder="Search by name, country, or tags..." leftSection={<Search/>} type="search"
                    className="flex flex-col gap-1"
                    size="md"
                    />
                </div> }
            />
            <Controller
                name="continent"
                control={control}
                render={() => (
                    <SelectField activeChoice={filter.continent} title="Continent">
                        {
                            ['All','Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'].map((choice, index) => (
                                <MenuItem className={choice === filter.continent ? 'Mui-selected flex items-center justify-between w-full' : ''} key={index} onClick={() => {
                                    setFilter({...filter, continent: choice});
                                }} disableRipple>
                                    <span className="flex-1">{choice}</span>
                                    {choice === filter.continent && <span className="ml-2 text-green-500 font-bold">✓</span>}
                                </MenuItem>
                            ))
                        }
                    </SelectField>
                )}
            />

            <Controller
                name="sortBy"
                control={control}
                render={({field}) => (
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
                )}
            />
            <Controller
                    name="priceRange"
                    control={control}
                    render={() => (
                        <div className={clsx('w-full max-w-full flex flex-col justify-between transition-transform duration-300')}>
                            <label htmlFor="" className="text-gray-700 font-bold mb-3">Price Range: ${filter.priceRange[0] * 50} - ${initialFilter.priceRange[1] === filter.priceRange[1] ? filter.priceRange[1] : filter.priceRange[1] * 50}</label>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={filter.priceRange}
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
            <Button
                textContent=""
                Icon={X}
                className="rounded-full p-2 bg-gray-200 w-max h-max translate-y-4 slide-left"
                onClick={()=>{
                    setFilter(initialFilter);
                    reset(initialFilter);
                }}
            />
        }

    </form>
  )
}

export default SearchFlightForm
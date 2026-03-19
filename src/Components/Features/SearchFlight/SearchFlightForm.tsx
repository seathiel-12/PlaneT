import { Controller, useForm } from "react-hook-form"
import { z } from "zod/v4";
import TextField from "../../../Utils/Components/TextField/TextField";
import { Search } from "lucide-react";
import SelectField from "../../../Utils/SelectField/SelectField";
import clsx from 'clsx';

type SearchFlightProps= {
    destination: string,
    continent: string,
    sortBy: string,
    priceRange: {min: number, max:number}
}

const SearchFlightForm = () => {
    
    const {control, handleSubmit} = useForm<SearchFlightProps>();
    
    const onSubmit = (data:SearchFlightProps)=> {
        console.log(data)
    }

  return (
    <form className="flex items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Controller
            name='destination'
            control={control}
            render={({field})=> <div className="w-1/3"><TextField label="Search Destinations" value={field.value} onChange={field.onChange} placeholder="Search by name, country, or tags..." Icon={Search} type="search"/></div> }
        />
       <SelectField options={['All', 'Africa', 'Asia', 'Europe', 'America', 'Oceania']} placeholder="All" name="continent" label="Continent"/>
       <SelectField options={['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Name A-Z']} placeholder="Most Popular" name="sortBy" label='Sort By' />

       

    </form>
  )
}

export default SearchFlightForm
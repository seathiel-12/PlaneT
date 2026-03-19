import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

type SelectFieldProps = {
    name: string,
    options: string[],
    placeholder: string,
    label: string
}

const SelectField: React.FC<SelectFieldProps> = ({options, name, placeholder, label}) => {

    const [isVisible, setVisible] = useState(false);
    const [selected, setSelected] = useState(options[0]);
  return (
    <div className='max-w-62.5 relative w-50'>

        <select className='hidden' name={name.toLowerCase()} id={name.toLowerCase()} value={placeholder}></select>

        <p className='font-semibold text-gray-700 mb-3'>{label}</p>

        <div className='rounded-xl shadow-2xs border-[0.5px] border-gray-300 p-2 px-5 bg-white flex items-center justify-between' onClick={()=> setVisible(!isVisible)}>
            <span>{selected ? selected : placeholder}</span>
            <ChevronDown width={19} className='text-gray-500' />
        </div>
        { isVisible && <ul className='absolute rounded-xl shadow-2xs border-[0.5px] border-gray-300 my-2 bg-white p-1 w-full z-1'>
            { options.map((option, index) => 
            <li style={{backgroundColor: selected === option ? '#fa6515cd' : ''}} className={'py-2 px-4 hover:bg-gray-100 rounded-xl flex items-center justify-between'}  key={index} onClick={()=> setSelected(option)}>
               <span>{option}</span> 
               {selected === option && <span>✓</span>}
            </li>)}</ul> }
    </div>
    
  )
}

export default SelectField
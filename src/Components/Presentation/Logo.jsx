import { Plane } from 'lucide-react'
import React from 'react'

function Logo() {
  return (
    <div className='flex gap-2 items-center'>
       <div className='bg-(--sb-blue-300) rounded-full p-3'><Plane stroke='white'/></div>
        <p className='text-2xl font-bold playfair-display text-black'>Plane<span className='text-(--sb-blue-300)'>T</span></p>
    </div>
  )
}

export default Logo
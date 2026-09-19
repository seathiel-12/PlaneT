import { MoveRight, Plane, Sparkles } from 'lucide-react'
import React from 'react'
import { NavLink, redirect } from 'react-router';

function CallToAction() {
  return (
    <div className='bg-(--sb-blue-250) px-4 py-16 text-center sm:px-8 sm:py-20 lg:px-20 lg:py-25' >
        <div className='mx-auto flex w-max max-w-full items-center gap-2 rounded-full bg-(--sb-fluide-white) px-4 py-2 text-white'>
            <Sparkles/>
            <span>Start Your Today Journey</span>
        </div>

        <p className='playfair-display my-8 text-3xl text-white sm:my-10 sm:text-5xl'>Ready to Explore the Planet?</p>
        <p className='mx-auto my-4 w-full max-w-2xl text-base text-white opacity-70 sm:text-xl'>Join millions of travelers who have discovered the world with PlaneT. Book your next adventure today and experience travel made simple.</p>
        
        <div className='mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center'>
            <NavLink
                to={'/book-flight'}
             className='flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-(--sb-blue-200) hover:opacity-90'><Plane/> Book Your Flight</NavLink>
            <NavLink 
                to={'/destinations'}
                className='flex items-center justify-center gap-2 rounded-xl border border-(--sb-fluide-white) px-4 py-3 text-white hover:bg-[#e1e1e165]'>Explore destinations<MoveRight/></NavLink>
        </div>

        <ul className='mt-10 flex list-disc flex-col items-center gap-2 text-left text-base text-white opacity-60 sm:flex-row sm:justify-center sm:gap-8 sm:text-lg lg:gap-30'>
            <li>Trusted by 1M+ travelers</li>
            <li>Best price guarantee</li>
            <li>Free cancellation options</li>
        </ul>
    </div>
  )
}

export default CallToAction
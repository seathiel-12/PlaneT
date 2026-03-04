import { MoveRight, Plane, Sparkles } from 'lucide-react'
import React from 'react'

function CallToAction() {
  return (
    <div className='bg-(--sb-blue-250) py-25 px-20 text-center' >
        <div className='flex items-center gap-2 rounded-full px-4 py-2 text-white bg-(--sb-fluide-white) w-max m-auto'>
            <Sparkles/>
            <span>Start Your Today Journey</span>
        </div>

        <p className='text-5xl text-white my-10 playfair-display'>Ready to Explore the Planet?</p>
        <p className='text-white opacity-70 text-xl w-1/2 m-auto my-4'>Join millions of travelers who have discovered the world with PlaneT. Book your next adventure today and experience travel made simple.</p>
        
        <div className='flex items-center gap-3 justify-center mt-5'>
            <button className='flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-(--sb-blue-200)'><Plane/> Book Your Flight</button>
            <button className='flex items-center gap-2 text-white rounded-xl border border-(--sb-fluide-white) px-4 py-3'>Explore destinations<MoveRight/></button>
        </div>

        <ul className='list-disc text-left flex justify-center gap-30 mt-10 text-white text-lg opacity-60'>
            <li>Trusted by 1M+ travelers</li>
            <li>Best price guarantee</li>
            <li>Free cancellation options</li>
        </ul>
    </div>
  )
}

export default CallToAction
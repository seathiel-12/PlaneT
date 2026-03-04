import { CreditCard, MessageSquare } from 'lucide-react'
import React from 'react'
import Bubble from '../../Utils/Components/Bubble/Bubble'
import HorizontalLinearStepper from '../../Utils/Components/Stepper/Stepper'
import ColorSlider from '../../Utils/Components/Slider/Slider'

function BookFlight() {
  return (
    <div className='py-10'>
        <Bubble Icons={CreditCard} text='Secure Payment'/>

        <h1 className='playfair-display text-3xl text-center my-5'>Complete Your Booking</h1>
        <p className='text-center text-lg text-gray-400'>Review your booking and complete the payment</p>

        <div className='w-[70%] m-auto my-10'>
            <HorizontalLinearStepper/>
        </div>
        
    </div>
  )
}

export default BookFlight
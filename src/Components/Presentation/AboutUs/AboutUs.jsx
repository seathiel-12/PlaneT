import { Award, Clock, CreditCard, Globe, Headphones, Shield } from 'lucide-react'
import React from 'react'

function AboutUs() {

    const specs = [
        {
            Icon: Shield,
            title: 'Secure Booking',
            subtitle:'Your personal and payment information is protected with bank-level encryption.'
        },
         {
            Icon: Headphones,
            title: '24/7 Support',
            subtitle:'Our dedicated team is available around the clock to assist you with any questions.'
        },
                 {
            Icon: CreditCard,
            title: 'Flexible Payments',
            subtitle:'Choose from multiple payment options including cards, PayPal, and local methods.'
        },
         {
            Icon: Globe,
            title: 'Global Coverage',
            subtitle:'Access flights to over 200 destinations across all continents worldwide.'
        },
         {
            Icon: Clock,
            title: 'Best Price Guarantee',
            subtitle:"Find a lower price elsewhere? We'll match it and give you an extra discount."
        },
         {
            Icon: Award,
            title: 'Award-Winning Service',
            subtitle:'Recognized as a top travel platform by industry experts and happy customers.'
        }
    ]
  return (
    <div className='bg-gray-50 p-30'>
        <p className='font-bold text-gray-600 text-sm rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max m-auto'>Why Choose Us</p>
        <p className='playfair-display text-4xl text-center mt-4'>Travel with Confidence</p>
        <p className='w-1/3 m-auto text-center text-lg my-5 text-gray-400'>Millions of travelers trust PlaneT for their journeys. Here's why we're the preferred choice.</p>

        <div className='grid grid-cols-3 gap-10 mt-10'>
            {
                specs.map(({Icon, title, subtitle})=> <div key={title} className='cursor-pointer rounded-2xl py-10 px-8 shadow-xs bg-white hover:shadow-lg duration-500'>
                    <div className='bg-(--sb-icon) rounded-xl p-3 w-max'><Icon className='stroke-(--sb-blue-300)' /></div>
                    <h2 className='font-bold text-2xl my-4'>{title}</h2>
                    <p className='text-gray-500'>{subtitle}</p>
                </div>)
            }
        </div>
    </div>
  )
}

export default AboutUs
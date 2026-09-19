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
    <div className='bg-gray-50 px-4 py-16 sm:px-8 sm:py-20 lg:p-30 lg:px-10'>
        <p className='font-bold text-gray-600 text-sm rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max m-auto'>Why Choose Us</p>
        <p className='playfair-display mt-4 text-center text-3xl sm:text-4xl'>Travel with Confidence</p>
        <p className='mx-auto my-5 w-full max-w-2xl text-center text-base text-gray-400 sm:text-lg'>Millions of travelers trust PlaneT for their journeys. Here's why we're the preferred choice.</p>

        <div className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10'>
            {
                specs.map(({Icon, title, subtitle})=> <div key={title} className='cursor-pointer rounded-2xl py-10 px-8 shadow-xs bg-white hover:shadow-lg duration-500'>
                    <div className='bg-(--sb-icon) rounded-xl p-3 w-max'><Icon className='stroke-(--sb-blue-300)' /></div>
                    <h2 className='my-4 text-2xl font-bold'>{title}</h2>
                    <p className='text-gray-500'>{subtitle}</p>
                </div>)
            }
        </div>
    </div>
  )
}

export default AboutUs
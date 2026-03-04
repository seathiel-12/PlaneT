import React from 'react'
import ContactForm from './ContactForm'
import { Clock, Headphones, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import Button from '../../../Utils/Components/Button/Button'
import Bubble from '../../../Utils/Components/Bubble/Bubble'

function Contact() {
    const contactInfos = [
        {
            Icon: Mail,
            title: 'Email Us',
            value: 'hello@planet-travel.com',
            description: 'We reply within 24 hours'
        },
        {
            Icon: Phone,
            title: 'Call Us',
            value: '+33 1 23 45 67 89',
            description: 'Mon-Fri 9AM-8PM'
        },{
            Icon: MapPin,
            title: 'Visit Us',
            value: 'Benin, Cotonou',
            description: '251, Avenue des Amazones'
        },{
            Icon: Headphones,
            title: 'Live Support',
            value: '24/7 Available',
            description: 'Chat with our team'
        }
    ]

  return (
    <div className='bg-gray-50 py-20'>

        <div className='w-max m-auto text-center'>
            <Bubble Icons={MessageSquare} text={'Get in Touch'}/>
            
            <h1 className='font-bold playfair-display text-4xl my-4'>Contact Us</h1>

            <p className='text-xl text-gray-400 w-[95%]'>Have questions or need assistance? Our team is here to help you plan your perfect journey.</p>
        </div>

        <div className='my-10 grid grid-cols-4 gap-5 w-2/3 m-auto mt-20'>
            {
                contactInfos.map( ({Icon, title, description, value}) => <div className='rounded-2xl shadow-2xs border-[0.5px] border-gray-300 p-8 text-center bg-white'>
                    <div className='rounded-full p-3 bg-[#75aafa55] w-max m-auto'><Icon className='text-(--sb-blue-250)'/></div>
                    <p className='font-bold mt-5 text-lg'>{title}</p>
                    <p className='font-bold'>{value}</p>
                    <p className='text-gray-400'>{description}</p>
                </div>)
            }
        </div>

        <div className='grid grid-cols-2 m-auto gap-10 h-max mt-20 w-2/3'>
            <ContactForm/>
            <div className=''>
                <div className='rounded-2xl shadow-xs border-[0.5px] border-gray-300 w-full bg-white flex'>
                    <div className='text-center m-auto py-15 bg-gray-100 w-full my-3 font-bold text-gray-500'>Interactive map</div>
                </div>

                <div className='w-full my-5 rounded-2xl border-[0.5px] border-gray-300 py-10 px-7 bg-white shadow-xs'>
                    <div className='flex gap-3 items-center'>
                        <Clock width={19} className='text-(--sb-blue-250)'/>
                        <span className='font-bold'>Business Hours</span>
                    </div>
                    <p className='text-xl text-gray-400 text-center py-5'>You can book flight at any moment.</p>

                    <hr className='border-[0.1px] border-gray-300 my-3'/>

                    <p className='flex items-center justify-between'> 
                        <span className='font-medium text-gray-500'>Emergency support</span>
                        <span className='font-bold text-(--sb-blue-250)'>24/7 Available</span>
                    </p>
                </div>

                <div className='mt-5 rounded-2xl border-[0.5px] border-(--sb-blue-250) p-10 w-full bg-[#3b87e312]'>
                    <h2 className='my-3 font-bold'>Looking for Quick Answers?</h2>
                    <p className=' text-gray-500'>Check our frequently asked questions for instant help with common inquiries.</p>

                    <Button textContent='View FAQs' className='rounded-xl py-1 px-2 border-[0.5px] border-gray-300 shadow-xs bg-white my-3'/>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default Contact
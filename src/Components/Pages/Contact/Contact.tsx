import ContactForm from './ContactForm'
import { Clock, Headphones, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import Button from '../../../Utils/Components/Button/Button'
import Bubble from '../../../Utils/Components/Bubble/Bubble'
import { useRef } from 'react'
import { useGsapCardReveal, useGsapTextReveal } from '../../../Utils/Components/AnimationComponent/GsapReveal'

function Contact() {

    const pageRef = useRef<HTMLDivElement>(null);
    useGsapTextReveal({ containerRef: pageRef, start: 'top 90%' });
    useGsapCardReveal({ containerRef: pageRef, start: 'top 88%', stagger: 0.1 });
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
    <div ref={pageRef} className='bg-gray-50 px-4 sm:px-6 lg:px-0 py-12 sm:py-20'>

        <div className='w-full max-w-3xl m-auto text-center'>
            <Bubble Icons={MessageSquare} text={'Get in Touch'}/>
            
            <h1 data-reveal-text className='font-bold playfair-display text-3xl sm:text-4xl my-4'>Contact Us</h1>

            <p data-reveal-text className='text-lg sm:text-xl text-gray-400 mx-auto max-w-2xl'>Have questions or need assistance? Our team is here to help you plan your perfect journey.</p>
        </div>

        <div className='my-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full max-w-6xl m-auto mt-12 sm:mt-20'>
            {
                contactInfos.map( ({Icon, title, description, value}) => <div data-reveal-card key={title} className='rounded-2xl shadow-2xs border-[0.5px] border-gray-300 p-8 text-center bg-white'>
                    <div className='rounded-full p-3 bg-[#75aafa55] w-max m-auto'><Icon className='text-(--sb-blue-250)'/></div>
                    <p className='font-bold mt-5 text-lg'>{title}</p>
                    <p className='font-bold'>{value}</p>
                    <p className='text-gray-400'>{description}</p>
                </div>)
            }
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 m-auto gap-6 sm:gap-10 mt-12 sm:mt-20 w-full max-w-6xl'>
            <div data-reveal-card>
                <ContactForm />
            </div>
            <div className='max-h-full flex flex-col gap-7 rounded-lg'>
                <div data-reveal-card className='rounded-2xl shadow-xs border-[0.5px] border-gray-300 w-full bg-white flex h-full'>
                    <iframe className="rounded-lg w-full min-h-64" style={{border:0}} src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2309289.7551124715!2d37.38523765!3d55.5817222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sru!4v1785520486826!5m2!1sfr!2sru" width="600" height="250" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                </div>

                <div data-reveal-card className='w-full rounded-2xl border-[0.5px] border-gray-300 py-7 px-7 bg-white shadow-xs min-h-max'>
                    <div className='flex gap-3 items-center'>
                        <Clock width={19} className='text-(--sb-blue-250)'/>
                        <span className='font-bold'>Business Hours</span>
                    </div>
                    <p className='text-xl text-gray-400 text-center py-5'>You can book flight at any moment.</p>

                    <hr className='border-[0.1px] border-gray-300 my-3'/>

                    <p className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'> 
                        <span className='font-medium text-gray-500'>Emergency support</span>
                        <span className='font-bold text-(--sb-blue-250)'>24/7 Available</span>
                    </p>
                </div>

                <div data-reveal-card className='rounded-2xl border-[0.5px] border-(--sb-blue-250) p-10 py-6 w-full bg-[#3b87e312] min-h-max'>
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
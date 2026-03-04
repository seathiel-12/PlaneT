import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import Logo from '../Logo'
function Footer() {
  return (
    <footer className='border-t border-t-gray-200 px-30 pt-15 pb-10 bg-[rgba(255,255,255,0.26)] backdrop-blur-3xl text-gray-500'>
      <div className='grid grid-cols-[40%_20%_20%_20%] justify-around gap-5'>
        <ul className=''>
          <Logo/>
          <p className='w-[70%] py-8'>Your gateway to global travel. Discover extraordinary destinations, book seamless flights, and explore the planet with confidence.</p>
            <div className='flex flex-col gap-3'>
              <li className='flex gap-3 items-center'><Mail className='stroke-gray-600 stroke-1'/> <span>hello@planet-travel.com</span></li>
              <li className='flex gap-3 items-center'><Phone className='stroke-gray-600 stroke-1'/> <span>+7 (898) 432 96 54</span></li>
              <li className='flex gap-3 items-center'><MapPin className='stroke-gray-600 stroke-1'/> 125 Lenina, Tyumen State, Oural Oblast</  li>
            </div>
            
        </ul>

        <ul className='flex flex-col gap-5'>
          <h2 className='font-bold text-lg text-black'>Company</h2>
          <Link  className='hover:text-black w-max'>About Us</Link>
          <Link  className='hover:text-black w-max'>Contact</Link>
          <Link  className='hover:text-black w-max'>Careers</Link>
          <Link  className='hover:text-black w-max'>Press</Link>
        </ul>

        <ul className='flex flex-col gap-5'>
          <h2 className='font-bold text-lg text-black'>Travel</h2>
          <Link  className='hover:text-black w-max'>Destinations</Link>
          <Link  className='hover:text-black w-max'>Book a flight</Link>
          <Link  className='hover:text-black w-max'>Travel Guides</Link>
          <Link  className='hover:text-black w-max'>Flight Deals</Link>
        </ul>

        <ul className='flex flex-col gap-5'>
          <h2 className='font-bold text-lg text-black'>Support</h2>
          <Link  className='hover:text-black w-max'>Help Center</Link>
          <Link  className='hover:text-black w-max'>FAQs</Link>
          <Link  className='hover:text-black w-max'>Cancellation Policy</Link>
          <Link  className='hover:text-black w-max'>Travel Insurance</Link>
        </ul>

      </div>
        <hr className='border-gray-300 my-10' />

        <div className='flex justify-between'>
          <p>© 2026 PlaneT. All rights reserved.</p>
          <ul className='flex gap-7'>
            <Link className='hover:text-black w-max'>Privacy Policy</Link>
            <Link className='hover:text-black w-max'>Terms of Service</Link>
            <Link className='hover:text-black w-max'>Cookie Policy</Link>
          </ul>
        </div>
    </footer>
  )
}

export default Footer
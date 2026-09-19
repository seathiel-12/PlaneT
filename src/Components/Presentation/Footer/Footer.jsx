import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { Accordion } from '@mantine/core'
import Logo from '../Logo'


function Footer() {
  return (
    <footer className='border-t border-t-gray-200 bg-[rgba(255,255,255,0.26)] px-4 pb-10 pt-12 text-gray-500 backdrop-blur-3xl sm:px-8 sm:pt-15 lg:px-30'>
      <div className='grid grid-cols-1 justify-around gap-10 lg:grid-cols-[40%_1fr] lg:gap-5 lg:grid-row-2'>
        <ul className=''>
          <Logo/>
          <p className='w-full py-6 sm:w-[85%] sm:py-8 lg:w-[70%]'>Your gateway to global travel. Discover extraordinary destinations, book seamless flights, and explore the planet with confidence.</p>
            <div className='flex-col gap-3  lg:flex-row lg:justify-between'>
              <li className='flex gap-3 items-center'><Mail className='stroke-gray-600 stroke-1'/> <span>hello@planet-travel.com</span></li>
              <li className='flex gap-3 items-center'><Phone className='stroke-gray-600 stroke-1'/> <span>+7 (898) 432 96 54</span></li>
              <li className='flex gap-3 items-center'><MapPin className='stroke-gray-600 stroke-1'/> 125 Lenina, Tyumen State, Oural Oblast</  li>
            </div>
            
        </ul>

        <div className='lg:hidden mb-10 lg:mb-0'>
          <Accordion multiple  radius='md'>
            <Accordion.Item value='Company'>
              <Accordion.Control><span className='font-bold text-lg text-black playfair-display'>Company</span></Accordion.Control>
              <Accordion.Panel>
                <ul className='flex flex-col gap-5'>
                  <Link className='hover:text-black w-max text-sm'>About Us</Link>
                  <Link className='hover:text-black w-max text-sm'>Contact</Link>
                  <Link className='hover:text-black w-max text-sm'>Careers</Link>
                  <Link className='hover:text-black w-max text-sm'>Press</Link>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value='Travel'>
              <Accordion.Control><span className='font-bold text-lg text-black playfair-display'>Travel</span></Accordion.Control>
              <Accordion.Panel>
                <ul className='flex flex-col gap-5'>
                  <Link className='hover:text-black w-max text-sm'>Destinations</Link>
                  <Link className='hover:text-black w-max text-sm'>Booking</Link>
                  <Link className='hover:text-black w-max text-sm'>Guides</Link>
                  <Link className='hover:text-black w-max text-sm'>Deals</Link>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value='Support'>
              <Accordion.Control><span className='font-bold text-lg text-black playfair-display'>Support</span></Accordion.Control>
              <Accordion.Panel>
                <ul className='flex flex-col gap-5'>
                  <Link className='hover:text-black w-max text-sm'>Help</Link>
                  <Link className='hover:text-black w-max text-sm'>FAQs</Link>
                  <Link className='hover:text-black w-max text-sm'>Cancellation Policy</Link>
                  <Link className='hover:text-black w-max text-sm'>Insurance</Link>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className='hidden justify-between gap-5 lg:grid lg:grid-cols-3'>
          <div>
            <h2 className='font-bold text-lg text-black mb-2 playfair-display'>Company</h2>
            <ul className='flex flex-col gap-5'>
              <Link className='hover:text-black w-max text-sm'>About Us</Link>
              <Link className='hover:text-black w-max text-sm'>Contact</Link>
              <Link className='hover:text-black w-max text-sm'>Careers</Link>
              <Link className='hover:text-black w-max text-sm'>Press</Link>
            </ul>
          </div>
          <div>
            <h2 className='font-bold text-lg text-black mb-2 playfair-display'>Travel</h2>
            <ul className='flex flex-col gap-5'>
              <Link className='hover:text-black w-max text-sm'>Destinations</Link>
              <Link className='hover:text-black w-max text-sm'>Booking</Link>
              <Link className='hover:text-black w-max text-sm'>Guides</Link>
              <Link className='hover:text-black w-max text-sm'>Deals</Link>
            </ul>
          </div>
          <div>
            <h2 className='font-bold text-lg text-black mb-2 playfair-display'>Support</h2>
            <ul className='flex flex-col gap-5'>
              <Link className='hover:text-black w-max text-sm'>Help</Link>
              <Link className='hover:text-black w-max text-sm'>FAQs</Link>
              <Link className='hover:text-black w-max text-sm'>Cancellation Policy</Link>
              <Link className='hover:text-black w-max text-sm'>Insurance</Link>
            </ul>
          </div>
        </div>
      </div>

        <hr className='hidden lg:block border-gray-300 my-10' />

        <div className='flex flex-wrap flex-col gap-4 sm:flex-row sm:justify-between'>
          <p>© 2026 PlaneT. All rights reserved.</p>
          <ul className='flex gap-4 sm:gap-7'>
            <Link className='hover:text-black w-max'>Privacy Policy</Link>
            <Link className='hover:text-black w-max'>Terms of Service</Link>
            <Link className='hover:text-black w-max'>Cookie Policy</Link>
          </ul>
        </div>
    </footer>
  )
}

export default Footer

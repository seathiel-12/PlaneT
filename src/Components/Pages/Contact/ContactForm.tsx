import React from 'react'
import TextField from '../../../Utils/Components/TextField/TextField'
import Button from '../../../Utils/Components/Button/Button'
import { Send } from 'lucide-react'

function ContactForm() {
  return (
    <form action="" className='rounded-2xl p-10 bg-white m-auto shadow-2xs border-[0.5px] border-gray-300 my-0'>
       <h2 className='text-2xl playfair-display'>Send us a Message</h2>

       <div className='flex gap-6'>
            <TextField label='First Name *' placeholder='John'/>
            <TextField label='Last Name *' placeholder='Doe'/>
       </div>

       <TextField label='Email *' placeholder='johnDoe@example.com'/>

       <TextField label='Phone Number' placeholder='+1 254 366 8854 ' />

        <div className='my-3'>
            <label htmlFor="subject" className='font-bold'>Subject *</label>
            <select name="subject" id="subject" className='block rounded-xl bg-gray-50 shadow-xs py-2 px-3 my-2 border-[0.5px] border-gray-300'>
                    <option value="" selected hidden>Select a topic</option>
                    {
                        ['Booking inquiry', 'Customer Support', 'Refund request', 'Feedback', 'Partnership', 'Other'].map( subject => <div>
                            <option value={subject}>{subject}</option>
                        </div>)
                    }
            </select>
        </div>

        <div className='mt-5'>
            <label htmlFor="message" className='font-bold'>Message *</label>
            <textarea name="message" id="message" placeholder='How can we help you?' className=' min-h-20 border-[0.5px] border-gray-300 shadow-xs block w-full my-2 p-2 rounded-2xl'></textarea>
        </div>
        
        <Button textContent='Send message' Icon={Send} className='bg-(--sb-blue-250) rounded-2xl w-full my-2 py-2 mt-10 text-white'/>
       
    </form>
  )
}

export default ContactForm
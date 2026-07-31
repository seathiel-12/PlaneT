import TextField from '../../../Utils/Components/TextField/TextField'
import Button from '../../../Utils/Components/Button/Button'
import { Send } from 'lucide-react'
import { NativeSelect, Textarea, TextInput } from '@mantine/core';

function ContactForm() {
  return (
    <form action="" className='rounded-2xl p-10 bg-white w-full m-auto shadow-2xs border-[0.5px] border-gray-300 my-0'>
       <h2 className='text-2xl playfair-display'>Send us a Message</h2>

       <div className='flex gap-6 my-5'>
            <TextInput withAsterisk label='First Name' placeholder='John' className="w-full" size="md" />
            <TextInput withAsterisk label='Last Name' placeholder='Doe' className="w-full" size="md" />
       </div>

        <TextInput
            label="Email"
            withAsterisk
            placeholder="johnDoe@example.com"
            className="my-5"
            size="md"
       />

       <TextInput
            label="Phone Number"
            placeholder="+1 254 366 8854"
            className="my-5"
            size="md"
       />

        <NativeSelect
            label="Subject"
            size="md"
            withAsterisk
            data={['Booking inquiry', 'Customer Support', 'Refund request', 'Feedback', 'Partnership', 'Other']}
            className="my-5"
        />

        <Textarea
            label='Message'
            withAsterisk
            placeholder="How can we help you?"
            name="message"
            id="message"
            size="md"
            className="my-5 h-30"
        />
        <Button textContent='Send message' Icon={Send} className='bg-(--sb-blue-250) rounded-lg w-full my-2 py-3 mt-10 text-white'/>
       
    </form>
  )
}

export default ContactForm
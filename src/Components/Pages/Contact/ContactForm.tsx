import Button from '../../../Utils/Components/Button/Button'
import { CircleCheck, Send } from 'lucide-react'
import { NativeSelect, Textarea, TextInput } from '@mantine/core';
import { ContactFormSchema, type ContactFormType } from '../../Features/BookFlight/validation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

function ContactForm() {
    const {handleSubmit, control, formState:{isValid}, reset} = useForm<ContactFormType>({
        resolver: zodResolver(ContactFormSchema),
        mode: 'onChange',
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const onSubmit = () => {
        // Handle form submission
        setIsSubmitted(true);
        reset();
    };

  return (
    <form onSubmit={handleSubmit(onSubmit, (err)=> console.error(err))} className='rounded-2xl p-5 sm:p-8 lg:p-10 bg-white w-full m-auto shadow-2xs border-[0.5px] border-gray-300 my-0 h-full'>
      <div className='h-full flex flex-col justify-center'>
        {
          isSubmitted ? 
          <div className='flex flex-col items-center justify-center gap-3 text-center py-10'>
              <CircleCheck className='text-(--sb-blue-250) m-auto' size={50}/>
              <h2 className='text-2xl playfair-display my-4'>Thank you for reaching out!</h2>
              <p className='text-gray-400'>We have received your message and will get back to you as soon as possible.</p>
              <button type='button' onClick={()=>{setIsSubmitted(false)}} className='bg-(--sb-blue-250) text-white rounded-lg py-2 px-5 mt-5 hover:scale-95 duration-200'>Send another message</button>
          </div>
          :
          <div>
              <h2 className='text-2xl playfair-display'>Send us a Message</h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 my-5'>
                <Controller
                    name='firstname'
                    control={control}
                    render={({ field, fieldState:{error} }) => (
                        <TextInput withAsterisk label='First Name' placeholder='John' className="w-full" size="md" {...field} error={error?.message} />
                    )}
                />
                <Controller
                    name='lastname'
                    control={control}
                    render={({ field, fieldState:{error} }) => (
                        <TextInput withAsterisk label='Last Name' placeholder='Doe' className="w-full" size="md" {...field} error={error?.message} />
                    )}
                />
              </div>
                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState:{error} }) => (
                    <TextInput
                      label="Email"
                      withAsterisk
                      placeholder="johnDoe@example.com"
                      {...field}          
                      className="my-5"
                      size="md"
                      error={error?.message}
                    />
                  )}
                />

              <Controller
                  name='phoneNumber'
                  control={control}
                  render={({ field, fieldState:{error} }) => (
                    <TextInput
                      label="Phone Number"
                      placeholder="+1 254 366 8854"
                      className="my-5"
                      size="md"
                      {...field}
                      error={error?.message}
                    />
                  )}
              />

              <Controller
                name='subject'
                control={control}
                render={({ field, fieldState:{error} }) => (
                    <NativeSelect
                        label="Subject"
                        size="md"
                        withAsterisk
                        data={['Booking inquiry', 'Customer Support', 'Refund request', 'Feedback', 'Partnership', 'Other']}
                        className="my-5"
                        defaultValue="Booking inquiry"
                        unselectable={"on"}
                        {...field}
                        error={error?.message}
                    />
                )}
              />

              <Controller
                name='message'
                control={control}
                render={({ field, fieldState:{error} }) => (
                    <Textarea
                        label='Message'
                        withAsterisk
                        placeholder="How can we help you?"
                        id="message"
                        size="md"
                        className="my-5 h-30"
                        {...field}
                        error={error?.message}
                    />
                )}
              />
              <Button type="submit" disabled={!isValid} textContent='Send message' Icon={Send} className='bg-(--sb-blue-250) rounded-lg w-full my-2 py-3 mt-10 text-white'/>
            </div>
        }
      </div>
    </form>
  )
}

export default ContactForm
import { CreditCard } from 'lucide-react'
import Bubble from '../../Utils/Components/Bubble/Bubble'
import LinearStepper, { type step } from '../../Utils/Components/Stepper/Stepper'
import BookFlightForm from '../Features/BookFlight/BookFlightForm'
import FlightTicket, { type FlightTicketProps } from '../Features/BookFlight/FlightTicket'

function BookFlight() {
    const ticketMockProps: FlightTicketProps = {
        company: 'Air France',
        classTravel: 'Business',
        departureAt: new Date().toUTCString(),
        landingAt: new Date(Date.now()).toUTCString(),
        duration: '7h 30min',
        from: 'Paris CDG',
        to: 'Japan JPY',
        price: '$869',
        typeFlight:'Direct',
        seatsLeft: '32'
    }
    const steps: step[] = [
        { 
            label: 'Search',
            render: ()=> <div>
                <BookFlightForm/>
            </div>,
            onNext: ()=>{},
            onBack: ()=>{}
        },
        { 
            label: 'Select Flight',
            render: ()=> <div></div>,
            onNext: ()=>{},
            onBack: ()=>{}
        },
        { 
            label: 'Passengers',
            render: ()=> <div></div>,
            onNext: ()=>{},
            onBack: ()=>{}
        },
        { 
            label: 'Payment',
            render: ()=> <div></div>,
            onNext: ()=>{},
            onBack: ()=>{}
        }
    ]
  return (
    <div className='py-10'>
        <Bubble Icons={CreditCard} text='Secure Payment'/>

        <h1 className='playfair-display text-3xl text-center my-5'>Complete Your Booking</h1>
        <p className='text-center text-lg text-gray-400'>Review your booking and complete the payment</p>

        <div className='w-[60%] m-auto my-10'>
            <LinearStepper steps={steps} />
            <BookFlightForm onsubmit={()=>{}}/>
            <FlightTicket {... ticketMockProps} />
        </div>
        
    </div>
  )
}

export default BookFlight
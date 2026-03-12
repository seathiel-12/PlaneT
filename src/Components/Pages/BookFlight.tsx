import { CreditCard, Plane } from 'lucide-react'
import Bubble from '../../Utils/Components/Bubble/Bubble'
import LinearStepper, { type step } from '../../Utils/Components/Stepper/Stepper'
import BookFlightForm from '../Features/BookFlight/BookFlightForm'
import FlightTicket from '../Features/BookFlight/FlightTicket'
import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { PassengerSetting } from '../Features/BookFlight/Passengers/PassengerInfosForm'
import PassengersForm from '../Features/BookFlight/Passengers/PassengersForm'
import Button from '../../Utils/Components/Button/Button'
import type { FlightTicketProps } from '../Features/BookFlight/type'
import PayementForm from '../Features/BookFlight/PaymentForm'


export const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export type StepperContextProps = {
    activeStep: number,
    setActiveStep: Dispatch<SetStateAction<number>>,
    levelSlider: number,
    setLevelSlider: Dispatch<SetStateAction<number>>
}

export const useStepperContext = () => {
      const context = useContext(StepperContext);
      if(context === undefined)
        throw 'Context missing for stepper!';
      
      return context;
}

function BookFlight() {
    const [activeStep, setActiveStep] = useState(0);
    const [levelSlider, setLevelSlider] = useState(0);
    const [proceedToPayment, setProceedToPayment] = useState(false)

    const ticketMockProps: FlightTicketProps[] = [{
        company: 'Air France',
        classTravel: 'Business',
        departureAt: new Date().toUTCString(),
        landingAt: new Date(Date.now()).toUTCString(),
        duration: '7h 30min',
        from: 'Paris CDG',
        to: 'Japan JPY',
        price: 869,
        typeFlight:'Direct',
        seatsLeft: '32'
    }]

    const steps: step[] = [
        { 
            label: 'Search',
            render: ()=> <div>
                <BookFlightForm/>
              <div className='rounded-2xl border border-dashed border-gray-300 my-10 p-20 text-center'>
                    <div className='w-max m-auto'>
                        <Plane className='scale-250 text-gray-400 stroke-2 w-max m-auto my-5 relative -top-3'/>
                        <h2 className='font-semibold text-xl my-3'>Search for Flights</h2>
                        <p className='text-gray-500 text-[18px]'>Enter your travel details above to see available flights.</p>
                    </div>
              </div>
            </div>,
            onNext: ()=>{},
            onBack: ()=>{}
        },
        { 
            label: 'Select Flight',
            render: ()=> <div>
                <BookFlightForm/>
                <div className='flex items-center flex-between w-full my-3'>
                    <p className='font-semibold w-full text-xl' >{ 5 } flights found</p>
                    <Bubble text='Best prices guaranteed'/>
                </div>
                <div>
                    {ticketMockProps.map((ticket, index)=> <div key={index}><FlightTicket {...ticket}/></div>)}
                </div>
            </div>,
            onNext: ()=>{},
            onBack: ()=>{}
        },
        { 
            label: 'Passengers',
            render: ()=> <div>
                <PassengersForm/>
                <div>
                    <PassengerSetting/>
                </div>
            </div>,
            onNext: ()=>{},
            onBack: ()=>{}
        },
        { 
            label: 'Payment',
            render: ()=> {
                return !proceedToPayment ? (<div className='rounded-2xl m-auto w-max text-center bg-white p-15 shadow-xs border-[0.5px] border-gray-200 my-10'>
                    <div className='rounded-full p-3 bg-(--sb-blue-fade-4) w-max m-auto my-4 scale-130 relative bottom-2'><CreditCard stroke='var(--sb-blue-250)' /></div>
                    <h1 className='playfair-display text-3xl'>Ready for Payment</h1>
                    <p className='text-gray-400 text-lg my-3'>Your booking details have been saved. Proceed to payment to complete your reservation.</p>

                    <Button onClick={()=>setProceedToPayment(true)} textContent='Proceed to payment' Icon={CreditCard} className='text-white bg-(--sb-blue-250) text-lg px-6 py-3 w-max m-auto my-4 mt-6' />
                </div>) : <PayementForm/>
            },
            onNext: ()=>{},
            onBack: ()=>{}
        }
    ];

    useEffect(()=> {
        if(activeStep < 3)
            setProceedToPayment(false);
    }, [activeStep])
    
  return (
    <div className='py-10 bg-gray-50'>
        <Bubble Icons={CreditCard} text='Secure Payment'/>

        <h1 className='playfair-display text-3xl text-center my-5'>Complete Your Booking</h1>
        <p className='text-center text-lg text-gray-400'>Review your booking and complete the payment</p>

        <div className='w-[60%] m-auto my-10'>
            <StepperContext.Provider value={{activeStep, setActiveStep, levelSlider, setLevelSlider}}>
                <LinearStepper steps={steps} />
            </StepperContext.Provider>
        </div>
        
    </div>
  )
}

export default BookFlight
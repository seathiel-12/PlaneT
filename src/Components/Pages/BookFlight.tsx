import { CreditCard, Plane } from 'lucide-react'
import Bubble from '../../Utils/Components/Bubble/Bubble'
import LinearStepper, { type step } from '../../Utils/Components/Stepper/Stepper'
import BookFlightForm from '../Features/BookFlight/BookFlightForm'
import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import PassengersForm from '../Features/BookFlight/Passengers/PassengersForm'
import Button from '../../Utils/Components/Button/Button'
import PayementForm from '../Features/BookFlight/PaymentForm'
import { FlightTicket } from '../Features/BookFlight/FlightTicket';
import { useBookFlightStore } from '../Features/BookFlight/store';
import type { Flight } from '../../types';
import { BookFlightSchema, PassengerFormSchema } from '../Features/BookFlight/validation';
import { useSearchParams } from 'react-router-dom';


export const StepperContext = createContext<StepperContextProps | undefined>(undefined);

export type StepperContextProps = {
    activeStep: number,
    setActiveStep: (value: number | ((previous: number) => number)) => void,
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
    const [searchParams] = useSearchParams();
    const [activeStep, setActiveStep] = useState(() => {
        const stepParam = Number(searchParams.get('step'));
        return Number.isInteger(stepParam) && stepParam >= 0 && stepParam < 4 ? stepParam : 0;
    });
    const [levelSlider, setLevelSlider] = useState(0);
    const [proceedToPayment, setProceedToPayment] = useState(false)
    const {setFlightSelectedInfos, flightSelected} = useBookFlightStore();
    const {flightInfos, passengersInfos, passengersSetting} = useBookFlightStore();
    const [researchedFlights, setResearchFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const steps: step[] = [
        { 
            label: 'Search',
            render: ()=> <div className='page-reveal'>
                <BookFlightForm setIsLoading={setIsLoading} setResearchedFlights={setResearchFlights}/>
                            <div className='card-reveal rounded-2xl border border-dashed border-gray-300 my-10 p-6 sm:p-10 md:p-20 text-center'>
                            <div className='w-full m-auto'>
                        <Plane className='scale-250 text-gray-400 stroke-2 w-max m-auto my-5 relative -top-3'/>
                                <h2 className='font-semibold text-lg sm:text-xl my-3'>Search for Flights</h2>
                                <p className='text-gray-500 text-base sm:text-[18px]'>Enter your travel details above to see available flights.</p>
                    </div>
              </div>
            </div>
            },
        { 
            label: 'Select Flight',
            render: ()=> <div className='page-reveal'>
                <BookFlightForm setIsLoading={setIsLoading} setResearchedFlights={setResearchFlights}/>
                <div>
                    {
                        isLoading ? 
                        <div className="animate-pulse mt-10">
                            <div className="flex items-center justify-between">
                                <p className="bg-gray-300 w-30 h-8 rounded-lg" />
                                <p className="rounded-full bg-gray-300 w-25 h-5" />
                            </div>

                            <div className="bg-gray-300 mt-5 rounded-2xl w-full h-70" />
                        </div>
                        :
                        <div>
                                    <div className='flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between w-full my-5 mt-10'>
                                <p className='font-semibold w-full text-xl'>{ researchedFlights?.length } flights found</p>
                                <Bubble text='Best prices guaranteed'/>
                            </div>
                            <div>
                                {
                                    Boolean(researchedFlights?.length) ? 
                                    <div>
                                        {
                                            researchedFlights?.map((ticket, index)=> 
                                            <div className='card-reveal' style={{ animationDelay: `${index * 90}ms` }}
                                                key={index}>
                                                    <FlightTicket 
                                                        flight={ticket} variant='primary' 
                                                        onSelect={()=>{
                                                            setActiveStep(2);
                                                            setFlightSelectedInfos(ticket);
                                                        }}
                                                    />
                                            </div>)
                                        }
                                    </div> 
                                    : 
                                    <div className="card-reveal bg-white rounded-2xl shadow-lg px-4 py-10 mt-10">
                                        <img src="/assets/Images/no_results.jpg" alt="no-results" className="w-40 block m-auto" />
                                        <p className="text-2xl text-gray-500 text-center mt-5">No flights founds</p>
                                    </div>
                                }
                            </div>                    
                        </div>
                    }
                </div>
            </div>
        },
        { 
            label: 'Passengers',
            render: ()=> <div className='page-reveal'>
                <PassengersForm/>
            </div>
        },
        { 
            label: 'Payment',
            render: ()=> {
                return !proceedToPayment ? (<div className='card-reveal rounded-2xl m-auto w-full max-w-2xl text-center bg-white p-6 sm:p-10 md:p-15 shadow-xs border-[0.5px] border-gray-200 my-10'>
                    <div className='rounded-full p-3 bg-(--sb-blue-fade-4) w-max m-auto my-4 scale-130 relative bottom-2'><CreditCard stroke='var(--sb-blue-250)' /></div>
                    <h1 className='playfair-display text-2xl sm:text-3xl'>Ready for Payment</h1>
                    <p className='text-gray-400 text-base sm:text-lg my-3'>Your booking details have been saved. Proceed to payment to complete your reservation.</p>

                    <Button onClick={()=>setProceedToPayment(true)} textContent='Proceed to payment' Icon={CreditCard} className='text-white bg-(--sb-blue-250) text-lg px-6 py-3 w-max m-auto my-4 mt-6' />
                </div>) : <PayementForm/>
            },
        }
    ];

    const canAccessStep = (step: number) => {
        if (step <= 0) return true;
        if (!BookFlightSchema.safeParse(flightInfos).success) return false;
        if (step === 1) return true;
        if (!flightSelected) return false;
        if (step === 2) return true;
        return PassengerFormSchema.safeParse({passengers: passengersInfos, settings: passengersSetting}).success;
    };

    const guardedSetActiveStep = (value: number | ((previous: number) => number)) => {
        const nextStep = typeof value === 'function' ? value(activeStep) : value;
        if (nextStep >= 0 && nextStep < steps.length && canAccessStep(nextStep)) {
            setActiveStep(nextStep);
        }
    };

    useEffect(()=> {
        if(!canAccessStep(activeStep))
            guardedSetActiveStep(0);
        if(activeStep < 3)
            setProceedToPayment(false);
    }, [activeStep]);


    
  return (
    <div className='py-6 sm:py-10 bg-gray-50'>
        <div className='page-reveal'>
            <Bubble Icons={CreditCard} text='Secure Payment'/>

            <h1 className='page-reveal-delay-1 page-reveal playfair-display text-2xl sm:text-3xl text-center my-5 px-4'>Complete Your Booking</h1>
            <p className='page-reveal-delay-2 page-reveal text-center text-base sm:text-lg text-gray-400 px-4'>Review your booking and complete the payment</p>
        </div>

        <div className='w-full max-w-6xl px-4 sm:px-6 lg:px-8 m-auto my-8 sm:my-10'>
            <StepperContext.Provider value={{activeStep, setActiveStep: guardedSetActiveStep, levelSlider, setLevelSlider}}>
                <LinearStepper steps={steps} />
            </StepperContext.Provider>
        </div>
    </div>
  )
}

export default BookFlight
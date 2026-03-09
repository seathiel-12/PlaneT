import { Clock, Plane, Users } from 'lucide-react'
import { useStepperContext } from '../../Pages/BookFlight'
import type { FlightTicketProps } from './type';
import { useBookFlightStore } from './store';


function FlightTicket(flight: FlightTicketProps) {
    const {company, classTravel, departureAt, duration, typeFlight, landingAt, from, to, price, seatsLeft} = flight;
    
    const formatNumber = (number: number)=>{
        return number < 10 ? `0${number}` : number;
    }
    const { setActiveStep } = useStepperContext();
    const {setFlightSelectedInfos} = useBookFlightStore();
  return (
    <div className='w-full'>        
        <div className='rounded-2xl border-[0.5px] border-gray-300 shadow-xs px-4 py-10 flex bg-white justify-around'>
            <div className='flex items-center gap-5 min-w-max'>
                <div className='rounded-full p-3 bg-[#134cdd13]'><Plane stroke='var(--sb-blue-250)'/></div>
                <div className=''>
                    <p className='font-bold text-lg'>{company}</p>
                    <p className='rounded-full py-0.7 border-[0.5px] border-gray-300 text-center scale-80 -left-[10%] relative'>{classTravel}</p>
                </div>
            </div>

            <div className='flex px-10 gap-8 items-center text-center'>
                <div>
                    <h2 className='font-bold text-3xl'>{formatNumber(new Date(departureAt).getHours()) + ':' + formatNumber(new Date(departureAt).getMinutes()) }</h2>
                    <p><span className='font-bold flex flex-row justify-center'>{from.split(' ')[1]}</span> <span className='text-gray-400 text-[14px]'>{from.split(' ')[0]}</span></p>
                </div>

                <div className='text-center'>
                    <p className='flex items-center gap-1 w-max m-auto'>
                        <Clock width={17} className='text-gray-400'/>
                        <span className='text-[13px] text-gray-500'>{duration}</span>
                    </p> 
                    
                    <div className='flex items-center gap-2'>
                        <hr className='border-[0.5px] border-gray-300 w-20'/>
                        <div><Plane width={20} stroke='var(--sb-blue-250)' className='rotate-90'/></div>
                        <hr className='border-[0.5px] border-gray-300 w-20'/>
                    </div>
                     
                    <p className='text-[13px] text-gray-400'>{typeFlight}</p>
                </div>

                <div>
                    <h2 className='font-bold text-3xl'>{formatNumber(new Date(landingAt).getHours()) + ':' + formatNumber(new Date(landingAt).getMinutes())}</h2>
                    <p><span className='font-bold flex flex-row justify-center'>{to.split(' ')[1]}</span> <span className='text-gray-400 text-[14px]'>{to.split(' ')[0]}</span></p>
                </div>
            </div>

            <div className=' text-right border-l-[0.5px] border-l-gray-300 pl-10 min-w-max'>
                <p className='text-[14px] text-gray-500'>Per person</p>
                <p className='text-3xl text-(--sb-blue-250) font-bold'>{`$${price}`}</p>
                <div className='flex items-center gap-2 text-gray-500 text-[14px]'>
                    <Users width={15} />
                    <span>{seatsLeft} seats left</span>
                </div>

                <div className='mt-5'>
                    <button onClick={()=>{
                        setActiveStep(2);
                        setFlightSelectedInfos(flight);
                    }} className='rounded-xl py-1 px-3 shadow-xs border-[0.5px] border-gray-300'>Select</button>
                </div>
            </div>

        </div> 
    </div>
  )
}

export default FlightTicket
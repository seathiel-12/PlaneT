import { Plane } from 'lucide-react'
import SearchBar from '../../../Utils/Components/SearchBar/SearchBar';

function Hero() {
    const stats = {
        travelers: "1M+",
        destinations: "200+",
        airlines: "70+",
        support: "24/7",
    }
  return (
    <div>
        <div className='flex items-center gap-2 px-4 py-1.25 rounded-full border border-gray-300 w-max m-auto mt-20 scale-90'>
            <Plane width={20} stroke='blue'/>            
            <p className='text-gray-500'>Your gateway to Global travel</p>
        </div>

    <div className='mt-10 mb-15'>
        <h1 className='text-6xl font-bold text-center mt-6 mb-7'>Explore the World with <span className='text-blue-500'>PlaneT</span></h1>
        <p className='text-gray-600 text-2xl text-center mt-4 px-6 w-[55%] m-auto'>Discover extraordinary destinations, book seamless flights, and create unforgettable memories. Your next adventure is just a click away.</p></div>
        
        <SearchBar/>

        <div className='flex justify-center gap-20 mt-16 mb-20 relative -z-1'>
            { Object.entries(stats).map(([key, value]) => (
                <div key={key} className='text-center'>
                    <h2 className='text-4xl font-bold text-blue-500'>{value}</h2>
                    <p className='text-gray-600 capitalize mt-2'>{key}</p>
                </div>
            )) }
        </div>
    </div>
  )
}

export default Hero
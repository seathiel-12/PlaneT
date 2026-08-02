import { Plane } from 'lucide-react'
import SearchBar from '../../../Utils/Components/SearchBar/SearchBar';
import SplitText from '../../../Utils/Components/SplitText/SplitText';

function Hero() {
    const stats = {
        travelers: "1M+",
        destinations: "200+",
        airlines: "70+",
        support: "24/7",
    }
  return (
    <div className="bg-[linear-gradient(to_bottom,_rgb(225,244,251)_10%,_var(--color-gray-50)_95%)]">
        <div className='flex items-center gap-2 px-4 py-1.25 rounded-full border border-gray-300 w-max m-auto mt-20 scale-90'>
            <Plane width={20} stroke='blue'/>            
            <p className='text-gray-500'>Your gateway to Global travel</p>
        </div>

    <div className='mt-10 mb-15'>

        <div className="w-max m-auto flex justify-center items-center gap-3">
            <SplitText
            text='Explore the World with'
            className="text-6xl font-bold text-center mt-6 mb-7"
            delay={20}
            duration={0.7}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            />
            <p className='text-(--sb-blue-250) text-6xl font-bold h-max'>PlaneT</p>
        </div>
        <p className='text-gray-600 text-2xl text-center mt-4 px-6 w-[55%] m-auto'>Discover extraordinary destinations, book seamless flights, and create unforgettable memories. Your next adventure is just a click away.</p></div>
            
            <SearchBar/>        

        <div className='flex justify-center gap-25 mt-30 mb pb-20 relative z-1'>
            { Object.entries(stats).map(([key, value]) => (
                <div key={key} className='text-center'>
                    <h2 className='text-5xl font-bold text-(--sb-blue-250)'>{value}</h2>
                    <p className='text-gray-600 capitalize mt-2'>{key}</p>
                </div>
            )) }
        </div>
    </div>
  )
}

export default Hero
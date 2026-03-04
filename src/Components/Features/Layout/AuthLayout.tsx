import { Plane } from 'lucide-react'
import { Outlet, useLocation } from 'react-router';
import Tab from '../../../Utils/Components/Tabs/Tab';

function AuthLayout() {
    const {pathname} = useLocation();

  return (
    <div>
        <div className='rounded-full p-3 bg-(--sb-blue-300) text-white w-max m-auto mt-10 scale-110'>
            <Plane strokeWidth={2}/>
        </div>

        <div className='w-max m-auto mt-8 text-center'>
            <h1 className='text-3xl font-bold'>Welcome to <span className='bg-clip-text bg-(--sb-blue-200)'>PlaneT</span></h1>
            <p className='text-md py-2 text-gray-500'>Sign in to manage your bookings and saved destinations</p>
        </div>
        
        <div className='w-[30%] m-auto mb-20'>
            <Tab options={['Sign In', 'Create Account']} current={pathname.includes('sign-in') ? 'Sign In' : 'Create Account'} />
             <Outlet/>
        </div>
        

       
    </div>
  )
}

export default AuthLayout
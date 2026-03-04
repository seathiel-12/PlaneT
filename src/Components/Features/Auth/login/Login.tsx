import { Lock, Mail } from 'lucide-react'
import TextField from '../../../../Utils/Components/TextField/TextField'
import Button from '../../../../Utils/Components/Button/Button';
import { Link } from 'react-router';
import Google from '../../../../assets/Icons/google-logo.svg';
import Apple from '../../../../assets/Icons/apple-logo.svg';

function Login() {
    const emailProps = {
        type: 'email',
        label: 'Email',
        placeholder: 'traveler@example.com',
        Icon: Mail,
        onChange: () => {}
    }

    const passwordProps = {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        Icon: Lock,
        onChange: () => {}
    }

  return (
    <form action='' className=' m-auto rounded-2xl mt-5 bg-white shadow-lg p-8'>
        <h1 className='text-2xl font-bold'>Welcome back</h1>
        <p className='text-sm mt-4 text-gray-500'>Sign in to your account to manage your bookings</p>

        <TextField {...emailProps} />

        <div>
            <TextField {...passwordProps} />
            <Link to={'/forgot-password'} className='w-max text-sm flex justify-self-end mt-3 text-(--sb-blue-300) cursor-pointer'>Forgot password ?</Link>
        </div>

        <Button className='bg-(--sb-blue-300) text-white w-full mt-4 py-1.5 rounded-lg' textContent='Sign In' />

        <div className='flex items-center gap-2 w-full mt-3 justify-center text-sm text-gray-500'>
            <hr className='w-[30%] border-gray-500 border-[1.25px]' />
            <p>or continue with</p>
            <hr className='w-[30%] border-gray-500 border-[1.25px]' />
        </div>

        <div className='flex gap-2 text-center mt-3 '>
            <button className='flex items-center justify-center gap-2 w-[49%] rounded-xl border border-gray-300 py-1.25'>
                <img src={Google} width={19} height={19} alt="google logo" />
                <span>Google</span> 
            </button>
            <button className='flex items-center justify-center gap-2 w-[49%] rounded-xl border border-gray-300 py-1.25'>
                <img width={19} height={19} src={Apple} alt="apple logo" />
                <span>Apple</span>
            </button>
        </div>
    </form>
  )
}

export default Login
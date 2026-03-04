import { Mail, User, Lock } from 'lucide-react';
import TextField from "../../../../Utils/Components/TextField/TextField"

function Register() {
  return (
    <form action='' className=' m-auto rounded-2xl mt-5 bg-white shadow-lg p-8'>
        <h1 className="font-bold text-2xl">Create Account</h1>
        <p className="py-3">Join PlaneT and start exploring the world</p>

        <div className="flex items-center gap-5">
            <TextField label="First name" Icon={User} placeholder="John"   />
            <TextField label="Last name" placeholder="Doe"  />
        </div>

        <TextField label="Email" type="email" Icon={Mail} placeholder="traveler@example.com"/>
        <TextField label="Password" type="password" Icon={Lock} placeholder="Create a password"/>
        <TextField label="Confirm Password" type="password" placeholder="Re-enter your password"/>

        <div className='mt-3 pl-2'>
            <input type="checkbox" id='agree' required className='scale-120' />
            <label htmlFor="agree" className="text-sm text-gray-600 ml-2">I agree to the <span className="text-(--sb-blue-300) cursor-pointer">Terms of Service</span> and <span className="text-(--sb-blue-300) cursor-pointer">Privacy Policy</span></label>
        </div>

        <button type="submit" className='bg-(--sb-blue-300) text-white w-full mt-4 py-1.5 rounded-lg'>Create Account</button>
    </form>
  )
}

export default Register
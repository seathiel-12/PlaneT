import { Mail, User, Lock } from 'lucide-react';
import TextField from '../../../../Utils/Components/TextField/TextField'; 
import { Controller, useForm } from 'react-hook-form';
import { RegisterSchema, type RegisterProps } from './type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const {handleSubmit, control} = useForm<RegisterProps>({
    resolver: zodResolver(RegisterSchema)
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const onSubmit = (data:RegisterProps)=>{
    signIn({ firstname: data.firstname, lastname: data.lastname, email: data.email });
    navigate('/home');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=' m-auto rounded-2xl mt-5 bg-white shadow-lg p-8'>
        <h1 className="font-bold text-2xl">Create Account</h1>
        <p className="py-3">Join PlaneT and start exploring the world</p>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row items-center sm:gap-5 ">
              <Controller 
                control={control}
                name='firstname'
                render={({field, fieldState:{error}})=> <TextField value={field.value} onChange={field.onChange} errorMessage={error?.message} label="First name" Icon={User} placeholder="John" />}
              />
              <Controller
                control={control}
                name='lastname'
                render={({field, fieldState: {error}})=> <TextField value={field.value}
              onChange={field.onChange} errorMessage={error?.message} label="Last name" placeholder="Doe" />}
              />
          </div>

          <Controller 
            control={control}
            name='email'
            render={({field, fieldState: {error}})=> <TextField value={field.value}
              onChange={field.onChange} type='email' errorMessage={error?.message} label="Email" placeholder="traveler@example.com" Icon={Mail}/>}
          />
          <Controller 
            control={control}
            name='password'
            render={({field, fieldState: {error}})=> <TextField value={field.value}
              onChange={field.onChange} type='password' errorMessage={error?.message} label="Password" placeholder="Create a password" Icon={Lock}/>}
          />
          <Controller 
            control={control}
            name='confirmPassword'
            render={({field, fieldState: {error}})=> <TextField value={field.value}
              onChange={field.onChange} type='password' errorMessage={error?.message} label="Confirm Password" placeholder="Re-enter your password" Icon={Lock}/>}
          />

          <div className='mt-3 pl-2'>
              <input type="checkbox" id='agree' required className='scale-120' />
              <label htmlFor="agree" className="text-sm text-gray-600 ml-2">I agree to the <span className="text-(--sb-blue-300) cursor-pointer">Terms of Service</span> and <span className="text-(--sb-blue-300) cursor-pointer">Privacy Policy</span></label>
          </div>

        </div>

        <button type="submit" className='bg-(--sb-blue-300) text-white w-full mt-4 py-1.5 rounded-lg'>Create Account</button>
    </form>
  )
}

export default RegisterForm
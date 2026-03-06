import type { MessageCircle } from 'lucide-react'
import React, { Children, type ReactNode } from 'react'

type InputProps = {
    labels: string[],
    Icon?: typeof MessageCircle,
    children: ReactNode
}

const Input: React.FC<InputProps> = ({Icon, labels, children}) => {
  return (
    <div className='grid grid-cols-2 my-4 gap-10'>
        {labels.map( label => <div className='w-full'>
            <label htmlFor={label} className='flex items-center gap-2'>
                {Icon && <Icon width={17} stroke='var(--sb-blue-250)'/>}
                    <span className='font-bold'>{label} date</span>
            </label>
            {children}
        </div>) }
    </div>
  )
}

export default Input
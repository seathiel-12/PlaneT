import { type ReactNode } from 'react';

type CardProps = {
    children: ReactNode,
    classname: string
}

const Card: React.FC<CardProps> = ({children, classname}) => {
  return (
    <div className={ classname + ' rounded-2xl shadow-2xs border-[0.5px] border-gray-300' }>
        {children}
    </div>
  )
}

export default Card
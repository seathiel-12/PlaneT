import { type ReactNode } from 'react';

function Card(children: ReactNode, classname: string) {
  return (
    <div className={ classname + ' rounded-2xl shadow-2xs border-[0.5px] border-gray-300' }>
        {children}
    </div>
  )
}

export default Card
import { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0)
  return (
    <div className='flex gap-3 items-center'>
        <button onClick={()=>{
          if(count > 0)
            setCount(count - 1)
          }} className={'w-8 h-8 rounded-full border border-gray-400 font-bold cursor-pointer duration-200 hover:bg-gray-100' + (!count ? ' opacity-40' : ' hover:scale-110')}>-</button>
        <span>{count}</span>
        <button onClick={()=>setCount(count + 1)} className='w-8 h-8 rounded-full border border-gray-400 font-bold cursor-pointer hover:scale-110 duration-200 hover:bg-gray-100'>+</button>
    </div>
  )
}

export default Counter
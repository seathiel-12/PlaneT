import { useRef, type FC, type HTMLAttributes, type ReactNode } from 'react'

type ContentProps = {
  width: string | number
  left: string | number
  display: string,
  setContent: (content: any) => void
  setOverlay: (overlay: any) => void
} & HTMLAttributes<HTMLDivElement>

const Content : FC<{children:ReactNode, contentProps:ContentProps}> = ({children, contentProps:{ width, left, display, setContent, setOverlay, ...props }} ) => {
    const ref=useRef(null);
  return (
    <div {...props} ref={ref} className='w-full mt-3 relative m-auto z-1000 transition-all duration-300'>
        <div style={{width: width, left: left, display:display}} className='absolute z-1000 box-border max-w-[calc(100vw-2rem)] rounded-4xl border-2 border-gray-200 bg-white pb-3 pt-2 shadow-lg transition-all duration-300 ease-in-out'>
            {children}
        </div>
    </div>
  )
}

export default Content
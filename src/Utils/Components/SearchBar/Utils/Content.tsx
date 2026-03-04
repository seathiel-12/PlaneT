import { useRef } from 'react'

interface ContentProps {
  content: React.ReactNode
  width: string | number
  left: string | number
  display: string
  setContent: (content: any) => void
  setOverlay: (overlay: any) => void
}

function Content( { content, width, left, display, setContent, setOverlay }: ContentProps) {
    const ref=useRef(null)
  return (
    <div ref={ref} className='max-w-2/3 w-full mt-3 relative m-auto z-1000'>
        <div style={{width: width, left: left, display:display}} className='pt-2 pb-3 px-10 rounded-4xl  shadow-lg border-2 border-gray-200 absolute transition-all duration-300 ease-in-out z-1000 bg-white'>
            {content}
        </div>
    </div>
  )
}

export default Content
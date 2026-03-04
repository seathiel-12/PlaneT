import React from 'react'
import { type LucideProps } from 'lucide-react'


interface BubbleProps {
  Icons: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >
  text: string
}

const Bubble: React.FC<BubbleProps> = ({ Icons, text }) => {
  return (
    <div className="text-gray-500 flex items-center gap-2 rounded-2xl py-1 px-3 bg-gray-100 shadow-xs w-max scale-80 m-auto">
      <Icons width={17} />
      <span>{text}</span>
    </div>
  )
}

export default Bubble



type SliderProps = {
    level : number
} 
const ColorSlider: React.FC<SliderProps> = ({level}) => {
  return (
    <div style={{background: `linear-gradient(to right,#0079bf 0 ${level}%, var(--sb-blue-fade-3) ${level}% 100%)`}} className={`my-3 rounded-full py-1 border-[0.5px] border-gray-300 transition-500    `}>

    </div>
  );
}

export default ColorSlider;
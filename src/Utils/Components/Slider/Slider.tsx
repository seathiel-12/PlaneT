import { useEffect, useRef } from "react";

type SliderProps = { from: number, to: number };

const ColorSlider: React.FC<SliderProps> = ({ from, to }) => {
  const ref = useRef<HTMLDivElement | null>(null);
 
  useEffect(() => {
    let frame: number;

    const step = (i: number) => {
      const el = ref.current;
      if (el) {
        const grad = `linear-gradient(
          to right,
          #0079bf 0 ${i}%,
          var(--sb-blue-fade-3) ${i}% 100%
        )`;
        el.style.background = grad;
      }
      if (i < to) {
        frame = requestAnimationFrame(() => step(i + 1));
      }
    };
    step(from);

    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <div
      ref={ref}
      className="w-[99%] m-auto mt-6 my-3 rounded-full py-1 border-[0.5px] border-gray-300 duration-500 ml-2"
    />
  );
};

export default ColorSlider;
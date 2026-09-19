import { useEffect, useRef } from "react";

type SliderProps = { from: number, to: number };

const ColorSlider: React.FC<SliderProps> = ({ from, to }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const currentValue = useRef(from);
 
  useEffect(() => {
    let frame: number;
    const startTime = performance.now();
    const duration = 500;
    const startValue = Math.max(0, Math.min(100, currentValue.current));
    const targetValue = Math.max(0, Math.min(100, to));

    const step = (now: number) => {
      const el = ref.current;
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (targetValue - startValue) * easedProgress;

      if (el) {
        const grad = `linear-gradient(
          to right,
          #0079bf 0 ${value}%,
          var(--sb-blue-fade-3) ${value}% 100%
        )`;
        el.style.background = grad;
      }
      currentValue.current = value;

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);

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
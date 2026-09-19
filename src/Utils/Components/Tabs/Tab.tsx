import { useLayoutEffect, useRef } from "react";

type TabsProps = {
    options: string[];
    current?: string;
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Tabs({ options, current, onclick }: TabsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    const updateIndicator = () => {
        const container = containerRef.current;
        const indicator = indicatorRef.current;
        if (!container || !indicator || options.length === 0) return;

        const activeIndex = Math.max(0, options.indexOf(current ?? ''));
        const activeTab = container.querySelector<HTMLButtonElement>(
            `button[data-tab-index="${activeIndex}"]`
        );

        if (!activeTab) return;

        indicator.style.width = `${activeTab.offsetWidth}px`;
        indicator.style.height = `${activeTab.offsetHeight}px`;
        indicator.style.transform = `translate(${activeTab.offsetLeft}px, ${activeTab.offsetTop}px)`;
    };

    useLayoutEffect(() => {
        updateIndicator();
        window.addEventListener('resize', updateIndicator);

        return () => window.removeEventListener('resize', updateIndicator);
    }, [current, options]);

  return (
    <div ref={containerRef} className='relative rounded-xl flex p-0.75 bg-gray-100 w-full'>
        <div
            ref={indicatorRef}
            aria-hidden='true'
            className='absolute left-0 top-0 rounded-lg bg-white shadow-md transition-[transform,width,height] duration-300 ease-out pointer-events-none z-0'
        />

        {options.map((option, index) =>
            <button
                type='button'
                id={option}
                data-tab-index={index}
                aria-pressed={current === option || (!current && index === 0)}
                onClick={onclick}
                key={`${option}-${index}`}
                className='relative z-10 flex-1 py-1.25 text-sm min-w-0 transition-colors'
            >
                <span className='block truncate px-2'>{option}</span>
            </button>
        )}
    </div>
  )
}

export default Tabs
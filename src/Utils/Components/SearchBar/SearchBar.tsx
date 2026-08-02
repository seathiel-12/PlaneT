import { useEffect, useRef, useState, useCallback, useMemo, type ReactNode } from 'react';
import { Calendar, CalendarFold, Search, X } from 'lucide-react';
import Content from './Utils/Content';
import dayjs from 'dayjs';
import { ClickAwayListener } from '@mui/material';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import clsx from 'clsx';
import { Transition } from '@mantine/core';
import { DateRangePicker, type DateValue } from '../DateRangePicker/DateRangePicker';
import { Counter } from './Utils/Counter';
import { useFlightSearchStore } from './useFlightSearchStore';

// Types
type TravelerType = 'adults' | 'kids' | 'babies' | 'pets';
type FlexibleDuration = 'A week-end' | 'A week' | 'A month';
type ActiveTab = 'l1' | 'l2' | 'l3' | undefined;

export type FlightSearchInfosType = {
    destination: string | undefined;
    dates: {
        startDate: DateValue;
        endDate: DateValue;
    };
    flexible: {
        from: number[];
        for: FlexibleDuration | undefined;
    };
    travelers: {
        [key in TravelerType]: number;
    };
};

// Destinations data - déplacé hors du composant
const DESTINATIONS = [
    { icon: '🗼', colorIcon: '#0f766e', colorBgIcon: '#ccfbf1', destination: 'Paris, France', hookWord: 'célèbre pour des sites comme : Grand Palais' },
    { icon: '🏯', colorIcon: '#b45309', colorBgIcon: '#fef3c7', destination: 'Tokyo, Japon', hookWord: 'célèbre pour des sites comme : Senso-ji' },
    { icon: '🗽', colorIcon: '#2563eb', colorBgIcon: '#dbeafe', destination: 'New York, États-Unis', hookWord: 'célèbre pour des sites comme : Central Park' },
    { icon: '🏰', colorIcon: '#7c3aed', colorBgIcon: '#ede9fe', destination: 'Londres, Royaume-Uni', hookWord: 'célèbre pour des sites comme : Big Ben' },
    { icon: '🏙️', colorIcon: '#ea580c', colorBgIcon: '#ffedd5', destination: 'Dubai, Émirats Arabes Unis', hookWord: 'célèbre pour des sites comme : Burj Khalifa' },
    { icon: '🏛️', colorIcon: '#dc2626', colorBgIcon: '#fee2e2', destination: 'Rome, Italie', hookWord: 'célèbre pour des sites comme : Colisée' },
    { icon: '🌈', colorIcon: '#db2777', colorBgIcon: '#fce7f3', destination: 'Barcelone, Espagne', hookWord: 'célèbre pour des sites comme : Sagrada Família' },
    { icon: '🌊', colorIcon: '#0891b2', colorBgIcon: '#cffafe', destination: 'Sydney, Australie', hookWord: 'célèbre pour des sites comme : Opéra de Sydney' },
    { icon: '⛰️', colorIcon: '#059669', colorBgIcon: '#d1fae5', destination: 'Cape Town, Afrique du Sud', hookWord: 'célèbre pour des sites comme : Table Mountain' },
    { icon: '🌺', colorIcon: '#be185d', colorBgIcon: '#fce7f3', destination: 'Bali, Indonésie', hookWord: 'célèbre pour des sites comme : Uluwatu' },
    { icon: '🕌', colorIcon: '#92400e', colorBgIcon: '#fef3c7', destination: 'Istanbul, Turquie', hookWord: 'célèbre pour des sites comme : Sainte-Sophie' },
    { icon: '🌴', colorIcon: '#65a30d', colorBgIcon: '#ecfccb', destination: 'Marrakech, Maroc', hookWord: 'célèbre pour des sites comme : Médina' },
    { icon: '🌅', colorIcon: '#64748b', colorBgIcon: '#f1f5f9', destination: 'Santorin, Grèce', hookWord: 'célèbre pour des sites comme : Caldeira' },
    { icon: '❄️', colorIcon: '#0ea5e9', colorBgIcon: '#e0f2fe', destination: 'Reykjavik, Islande', hookWord: 'célèbre pour des sites comme : Blue Lagoon' },
    { icon: '🌿', colorIcon: '#16a34a', colorBgIcon: '#dcfce7', destination: 'Singapour, Singapour', hookWord: 'célèbre pour des sites comme : Gardens by the Bay' }
];

const TRAVELERS = [
    { title: "Adults", sub: '13 years old and older', key: 'adults' as TravelerType },
    { title: "Kids", sub: '2 to 12 years old', key: 'kids' as TravelerType },
    { title: "Babies", sub: 'less than 2 years old', key: 'babies' as TravelerType },
    { title: "Pets", sub: 'Are you traveling with a pet ?', key: 'pets' as TravelerType }
];

const MONTHS_TO_DISPLAY = 15;

function SearchBar() {
    const { flightSearchInfos, setFlightSearchInfos } = useFlightSearchStore();
    
    // États locaux
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState<ActiveTab>();
    const [destination, setDestination] = useState('');
    const [typeDate, setTypeDate] = useState<'dates' | 'flexible'>('dates');
    const [overlayDimensions, setOverlayDimensions] = useState({
        width: 0,
        height: 0,
        left: 0,
        display: 'none' as 'none' | 'block'
    });
    const [contentNeedles, setContentNeedles] = useState<{width:string|number, children:string|ReactNode, left:string|number}>({
        width: 0,
        children: '',
        left: 0
    });

    // Refs
    const navbar = useRef<HTMLDivElement>(null);
    const navbarParent = useRef<HTMLDivElement>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const searchSpan = useRef<HTMLSpanElement>(null);

    // Destructuring des valeurs
    const { dates, flexible, travelers } = flightSearchInfos;
    let startDate = dates?.startDate || null;
    let endDate = dates?.endDate || null;
    let from = flexible?.from || [];
    let forFlexible = flexible?.for;

    // Validation du formulaire
    const isValid = useMemo(() => {
        const hasDestination = destination.length > 0;
        const hasDates = startDate && endDate;
        const hasFlexible = from.length > 0 && forFlexible;
        const hasTravelers = Object.values(travelers).some(count => count > 0);
        
        return hasDestination && (hasDates || hasFlexible) && hasTravelers;
    }, [destination, startDate, endDate, from, forFlexible, travelers]);

    // Handlers
    const handleDestinationChange = useCallback((value: string) => {
        setDestination(value);
    }, []);

    const handleClearDestination = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setDestination('');
    }, []);

    const handleClearAll = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setFlightSearchInfos((prev) => ({
            ...prev,
            dates: { startDate: null, endDate: null },
            flexible: { from: [], for: undefined }
        }));
    }, [setFlightSearchInfos]);

    const toggleFlexibleMonth = useCallback((index: number) => {
        setFlightSearchInfos((prev) => {
            const currentFrom = prev.flexible?.from ?? [];
            const nextFrom = currentFrom.includes(index)
                ? currentFrom.filter(i => i !== index)
                : [...currentFrom, index];

            return {
                ...prev,
                dates: { startDate: null, endDate: null },
                flexible: {
                    from: nextFrom,
                    for: prev.flexible?.for,
                },
            };
        });
    }, [setFlightSearchInfos]);

    const setFlexibleDuration = useCallback((value: FlexibleDuration) => {
        setFlightSearchInfos((prev) => ({
            ...prev,
            dates: { startDate: null, endDate: null },
            flexible: {
                from: prev.flexible?.from ?? [],
                for: value,
            }
        }));
    }, [setFlightSearchInfos]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isValid) return;

        const searchParams = {
            destination,
            ...(startDate && endDate ? {
                dates: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                }
            } : {
                flexible: {
                    from,
                    for: forFlexible,
                }
            }),
            travelers,
        };

        console.log('Searching with params:', searchParams);
        // TODO: Appel API ou navigation
        
        // Fermeture après recherche
        handleCloseOverlay();
    }, [destination, startDate, endDate, from, forFlexible, travelers, isValid]);

    // Fonctions d'affichage
    const formatDateFromIndex = useCallback((index: number) => ({
        month: dayjs().add(index, 'month').format('MMMM'),
        year: dayjs().add(index, 'month').format('YYYY'),
    }), []);

    const formatDisplayDate = useCallback((date: DateValue) => {
        if (!date) return '';
        return dayjs(date).format('MMM DD YYYY');
    }, []);

    const formatFlexibleDisplay = useCallback(() => {
        if (!from.length || !forFlexible) return 'Flexible dates';
        const sortedMonths = [...from].sort((a, b) => a - b);
        const monthNames = sortedMonths.map(i => 
            formatDateFromIndex(i).month.toLowerCase().slice(0, 3)
        );
        return `${forFlexible} in ${monthNames.join(', ')}`;
    }, [from, forFlexible, formatDateFromIndex]);

    // Overlay management
    const handleCloseOverlay = useCallback(() => {
        setContentNeedles({ width: 0, children: '', left: 0 });
        setOverlayDimensions({ width: 0, height: 0, left: 0, display: 'none' });
        navbar.current?.classList.remove('bg-[#e2e2e254]');
        setActive(undefined);
    }, []);

    const overlayActive = useCallback((id: ActiveTab) => {
        const li = document.getElementById(id!)?.querySelector('.onglet');
        if (!li || !navbarParent.current || !id) return;

        const { width, height, left } = li.getBoundingClientRect();
        const navbarParentRect = navbarParent.current.getBoundingClientRect();

        navbar.current?.classList.add('bg-[#e2e2e254]');

        // Animation du bouton search
        if (searchSpan.current) {
            const isOpened = searchSpan.current.getAttribute('data-open') === 'opened';
            if (id !== 'l3' && isOpened) {
                const animate = searchSpan.current.animate([
                    { width: '200px', color: 'white' },
                    { width: '24px', color: 'transparent' }
                ], {
                    duration: 500,
                    easing: 'ease-in-out'
                });
                animate.onfinish = () => {
                    searchSpan.current?.classList.add('hidden');
                    searchSpan.current?.setAttribute('data-open', 'closed');
                };
            } else if (id === 'l3') {
                searchSpan.current.classList.remove('hidden');
                searchSpan.current.setAttribute('data-open', 'opened');
            }
        }

        const allContents = getContents();
        setOverlayDimensions({
            width,
            height,
            left: (left - navbarParentRect.left) + window.scrollX,
            display: 'block'
        });
        setContentNeedles({
            width: allContents[id].contentWidth,
            left: id === 'l3' ? '50%' : 0,
            children: allContents[id].node
        });
    }, [typeDate, active, flightSearchInfos]);

    const getContents = useCallback((): Record<Exclude<ActiveTab, undefined>, {
        node: React.ReactNode;
        contentWidth: string | number;
    }> => ({
        l1: {
            node: (
                <div className="h-100 pt-3 px-8 overflow-scroll">
                    <div>
                        <small className="font-bold text-[0.9rem]">Destinations suggested</small>
                    </div>
                    <div className="mt-4 grid gap-2 overflow-y-auto pr-2">
                        {DESTINATIONS.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className="flex items-center gap-5 rounded-2xl border border-gray-200 p-3 py-4 text-left transition hover:border-gray-400 hover:bg-gray-200 hover:shadow-sm"
                                onClick={() => {
                                    handleDestinationChange(item.destination);
                                    setActive('l2');
                                }}
                            >
                                <div
                                    className="flex h-13 w-13 items-center justify-center rounded-xl"
                                    style={{ backgroundColor: item.colorBgIcon, color: item.colorIcon }}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{item.destination}</p>
                                    <p className="text-xs text-gray-500">{item.hookWord}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ),
            contentWidth: "50%"
        },
        l2: {
            node: (
                <div className="px-10 py-3">
                    <div className="m-auto w-full">
                        <div className="my-5 w-[40%] mx-auto grid grid-cols-2 gap-2 rounded-full p-1 bg-[#ebebeb] font-medium">
                            <button
                                onClick={() => setTypeDate('dates')}
                                aria-selected={typeDate === 'dates'}
                                className={clsx(
                                    'rounded-full py-2 px-4 transition-all',
                                    typeDate === 'dates' ? 'bg-white shadow-md' : 'hover:bg-neutral-300'
                                )}
                            >
                                Dates
                            </button>
                            <button
                                onClick={() => setTypeDate('flexible')}
                                aria-selected={typeDate === 'flexible'}
                                className={clsx(
                                    'rounded-full py-2 px-4 transition-all',
                                    typeDate === 'flexible' ? 'bg-white shadow-md' : 'hover:bg-neutral-300'
                                )}
                            >
                                Flexible
                            </button>
                        </div>

                        <div>
                            {typeDate === 'dates' ? (
                                <DateRangePicker />
                            ) : (
                                <div className='text-center'>
                                    <h2 className='font-semibold p-3 text-xl mt-10'>How long will your stay be?</h2>
                                    <ul className='flex gap-6 w-max m-auto mb-7 mt-4'>
                                        {(['A week-end', 'A week', 'A month'] as FlexibleDuration[]).map((duration) => (
                                            <button
                                                key={duration}
                                                onClick={() => setFlexibleDuration(duration)}
                                                className={clsx(
                                                    'rounded-full scale-110 border cursor-pointer p-2 px-4 hover:border-black transition-all',
                                                    forFlexible === duration ? 'border-black border-2' : 'border-gray-300'
                                                )}
                                            >
                                                {duration}
                                            </button>
                                        ))}
                                    </ul>

                                    <h2 className='font-semibold p-3 text-xl mt-10'>When will you leave?</h2>
                                    <ul className='flex gap-3 overflow-y-scroll w-full scrollbar-none mb-7 mt-2'>
                                        {Array.from({ length: MONTHS_TO_DISPLAY }, (_, index) => (
                                            <button
                                                key={`month-${index}`}
                                                onClick={() => toggleFlexibleMonth(index)}
                                                className={clsx(
                                                    'rounded-xl border py-5 px-7 min-w-1/5 hover:border-black transition-all',
                                                    from.includes(index) ? 'bg-gray-100 border-black border-2' : 'border-gray-300'
                                                )}
                                            >
                                                {from.includes(index) ? (
                                                    <CalendarFold stroke="black" strokeWidth={2} className='w-10 h-10 m-auto mb-3' />
                                                ) : (
                                                    <Calendar stroke='gray' strokeWidth={1.5} className='w-10 h-10 m-auto mb-3' />
                                                )}
                                                <p className='text-sm'>
                                                    <span className='font-semibold text-[1rem]'>{formatDateFromIndex(index).month}</span>
                                                    <br />
                                                    {formatDateFromIndex(index).year}
                                                </p>
                                            </button>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ),
            contentWidth: "100%"
        },
        l3: {
            node: (
                <div className="px-10">
                    {TRAVELERS.map(({ title, sub, key }, index) => (
                        <div key={key}>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='font-semibold'>{title}</p>
                                    <p className='text-gray-400 font-semibold text-sm'>{sub}</p>
                                </div>
                                <Counter keys={key} />
                            </div>
                            {index < TRAVELERS.length - 1 && <hr className='border-gray-100 my-3' />}
                        </div>
                    ))}
                </div>
            ),
            contentWidth: "50%"
        }
    }), [active, flightSearchInfos, typeDate]);

    // Effets
    useEffect(() => {
        if (active) {
            overlayActive(active);
        }

        startDate = flightSearchInfos.dates?.startDate || null;
        endDate = flightSearchInfos.dates?.endDate || null;
        from = flightSearchInfos.flexible?.from || [];
        forFlexible = flightSearchInfos.flexible?.for || undefined;
    }, [active, flightSearchInfos, typeDate]);

    useEffect(() => {
        if (active) {
            const handleResize = () => overlayActive(active);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [active, overlayActive]);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsVisible(Boolean(active)), 0);
        return () => clearTimeout(timeoutId);
    }, [active]);

    // Rendu
    return (
        <ClickAwayListener onClickAway={handleCloseOverlay}>
            <div className="w-max m-auto relative">
                <div ref={navbarParent} className='bg-white max-w-max relative m-auto shadow-gray-400 shadow-xs mt-5 rounded-full border-gray-200 border text-[0.9rem] min-w-max'>
                    <form onSubmit={handleSubmit}>
                        <TabGroup>
                            <TabList ref={navbar} className='relative grid grid-cols-3 justify-between cursor-pointer items-center rounded-full transition-all text-[1rem]'>
                                {/* Tab 1: Destination */}
                                <Tab
                                    id="l1"
                                    className='cursor-pointer outline-none rounded-full w-full min-w-max'
                                    onClick={() => setActive('l1')}
                                >
                                    {({ hover }) => (
                                        <div className={clsx(
                                            'py-3 rounded-full px-7 w-full text-left onglet cursor-pointer flex items-center pr-2 relative',
                                            hover && 'bg-(--sb-gray-hover)'
                                        )}>
                                            <label htmlFor="destination" className="block cursor-pointer w-full">
                                                <span className='relative z-3 text-sm font-semibold'>Destination</span>
                                                <input
                                                    className={clsx(
                                                        'outline-none w-full pr-2 relative z-3 bg-transparent',
                                                        destination && 'font-semibold'
                                                    )}
                                                    type="text"
                                                    name="destination"
                                                    id="destination"
                                                    placeholder='Look for a destination'
                                                    value={destination}
                                                    onInput={(e) => handleDestinationChange(e.currentTarget.value)}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActive("l1");
                                                    }}
                                                />
                                            </label>
                                            {destination && active === 'l1' && (
                                                <div 
                                                    className="absolute z-3 right-2 rounded-full p-2 hover:bg-gray-100 duration-200 cursor-pointer"
                                                    onClick={handleClearDestination}
                                                >
                                                    <X width={15} height={15} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Tab>

                                {/* Tab 2: Dates */}
                                <Tab
                                    id="l2"
                                    className='cursor-pointer outline-none rounded-full min-w-max text-left w-full'
                                    onClick={() => setActive("l2")}
                                >
                                    {({ hover }) => (
                                        <div className={clsx(
                                            'py-3 relative rounded-full items-center justify-between onglet min-w-full',
                                            hover && 'bg-(--sb-gray-hover)',
                                            (startDate || endDate || forFlexible || from.length > 0) && 'flex'
                                        )}>
                                            <div className={clsx(
                                                'relative z-3 border-x-2 border-x-gray-200 px-8 w-full',
                                                (hover || active) && 'border-x-transparent'
                                            )}>
                                                {typeDate === 'dates' ? (
                                                    <div>
                                                        <small className='text-sm font-semibold'>Dates</small>
                                                        {(!startDate && !endDate) ? (
                                                            <p className="text-gray-400">When ?</p>
                                                        ) : (
                                                            <p className="font-semibold truncate max-w-[200px]">
                                                                {startDate && formatDisplayDate(startDate)}
                                                                {startDate && endDate && ' - '}
                                                                {endDate && formatDisplayDate(endDate)}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <small className='text-sm font-semibold'>When ?</small>
                                                        {(!from.length || !forFlexible) ? (
                                                            <p className="text-gray-400">Flexible dates</p>
                                                        ) : (
                                                            <p className="line-clamp-1 max-w-55 font-semibold">
                                                                {formatFlexibleDisplay()}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {(startDate || endDate || forFlexible || from.length > 0) && active === 'l2' && (
                                                <div 
                                                    className="absolute z-50 right-2 rounded-full p-2 hover:bg-gray-100 duration-200 cursor-pointer"
                                                    onClick={handleClearAll}
                                                >
                                                    <X width={15} height={15} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Tab>

                                {/* Tab 3: Travelers */}
                                <Tab
                                    id="l3"
                                    className='cursor-pointer outline-none rounded-full w-full min-w-max'
                                    onClick={() => setActive("l3")}
                                >
                                    {({ hover }) => (
                                        <div className={clsx(
                                            'py-3 rounded-full px-7 w-full text-left onglet',
                                            hover && 'bg-(--sb-gray-hover)'
                                        )}>
                                            <small className='relative z-3 text-sm font-semibold'>Travelers</small>
                                            {travelers.adults > 0 ? (
                                                <p className='font-semibold relative z-3 truncate max-w-[150px]'>
                                                    {travelers.adults} adult{travelers.adults > 1 ? 's' : ''}
                                                    {travelers.kids > 0 && `, ${travelers.kids} kid${travelers.kids > 1 ? 's' : ''}`}
                                                    {travelers.babies > 0 && `, ${travelers.babies} bab${travelers.babies > 1 ? 'ies' : 'y'}`}
                                                    {travelers.pets > 0 && `, ${travelers.pets} pet${travelers.pets > 1 ? 's' : ''}`}
                                                </p>
                                            ) : (
                                                <p className='text-gray-400 relative z-3'>Add some</p>
                                            )}
                                        </div>
                                    )}
                                </Tab>

                                {/* Search Button */}
                                <button 
                                    disabled={!isValid} 
                                    type='submit' 
                                    className='transition-all flex items-center cursor-pointer absolute z-4 right-2 bg-linear-to-r from-(--sb-blue-200) to-100% to-(--sb-blue-300) p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    <Search width={24} height={24} stroke='white' strokeWidth={3} />
                                    <span 
                                        ref={searchSpan} 
                                        className='elongation max-w-max text-white font-bold w-max pl-1 hidden'
                                        data-open="closed"
                                    >
                                        Search
                                    </span>
                                </button>
                            </TabList>
                        </TabGroup>
                    </form>

                    {/* Overlay */}
                    {overlayDimensions && (
                        <div 
                            ref={overlay} 
                            className="cursor-pointer rounded-full bg-white absolute z-0 transition-all pointer-events-none duration-300 shadow-[3px_0_5px_rgba(87,87,87,0.3),-3px_0_20px_rgba(87,87,87,0.3)] top-0" 
                            style={overlayDimensions}
                        />
                    )}
                </div>

                {/* Content */}
                {contentNeedles.children && (
                    <Transition
                        mounted={isVisible}
                        transition="scale"
                        duration={400}
                        keepMounted
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <Content 
                                contentProps={{
                                    ...contentNeedles,
                                    style: { ...styles, position: 'absolute' },
                                    setContent: setContentNeedles,
                                    display: contentNeedles.children ? "block" : "none",
                                    setOverlay: setOverlayDimensions,
                                    className: 'transition-all'
                                }}
                            >
                                {contentNeedles.children}
                            </Content>
                        )}
                    </Transition>
                )}
            </div>
        </ClickAwayListener>
    );
}

export default SearchBar;
import { useEffect, useRef, useState, useCallback, useMemo, type ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import Content from './Utils/Content';
import dayjs from 'dayjs';
import { ClickAwayListener } from '@mui/material';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import clsx from 'clsx';
import { Modal, Transition } from '@mantine/core';
import { DateRangePicker, type DateValue } from '../DateRangePicker/DateRangePicker';
import { Counter } from './Utils/Counter';
import { useFlightSearchStore } from './useFlightSearchStore';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { routeMatcher } from '../../../Components/router';
import { useQuery } from '@tanstack/react-query';
import apiFetch from '../../Functions/apiFetch';
import { useBookFlightStore } from '../../../Components/Features/BookFlight/store';
import { useToasting } from '../../Functions/useToasting';

// Types
type TravelerType = 'adults' | 'kids' | 'babies' | 'pets';
type ActiveTab = 'l1' | 'l2' | 'l3' | undefined;

export type FlightSearchInfosType = {
    destination: string | undefined;
    dates: {
        startDate: DateValue;
        endDate: DateValue;
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

function SearchBar() {
    const { flightSearchInfos, setFlightSearchInfos } = useFlightSearchStore();
    const navigate = useNavigate();
    // États locaux
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState<ActiveTab>();
    const [destination, setDestination] = useState('');
    const isMobile = useMediaQuery('(max-width: 640px)');
    const isMobile2 = useMediaQuery('(min-width: 640px) and (max-width: 820px)');

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
    const { dates, travelers } = flightSearchInfos;
    let startDate = dates?.startDate || null;
    let endDate = dates?.endDate || null;

    const [opened, {open, close}] = useDisclosure(false)

    // Validation du formulaire
    const isValid = useMemo(() => {
        const hasDestination = destination.length > 0;
        const hasDates = startDate && endDate;
        const hasTravelers = Object.values(travelers).some(count => count > 0);
        
        return hasDestination && hasDates && hasTravelers;
    }, [destination, startDate, endDate, travelers]);

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
        }));
    }, [setFlightSearchInfos]);

    const {setLookingFlights, setFlightInfos, flightInfos} = useBookFlightStore();
    const {notify} = useToasting();

    const {refetch, isLoading} = useQuery({
        queryKey: ['searchFlights'],
        queryFn: async ()=>{
            try {
                const urlParams = new URLSearchParams();
                if(destination) urlParams.append('toCountry', destination.trim());
                if (travelers) urlParams.append('seatsLeft_gte', (travelers.adults + travelers.kids + travelers.babies + travelers.pets).toString());
                const requestUrl = `flights?${urlParams.toString()}`;
                const res = await apiFetch(requestUrl);

                if(res.success){
                    setLookingFlights(Array.isArray(res.body) ? res.body : []);
                    setFlightInfos({
                        ...flightInfos,
                        passengersCount: travelers.adults + travelers.kids + travelers.babies + travelers.pets
                    });
                    console.log(travelers)
                }else{
                    notify('Could not get any result', 'error');
                }
                return res
            } catch (error) {
                notify('Could not get any result', 'error');            
                return error
            }
        },
        enabled: false
    }); 

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isValid) return;

        const searchParams = {
            destination,
            dates: {
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString(),
            },
            travelers,
        };

        console.log('Searching with params:', searchParams);

        // TODO: Appel API ou navigation
        
        // Fermeture après recherche
        await refetch();
        navigate(routeMatcher.destinations);

        setFlightSearchInfos({
            destination:undefined,
            dates:{
                startDate: null,
                endDate: null
            },
            travelers:{
                adults: 0,
                kids: 0,
                babies: 0,
                pets: 0 
            }
        });



        handleCloseOverlay();
    }, [destination, startDate, endDate, travelers, isValid]);


    const formatDisplayDate = useCallback((date: DateValue) => {
        if (!date) return '';
        return dayjs(date).format('MMM DD YYYY');
    }, []);


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

        if(!isMobile) navbar.current?.classList.add('bg-[#e2e2e254]');

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
            } else if (id === 'l3' && !isMobile2) {
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
            width: `${allContents[id].contentWidth}%`,
            left: id === 'l3' && !isMobile ? `${(100 - Number(allContents[id].contentWidth))}%` : 0,
            children: allContents[id].node
        });
    }, [active, flightSearchInfos, isMobile2]);

    const getContents = useCallback((): Record<Exclude<ActiveTab, undefined>, {
        node: React.ReactNode;
        contentWidth: string | number;
    }> => ({
        l1: {
            node: (
                <div className="h-100 pt-3 px-8 overflow-scroll">
                    <div className="flex items-center justify-between w-full">
                        <small className="font-bold text-[0.9rem]">Destinations suggested</small>
                        <button onClick={handleCloseOverlay} className="p-3 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200 md:hidden"><X width={15} height={15}/></button>
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
            contentWidth: isMobile2 ? 65 : 50
        },
        l2: {
            node: (
                <div className="px-10 py-3">
                    <div className="m-auto w-full">
                        <button onClick={handleCloseOverlay} className="p-3 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200 absolute top-9 right-7 md:hidden"><X width={15} height={15}/></button>
                        <div>
                            <DateRangePicker />
                        </div>
                    </div>
                </div>
            ),
            contentWidth: 100
        },
        l3: {
            node: (
                <div className="px-10">
                    <small onClick={handleCloseOverlay} className="px-5 py-1 rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200 flex justify-self-center my-2 md:hidden">Cancel</small>

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
            contentWidth: isMobile2 ? 65 : 50 
        }
    }), [active, flightSearchInfos, isMobile2]);

    // Effets
    useEffect(() => {
        if (active) {
            overlayActive(active);
        }
        startDate = flightSearchInfos.dates?.startDate || null;
        endDate = flightSearchInfos.dates?.endDate || null;
    }, [active, flightSearchInfos]);

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
            <div className="relative mx-auto w-full max-w-[900px]">
                <div ref={navbarParent} className='relative mx-auto mt-5 w-full min-w-0 rounded-2xl border border-gray-200 bg-white text-[0.9rem] shadow-gray-400 shadow-xs sm:rounded-full'>
                    <form onSubmit={handleSubmit}>
                        <TabGroup>
                            <TabList ref={navbar} className='relative grid grid-cols-1 items-center rounded-2xl pb-14 text-[1rem] transition-all sm:grid-cols-3 sm:rounded-full sm:pb-0'>
                                {/* Tab 1: Destination */}
                                <Tab
                                    id="l1"
                                    className='w-full min-w-0 cursor-pointer rounded-full outline-none'
                                    onClick={() => setActive('l1')}
                                >
                                    {({ hover }) => (
                                        <div className={clsx(
                                            'onglet relative flex w-full cursor-pointer items-center sm:rounded-full px-4 py-4 sm:py-3 pr-2 text-left sm:px-7 max-w-full rounded-t-2xl',
                                            hover && 'bg-(--sb-gray-hover)', active === 'l1' && 'bg-(--sb-gray-hover)'
                                        )}>
                                            <label htmlFor="destination" className=" cursor-pointer w-full flex items-center justify-between sm:block">
                                                <span className='relative z-3 text-sm font-semibold'>Destination</span>
                                                
                                                <div className="flex items-center gap-2 max-w-[60%] sm:max-w-none">
                                                    <input
                                                        className={clsx(
                                                            'outline-none w-max text-right sm:text-left sm:w-full relative z-3 bg-transparent cursor-pointer',
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
                                                    <div
                                                        className={clsx(
                                                            'clear-destination sm:absolute sm:top-[30%] z-3 right-2 sm:hover:bg-gray-100 rounded-full hover:bg-white p-[4px]',
                                                            destination && active === 'l1' && 'clear-destination-visible'
                                                        )}
                                                        aria-hidden={!destination || active !== 'l1'}
                                                        onClick={destination && active === 'l1' ? handleClearDestination : undefined}
                                                    >
                                                        <X width={15} height={15} />
                                                    </div>
                                                </div>
                                            </label>
                                            
                                        </div>
                                    )}
                                </Tab>

                                {/* Tab 2: Dates */}
                                <Tab
                                    id="l2"
                                    className='w-full min-w-0 cursor-pointer rounded-full text-left outline-none'
                                    onClick={() => setActive("l2")}
                                >
                                    {({ hover }) => (
                                        <div className={clsx(
                                            'onglet relative min-w-full sm:rounded-full sm:items-center sm:justify-between sm:py-3',
                                            hover && 'bg-(--sb-gray-hover)',
                                            (startDate || endDate) && 'flex', active === 'l2' && 'bg-(--sb-gray-hover)'
                                        )}>
                                            <div className={clsx(
                                                'relative z-3 w-full border-y-2 border-gray-200 px-4 pr-2 sm:border-x-2 sm:py-0 py-4 sm:border-y-0 sm:px-8',
                                                (hover || active) && 'border-x-transparent'
                                            )}>
                                                {
                                                    <div className="flex items-center justify-between gap-2 sm:block">
                                                        <small className='text-sm font-semibold'>Dates</small>
                                                        {(!startDate && !endDate) ? (
                                                            <p className="text-gray-400 pr-2">When ?</p>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-normal truncate max-w-50 ">
                                                                    {startDate && formatDisplayDate(startDate)}
                                                                    {startDate && endDate && ' - '}
                                                                    {endDate && formatDisplayDate(endDate)}
                                                                </p>
                                                            <div 
                                                                className={clsx(
                                                            'clear-destination z-3 right-1 rounded-full sm:hover:bg-gray-100 hover:bg-white sm:absolute sm:top-[20%] p-[2px]',
                                                            (startDate || endDate) && active === 'l2' && 'clear-destination-visible'
                                                        )}
                                                            onClick={handleClearAll}
                                                        >
                                                             <X width={15} height={15} />
                                                        </div>
                                                        
                                                        </div>
                                                        )}
                                                    </div>
                                                 }
                                            </div>

                                            
                                        </div>
                                    )}
                                </Tab>

                                {/* Tab 3: Travelers */}
                                <Tab
                                    id="l3"
                                    className='w-full min-w-0 cursor-pointer rounded-full outline-none'
                                    onClick={() => setActive("l3")}
                                >
                                    {({ hover }) => (
                                        <div className={clsx(
                                            'onglet w-full sm:rounded-full px-4 py-4 sm:py-3 text-left sm:px-7 flex items-center justify-between sm:block mb-2 sm:mb-0',
                                            hover && 'bg-(--sb-gray-hover)', active === 'l3' && 'bg-(--sb-gray-hover)'
                                        )}>
                                            <small className='relative z-3 text-sm font-semibold'>Travelers</small>
                                            {travelers.adults > 0 ? (
                                                <p className='font-semibold relative z-3 truncate max-w-37.5'>
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
                                    className={clsx("absolute bottom-2 right-2 z-4 cursor-pointer rounded-full bg-linear-to-r from-(--sb-blue-200) to-100% to-(--sb-blue-300) p-3 transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:mt-0 block",)}
                                >   
                                    {
                                        isLoading ? (
                                            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        ) : 
                                        <div
                                            className='flex items-center'
                                        >
                                            <Search width={24} height={24} stroke='white' strokeWidth={3} />
                                            <span 
                                                ref={searchSpan} 
                                                className='elongation max-w-max text-white font-bold w-max pl-1 hidden'
                                                data-open="closed"
                                            >
                                                Search
                                            </span>
                                        </div>
                                    }
                                </button>
                            </TabList>
                        </TabGroup>
                    </form>

                    {/* Overlay */}
                    {overlayDimensions && !isMobile && (
                        <div 
                            ref={overlay} 
                            className={clsx("cursor-pointer sm:rounded-full bg-white absolute z-0 transition-all pointer-events-none duration-300 shadow-[3px_0_5px_rgba(87,87,87,0.3),-3px_0_20px_rgba(87,87,87,0.3)] top-0", active === 'l1' && 'rounded-t-2xl' )}
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
                                    width: isMobile ? '100%' : contentNeedles.width,
                                    left: contentNeedles.left,
                                    style: { ...styles, position: 'absolute'},
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

            <Modal opened={opened} onClose={()=>{
                close();
            }} title={'Flights found'} centered>
                <p>Japon</p>
            </Modal>

            </div>
        </ClickAwayListener>
    );
}

export default SearchBar;
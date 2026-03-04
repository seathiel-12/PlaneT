import { useEffect, useRef, useState } from 'react'
import { Calendar, Search } from 'lucide-react'
import DatePicker from './Utils/DatePicker'
import Content from './Utils/Content'
import dayjs from 'dayjs'
import Counter from './Utils/Counter.jsx'
import { ClickAwayListener, colors, duration, easing } from '@mui/material'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx'
import { Fragment } from 'react'

function SearchBar() {
    
    const navbar = useRef<HTMLDivElement>(null)
    const overlay = useRef(null)
    const searchSpan = useRef<HTMLSpanElement>(null)
    const [overlayDimensions, setOverlayDimensions] = useState({width:0, height:0, left:0, top:0, display: 'none'})
    const [active, setActive] = useState("");
    const [contentNeedles, setContentNeedles] = useState<{width: string | number, content: React.ReactNode, left: string | number}>({width:'0', content:'', left:'0'})
    const [arrivalDate, setArrivalDate] = useState(dayjs())
    const [departureDate, setDepartureDate] = useState(dayjs())
    const [hasChanged, setHasChanged] = useState(new Set())
    const [input, setInput] = useState('')
    const destination = [
        
    ]
    const travelers=[
        { title: "Adultes", sub:'13ans et plus' },
        { title: "Enfants", sub:'De 2 à 12 ans' }, 
        { title: "Bébés", sub:'- de 2 ans' },
        { title: "Animaux domestiques", sub:'Vous voyagez avec un animal?' }
    ]

    const allContents = {
        l2: 
        <div>
            <TabGroup className={"m-auto w-full"}>
                <TabList className={"my-5 w-3/7 mx-auto flex gap-2 rounded-full p-1 bg-[#e0dedee5] font-semibold"}>
                    <Tab as={Fragment}>
                    {({ hover, selected }) => (
                        <button
                            style={{padding: '5px 10px', width:'33%'}}
                            className={clsx('rounded-full', hover && 'bg-[#d3d3d3e7]', selected && 'bg-white text- outline-none')}
                        >
                            Dates
                        </button>
                    )}
                    </Tab>
                    <Tab as={Fragment}>
                    {({ hover, selected }) => (
                        <button
                            style={{padding: '5px 10px', width:'33%'}}
                            className={clsx('rounded-full py-1', hover && 'bg-[#d3d3d3e7]', selected && 'bg-white text- outline-none')}
                        >
                            Months
                        </button>
                    )}
                    </Tab>
                    <Tab as={Fragment}>
                    {({ hover, selected }) => (
                        <button
                            style={{padding: '5px 10px', width:'33%'}}
                            className={clsx('rounded-full py-1', hover && 'bg-[#d3d3d3e7]', selected && 'bg-white text- outline-none')}
                        >
                            Flexible
                        </button>
                    )}
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className='flex justify-between gap-5'>
                            <DatePicker key="arrival" label={'Arrival'} minDate={dayjs()} onchange={(e)=>{setArrivalDate(e); setHasChanged((prev)=>new Set(prev).add("start"));}} />
                            <DatePicker key="departure" label={'Departure'} minDate={dayjs(arrivalDate)} onchange={(e)=>{setDepartureDate(e); setHasChanged((prev)=>new Set(prev).add("end"))}}/>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='text-center'>
                            <h2 className='font-semibold p-3 text-xl'>How long will your stay be?</h2>
                            <ul className='flex gap-3 w-max m-auto mb-7'>
                                <button className='rounded-full border cursor-pointer border-gray-300 p-2 px-4 hover:border-black'>A week-end</button>
                                <button className='rounded-full border cursor-pointer border-gray-300 p-2 px-4 hover:border-black'>A week</button>
                                <button className='rounded-full border cursor-pointer border-gray-300 p-2 px-4 hover:border-black'>A month</button>
                            </ul>

                            <h2 className='font-semibold p-3 text-xl'>When will you leave?</h2>
                            <ul className='flex gap-3 overflow-y-scroll w-full scrollbar-none mb-7 mt-2'>
                                {Array(15).fill(0).map((li, index) => 
                                <li key={index} className='rounded-xl border border-gray-300 py-5 px-7 min-w-1/5 '>
                                    <Calendar stroke='gray' strokeWidth={1.5} className='w-10 h-10 m-auto mb-3'/>
                                    <p className='text-sm'> <span className='font-semibold text-[1rem]'>{dayjs().add(index, 'month').format(`MMMM`)}</span> <br /> {dayjs().add(index, 'month').format(`YYYY`)}</p>
                                </li>)}
                            </ul>
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>        
        </div>,

        l4:
        <div>
            {travelers.map( (trav, index) => 
            <div key={index}>
                <div className='flex justify-between'>
                    <div>
                        <p className='font-semibold'>{trav.title}</p>
                        <p className='text-gray-400 font-semibold'>{trav.sub}</p>
                    </div>
                    <Counter />
                </div>
                {(index < 3) && <hr className='border-gray-100 my-3' />}
            </div>
            )}
        </div>
    }

    const overlayer = (
        e: React.MouseEvent<HTMLElement>,
        contentWidth: string | number,
        content: React.ReactNode | string,
        leftContent: string | number,
        id: string
    ) => {
        const li = (e.target as HTMLElement).parentNode as HTMLElement
        const {width, height, left, top} = li.getBoundingClientRect()
        if(navbar.current){
            navbar.current.classList.add('bg-[#e2e2e254]')
        }
        
        if(active === 'l4' && active!== id && searchSpan.current){
            const animate = searchSpan.current.animate([
                {width:'200px', color:'white'},
                {width:'24px', color:'transparent'}
            ], {
                duration:500,
                easing:'ease-in-out'
            });
            
            animate.onfinish = ()=>{
                searchSpan.current?.classList.add('hidden')
            }
        }
        if(id === 'l4' && searchSpan.current){
            searchSpan.current.classList.remove('hidden')
        }

        setOverlayDimensions( { width: width, height: height, left: left + window.scrollX, top:top + window.scrollY , display: "block"} )
        setActive(id)
        console.log(active)
        setContentNeedles({width: contentWidth, left: leftContent , content: content })
    }

    useEffect(()=>{

    }, [])

  return (
    <>
        <ClickAwayListener 
        children={
        <div>
            <div className='bg-white w-2/3 m-auto shadow-gray-400 shadow-xs mt-5 rounded-full border-gray-200 border text-[0.9rem] min-w-max'>
                <form action="">
                    <TabGroup>
                        <TabList ref={navbar} className='relative flex justify-between cursor-pointer items-center rounded-full transition-all text-[1rem]'>
                            <Tab 
                                id="l1" 
                                className='cursor-pointer outline-none rounded-full max-w-1/3 w-full' 
                                onClick={(e) =>overlayer(e, "50%", <p>Bienvenue</p>, 0, 'l1')}
                                onMouseEnter={ (e)=>{
                                    
                                }}
                            >
                                {({hover}) => (
                                    <div className={clsx('py-3 rounded-full px-7 w-full text-left', hover && 'bg-(--sb-gray-hover)')}>
                                        <p className='relative z-3'>Destination</p>
                                        <input className='outline-none w-full pr-2 relative z-3' type="text" name="search" placeholder='Look for a destination' />
                                    </div>
                                )}
                            </Tab>

                            <Tab 
                                id="l2" 
                                className='cursor-pointer outline-none rounded-full text-center w-1/6' 
                                onClick={(e) =>overlayer(e, "100%", allContents.l2, 0, 'l2')}
                            > 
                                {({hover}) => (
                                <div className={clsx('py-3 rounded-full px-5 w-full', hover && 'bg-(--sb-gray-hover)')}>
                                    <p className='relative z-3'>Arrival</p>
                                    <p className='text-gray-400 relative z-3'>{hasChanged.has("start") ? dayjs(arrivalDate).format('MMM DD YYYY') : "When?"}</p>
                                </div>
                                )}            
                                
                            </Tab>
                            
                            <Tab 
                                id="l3"
                                className='cursor-pointer outline-none rounded-full w-1/6 text-center' 
                                onClick={(e) =>overlayer(e, "100%", allContents.l2, 0, 'l3')}
                            > 
                            {({ hover }) => (
                                <div className={clsx('py-3 rounded-full px-5 w-full', hover && 'bg-(--sb-gray-hover)')}>
                                    <p className='relative z-3'>Departure</p>
                                    <p className='relative z-3 text-gray-400'>{hasChanged.has("end") ? dayjs(departureDate).format('MMM DD YYYY') : "When?"}</p>
                                </div>
                            ) }
                                
                            </Tab>

                            <Tab id="l4" className='cursor-pointer outline-none rounded-full max-w-1/3 w-full' onClick={(e) => {
                                overlayer(e, "50%", allContents.l4, '50%', 'l4')
                            }}>
                                {({hover})=> (
                                <div className={clsx('py-3 rounded-full px-7 w-full text-left', hover && 'bg-(--sb-gray-hover)')}>
                                    <p className='relative z-3'>Travelers</p>
                                    <p className='text-gray-400 relative z-3'>Add some...</p>
                                </div>      
                            )}
                                   
                            </Tab>

                            <button type='submit' className='transition-all flex items-center cursor-pointer absolute z-4 right-2 bg-linear-to-r from-(--sb-blue-200) to-100% to-(--sb-blue-300) p-3 rounded-full'>
                                    <Search width={24} height={24} stroke='white' strokeWidth={3}/>
                                    <span ref={searchSpan} className={'elongation max-w-max text-white font-bold w-max pl-1 hidden'} >Search</span>
                            </button>

                        </TabList>
                    </TabGroup>
                </form>
                
                { overlayDimensions && <div ref={overlay} className="rounded-full bg-white absolute transition-all duration-300 z-0 shadow-[3px_0_5px_rgba(87,87,87,0.3),-3px_0_20px_rgba(87,87,87,0.3)]" style={{...overlayDimensions}}> </div> }
            </div>

            {contentNeedles.content && <Content {...contentNeedles} setContent={setContentNeedles} display={contentNeedles.content ? "block" : "none"} setOverlay={setOverlayDimensions}/>}
        </div>}
        onClickAway={ () => {
                setContentNeedles({width:'0', content:'', left:'0'})
                setOverlayDimensions({width:0, height:0, left:0, top:0, display: 'none'})
                navbar.current?.classList.remove('bg-[#e2e2e254]')
            }
        }
        />
    </>
  )
}

export default SearchBar;
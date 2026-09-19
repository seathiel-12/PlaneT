import { ArrowRight, Award, ChevronDown, Globe, Heart, Lightbulb, Linkedin, Plane, Shield, Target, Twitter, Users } from "lucide-react"
import Milestone from "../../Utils/Components/Milestone/Milestone"
import { useRef } from "react";
import { useGsapCardReveal, useGsapTextReveal } from "../../Utils/Components/AnimationComponent/GsapReveal";
import Counter from "../../Utils/Components/Counter/Counter";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


function About() {
    const pageRef = useRef<HTMLDivElement>(null);
    useGsapTextReveal({ start: 'top 90%', containerRef: pageRef });
    useGsapCardReveal({ start: 'top 88%', stagger: 0.12, containerRef: pageRef });
    const stats: Record<string, { end: number; value: string; description: string; snap?: number; compact?: boolean }> = {
        Travelers: { end: 1_000_000, value: '1M+', description: 'Happy customers worldwide', snap: 1, compact: true },
        Destinations: { end: 200, value: '200+', description: 'Accross all contients', snap: 1, compact: true },
        Airlines: { end: 50, value: '50+', description: 'Partner carriers', snap: 1, compact: true },
        Rating: { end: 4.8, value: '4.8', description: 'Customer satisfaction', snap: 0.1, compact: false },
    }

    const values = [
        {
            title: 'Global Exploration',
            description: 'We believe travel opens minds and connects cultures. Our mission is to make global exploration accessible to everyone.',
            Icon: Globe
        },
        {
            title: 'Customer First',
            description: 'Every decision we make starts with our travelers. Your satisfaction and safety are our top priorities.',
            Icon: Heart
        },{
            title: 'Trust &  Security',
            description: 'We protect your data and payments with industry-leading security, so you can book with complete confidence.',
            Icon: Shield
        },{
            title: 'Innovation',
            description: 'We continuously improve our platform with cutting-edge technology to deliver seamless booking experiences.',
            Icon: Lightbulb
        },
    ]

    const founders = [
            {
                name: 'Sophie Laurent',
                title: 'Founder & CEO',
                description: 'With 15 years in the travel industry, Sophie founded PlaneT with a vision to make global travel accessible, intuitive, and enjoyable for everyone.',
                links: {
                    linkedin: 'https://www.linkedin.com/in/sophie-laurent',
                    twitter: 'https://twitter.com/sophielaurent'
                }
            },
            {
                name: 'Marcus Chen',
                title: 'Chief technology Officer',
                description: 'Marcus brings Silicon Valley innovation to travel tech. He leads our engineering team in building reliable tools that make planning and booking effortless.',
                links: {
                    linkedin: 'https://www.linkedin.com/in/marcus-chen',
                    twitter: 'https://twitter.com/marcuschen'
                },
            },
            {
                name: 'Elena Rodriguez',
                title: 'Head of Customer Experience',
                description: 'Elena ensures every traveler feels supported from booking to return. Her team provides 24/7 assistance in over 12 languages and turns feedback into better experiences.',
                links: {
                    linkedin: 'https://www.linkedin.com/in/elena-rodriguez',
                    twitter: 'https://twitter.com/elena_rodriguez'
                },
            },
            {
                name: 'James Okwonko',
                title: 'Director of Paternerships',
                description: 'James cultivates relationships with airlines and hotels worldwide, securing exclusive deals and premium experiences for PlaneT travelers.',
                links: {
                    linkedin: 'https://www.linkedin.com/in/james-okwonko',
                    twitter: 'https://twitter.com/jamesokwonko'
                },
            }
            
    ]
  return (
    <div ref={pageRef} className="text-center">

        {/* Hero */}
        <div className="pt-12 sm:pt-20 bg-linear-180 to-white">
            <div data-reveal-text className="scale-90 rounded-full px-2 py-1 bg-(--sb-gray-hover) flex items-center gap-1 font-medium w-max m-auto">
                <Plane width={15}/>
                <p>Our Story</p>
            </div>

            <div>
                <p data-reveal-text className="font-bold text-4xl sm:text-5xl lg:text-6xl mt-5 px-4 max-w-4xl playfair-display m-auto">Making Global Travel <span className="text-(--sb-blue-250) font-bold">Accessible</span></p>

                <p data-reveal-text className="text-gray-500 text-lg sm:text-2xl m-auto mt-6 sm:mt-8 px-4 max-w-3xl">PlaneT was born from a simple belief: Everyone deserves to explore the World. We're building the future of travel, one seamless booking at time.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 mt-12 sm:mt-20 py-8 sm:py-10 gap-y-6 opacity-90 bg-(--sb-gray-fade) brightness-92 shadow-xs">
                { Object.entries(stats).map(([key, stat]) => 
                    <div data-reveal-card key={key} className="text-center px-2">
                        <h2 className="text-3xl sm:text-4xl font-bold text-(--sb-blue-250)">
                            <Counter className="tabular-nums" end={stat.end} atEndValue={stat.value} snap={stat.snap} compact={stat.compact} duration={1.6} />
                        </h2>
                        <p className="font-bold text-lg sm:text-xl">{key}</p>
                        <p className="text-gray-500">{stat.description}</p>
                    </div>
                )}
            </div>
        </div>

            {/* Mission and vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 p-4 sm:p-10 py-16 sm:py-30 justify-center text-left bg-white">
            <div data-reveal-card className="py-8 sm:py-11 px-6 sm:px-9 rounded-2xl w-full bg-(--sb-blue-fade-1) shadow-lg">
                <div className="rounded-xl p-3 bg-(--sb-blue-fade-2) w-max my-3"><Target/></div>
                <h2 className="text-3xl font-bold py-3 playfair-display">Our mission</h2>
                <p className="text-gray-500 text-[1.1rem]">To democratize global travel by creating intuitive, affordable, and reliable booking experiences. We strive to remove barriers and inspire exploration, connecting people with destinations that transform perspectives.</p>
            </div>
                
            <div data-reveal-card className="py-8 sm:py-11 px-6 sm:px-10 rounded-2xl w-full bg-(--sb-orange-fade-1) shadow-lg">
                <div className="rounded-xl p-3 bg-(--sb-orange-fade-2) w-max my-3"><Lightbulb/></div>
                <h2 className="text-3xl font-bold py-3 playfair-display">Our vision</h2>
                <p className="text-gray-500 text-[1.1rem]">A world where distance is no obstacle to human connection. We envision PlaneT as the trusted companion for every traveler, making the planet feel smaller and more accessible to all.</p>
            </div>
        </div>

                {/* Values */}
        <div className="py-20 bg-gray-50">
            <p data-reveal-text className="rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max scale-90 m-auto">Our values</p>
            <h1 data-reveal-text className="text-3xl playfair-display mt-4">What We Stand For</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl px-4 m-auto gap-5 sm:gap-7 py-10">
                {
                values.map(({title, description, Icon}) => <div data-reveal-card key={title} className="flex gap-4 sm:gap-5 w-full text-left py-8 sm:py-10 px-5 sm:px-8 bg-white rounded-2xl shadow-xs">
                    <div className="w-max h-max p-2 rounded-xl bg-(--sb-icon)"><Icon className="text-(--sb-blue-250)"/></div>
                    <div>
                        <h2 className="text-xl font-bold mb-3">{title}</h2>
                        <p className="text-gray-500">{description}</p>
                    </div>
                </div>)
            }
            </div>
        </div>


        {/* Milestone */}
            <div className="py-30 bg-white">
                <p data-reveal-text className="rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max scale-90 m-auto"> Our Journey</p>
                 <h2 data-reveal-text className="text-3xl sm:text-4xl playfair-display my-8 px-4">Milestones Along the Way</h2>
                <Milestone/>
            </div>

            {/* Team */}

        <div className="m-auto py-25 bg-gray-50">
            <p data-reveal-text className="rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max scale-90 m-auto flex items-center gap-2"> 
                <Users width={17}/>
                <span>LeaderShip Team</span>
            </p>
            <h2 data-reveal-text className="text-2xl playfair-display my-4">Meet the Founders</h2>
            <p data-reveal-text className="text-gray-400">Our passionate team is dedicated to revolutionizing how the world travels.</p>

            <div className="hidden xl:grid grid-cols-4 gap-5 xl:gap-7 m-auto w-full px-4 py-10">
                    {
                        founders.map(({ name, title, description, links }) => <div data-reveal-card key={name} className="w-80 text-left pb-10 bg-white rounded-2xl shadow-xs my-7">

                            <div style={{ backgroundImage: `url(/assets/portraits/${name.split(' ')[0]}.jpg)` }} className="bg-cover w-full h-80 rounded-t-2xl"></div>

                            <div className="mt-6 px-8">
                                <h2 className="text-xl font-bold mb-1">{name}</h2>
                                <p className="text-gray-500">{title}</p>
                                <p className="text-gray-400 mt-3">{description}</p>
                                <div className="flex gap-3 mt-5">
                                    <a href={links.linkedin} className="text-gray-400 hover:text-(--sb-blue-250) transition-300"><Linkedin width={15}/></a>
                                    <a href={links.twitter} className="text-gray-400 hover:text-(--sb-blue-250) transition-300"><Twitter width={15}/></a>
                                </div>
                            </div>
                        </div>)
                    }
            </div>

            <div className="xl:hidden px-4 py-10 text-left">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1.08}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                    }}
                    className="pb-12!"
                >
                    {founders.map(({ name, title, description, links }) => (
                        <SwiperSlide key={name} className="h-auto!">
                            <article className="overflow-hidden rounded-2xl bg-white shadow-md">
                                <div
                                    role="img"
                                    aria-label={`${name} portrait`}
                                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.45)), url(/assets/portraits/${name.split(' ')[0]}.jpg)` }}
                                    className="flex h-72 items-end bg-cover bg-center p-6 text-white"
                                >
                                    <div>
                                        <p className="mb-1 text-xs font-medium uppercase tracking-[0.08em] opacity-80">Founder profile</p>
                                        <h3 className="text-2xl font-bold leading-tight">{name}</h3>
                                    </div>
                                </div>

                                <Accordion disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ChevronDown size={20} />} sx={{ px: 3, py: 1 }}>
                                        <div>
                                            <p className="font-semibold text-gray-900">{title}</p>
                                            <p className="mt-1 text-sm text-gray-400">View characteristics and story</p>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ borderTop: '1px solid #f3f4f6', px: 3, py: 3 }}>
                                        <p className="text-sm leading-6 text-gray-500">{description}</p>
                                        <div className="mt-5 flex gap-3">
                                            <a href={links.linkedin} aria-label={`${name} on LinkedIn`} className="text-gray-400 transition-colors hover:text-(--sb-blue-250)"><Linkedin width={17}/></a>
                                            <a href={links.twitter} aria-label={`${name} on Twitter`} className="text-gray-400 transition-colors hover:text-(--sb-blue-250)"><Twitter width={17}/></a>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>

    <div className="bg-white py-12 sm:py-20 px-4">
        <div data-reveal-card className="w-full max-w-3xl rounded-2xl m-auto bg-(--sb-blue-250) p-6 sm:p-10 text-white pt-10 sm:pt-12 shadow-md">
            <Award width={50} className="mx-auto mb-5 scale-220 opacity-80"/>
            <h2 className="text-3xl playfair-display mt-7">Ready to Explore with PlaneT?</h2>
            <p className="my-3 w-[95%] text-gray-300 text-[1.1rem]">Join over 1 million travelers who trust us with their journeys. Your next adventure starts here.</p>
    
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center my-5">
                <button className="flex items-center gap-2 rounded-xl bg-white py-2 px-5 text-(--sb-blue-250) hover:opacity-80 transition-500">
                    <Plane width={19}/>
                    <span >Book a Flight</span>
                </button>
                <button className="py-[7.2px] px-5 border-[0.1px] border-white rounded-xl flex gap-2 hover:bg-(--sb-gray-hover) transition-500">
                    <span>Contact Us</span>
                    <ArrowRight/>
                </button>
                    
            </div>

        </div>
    </div>
        
    </div>
  )
}

export default About
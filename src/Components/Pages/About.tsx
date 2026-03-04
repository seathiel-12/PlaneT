import { ArrowRight, Award, Globe, Heart, Lightbulb, Linkedin, Plane, Shield, Target, Twitter, Users } from "lucide-react"
import Milestone from "../../Utils/Components/Milestone/Milestone"


function About() {
    const stats = {
        Travelers: ["1M+", 'Happy customers worldwide'],
        Destinations: ["200+", 'Accross all contients'],
        Airlines: ["50+", "Partner carriers"],
        Rating: ["4.8", 'Customer satisfaction'],
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
                description: 'With 15 years in the travel industry, Sophie founded PlaneT with a vision to make global travel...',
                links: {
                    linkedin: 'https://www.linkedin.com/in/sophie-laurent',
                    twitter: 'https://twitter.com/sophielaurent'
                }
            },
            {
                name: 'Marcus Chen',
                title: 'Chief technology Officer',
                description: 'Marcus brings Silicon Valley innovation to travel tech. He leads our engineering team in building...',
                links: {
                    linkedin: 'https://www.linkedin.com/in/marcus-chen',
                    twitter: 'https://twitter.com/marcuschen'
                },
            },
            {
                name: 'Elena Rodriguez',
                title: 'Head of Customer Experience',
                description: 'Elena ensures every traveler feels supported from booking to return. Her team provides 24/7 assistance in over 12 languages...',
                links: {
                    linkedin: 'https://www.linkedin.com/in/elena-rodriguez',
                    twitter: 'https://twitter.com/elena_rodriguez'
                },
            },
            {
                name: 'James Okwonko',
                title: 'Director of Paternerships',
                description: 'James cultivates relationships with airlines and hotels worldwide, securing exclusive deals and premium experiences for PlaneT travelers...',
                links: {
                    linkedin: 'https://www.linkedin.com/in/james-okwonko',
                    twitter: 'https://twitter.com/jamesokwonko'
                },
            }
            
    ]
  return (
    <div className="text-center">

        {/* Hero */}
        <div className="pt-20 bg-linear-180 to-white">
            <div className="scale-90 rounded-full px-2 py-1 bg-(--sb-gray-hover) flex items-center gap-1 font-medium w-max m-auto">
                <Plane width={15}/>
                <p>Our Story</p>
            </div>

            <div>
                <p className="font-bold text-6xl mt-5 playfair-display w-1/2 m-auto">Making Global Travel <span className="text-(--sb-blue-250) font-bold">Accessible</span></p>

                <p className="text-gray-500 text-2xl m-auto mt-8 w-4/7">PlaneT was born from a simple belief: Everyone deserves to explore the World. We're building the future of travel, one seamless booking at time.
                </p>
            </div>

            <div className="flex mt-20 py-10 opacity-90 bg-(--sb-gray-fade) brightness-92 shadow-xs">
                { Object.entries(stats).map(([key, [value, description]]) => 
                    <div key={key} className="text-center w-1/4">
                        <h2 className="text-4xl font-bold text-(--sb-blue-250)">{value}</h2>
                        <p className="font-bold text-xl">{key}</p>
                        <p className="text-gray-500">{description}</p>
                    </div>
                )}
            </div>
        </div>

            {/* Mission and vision */}
        <div className="flex gap-10 items-center p-10 py-30 justify-center text-left bg-white">
            <div className="py-11 px-9 rounded-2xl w-125.5 bg-(--sb-blue-fade-1) shadow-lg">
                <div className="rounded-xl p-3 bg-(--sb-blue-fade-2) w-max my-3"><Target/></div>
                <h2 className="text-3xl font-bold py-3 playfair-display">Our mission</h2>
                <p className="text-gray-500 text-[1.1rem]">To democratize global travel by creating intuitive, affordable, and reliable booking experiences. We strive to remove barriers and inspire exploration, connecting people with destinations that transform perspectives.</p>
            </div>
                
            <div className="py-11 px-10 rounded-2xl w-125.5 bg-(--sb-orange-fade-1) shadow-lg">
                <div className="rounded-xl p-3 bg-(--sb-orange-fade-2) w-max my-3"><Lightbulb/></div>
                <h2 className="text-3xl font-bold py-3 playfair-display">Our vision</h2>
                <p className="text-gray-500 text-[1.1rem]">A world where distance is no obstacle to human connection. We envision PlaneT as the trusted companion for every traveler, making the planet feel smaller and more accessible to all.</p>
            </div>
        </div>

                {/* Values */}
        <div className="py-20 bg-gray-50">
            <p className="rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max scale-90 m-auto">Our values</p>
            <h1 className="text-3xl playfair-display mt-4">What We Stand For</h1>
            <div className="grid grid-cols-2 w-max m-auto gap-7 py-10">
                {
                values.map(({title, description, Icon}) => <div key={title} className="flex gap-5 w-120  text-left py-10 px-8 bg-white rounded-2xl shadow-xs">
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
                <p className="rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max scale-90 m-auto"> Our Journey</p>
                 <h2 className="text-4xl playfair-display my-8">Milestones Along the Way</h2>
                <Milestone/>
            </div>

            {/* Team */}

        <div className="m-auto py-25 bg-gray-50">
            <p className="rounded-full px-3 py-1 bg-(--sb-gray-fade-2) w-max scale-90 m-auto flex items-center gap-2"> 
                <Users width={17}/>
                <span>LeaderShip Team</span>
            </p>
            <h2 className="text-2xl playfair-display my-4">Meet the Founders</h2>
            <p className="text-gray-400">Our passionate team is dedicated to revolutionizing how the world travels.</p>

            <div className="flex gap-7 overflow-x-scroll m-auto w-max py-10">
                <div className="flex gap-7 justify-center">
                    {
                        founders.map(({ name, title, description, links }) => <div key={name} className="w-80 text-left pb-10 bg-white rounded-2xl shadow-xs my-7">

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
                
            </div>
        </div>

    <div className="bg-white py-20">
        <div className="w-1/2 rounded-2xl m-auto bg-(--sb-blue-250) p-10 text-white pt-12">
            <Award width={50} className="mx-auto mb-5 scale-220 opacity-80"/>
            <h2 className="text-3xl playfair-display mt-7">Ready to Explore with PlaneT?</h2>
            <p className="my-3 w-[95%] text-gray-300 text-[1.1rem]">Join over 1 million travelers who trust us with their journeys. Your next adventure starts here.</p>
    
            <div className="flex items-center gap-3 justify-center my-5">
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
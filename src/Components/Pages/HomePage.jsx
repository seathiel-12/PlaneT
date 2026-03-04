import React from 'react'
import Hero from '../Presentation/Hero/Hero'
import CallToAction from '../Presentation/CallToAction/CallToAction'
import AboutUs from '../Presentation/AboutUs/AboutUs'

function HomePage() {
  return (
    <div>
        <Hero/>
        <AboutUs/>
        <CallToAction/>
    </div>
  )
}

export default HomePage
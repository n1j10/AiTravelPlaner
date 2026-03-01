import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-around p-10'>
       <div>
        <h2 className='text-[#f78547] font-bold text-[35px]'>Best Destinations around the world</h2>
        <p className='text-[#14183E]  text-[40px] lg:text-[70px]   font-bold w-[450px]'>Travel, enjoy and live a new and full life </p>

        <p className='text-[#14183E] text-[20px]   w-[350px]'>Built Wicket longer admire do barton vanity itself do in it.
        Preferred to sportsmen it engrossed listening. Park gate
        sell they west hard for the.</p>

        <Button className="mt-5">
         Find out more       </Button>
       </div>

        <div className='mt-10 md:mt-0 md:w-1/2 flex justify-center'>

        
       <Image src="/hero-img.png" width={500} height={500} alt=''   className="w-[400px] md:w-[500px] lg:w-[700px] h-auto object-contain"/>
        </div>
    </div>
  )
}

export default Hero
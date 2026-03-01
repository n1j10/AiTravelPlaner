// import Image from 'next/image'
// import React from 'react'

// function Offers() {

//      const category = [
//     {
//       id: 1,
//       icon: "/icon1.png", 
//       title: "Calculated Weather",
//       desc: "Built Wicket longer admire do barton vanity itself do in it."
//     },
//     {
//       id: 2,
//       icon: "/icon2.png",
//       title: "Best Flights",
//       desc: "Engrossed listening. Park gate sell they west hard for the."
//     },
//     {
//       id: 3,
//       icon: "/icon3.png",
//       title: "Local Events",
//       desc: "Barton vanity itself do in it. Preferred to men it engrossed listening."
//     },
//     {
//       id: 4,
//       icon: "/icon4.png",
//       title: "Customization",
//       desc: "We deliver outsourced aviation services for military customers"
//     }
//   ]
//   return (
//     <div className=' max-w-6xl m-auto  flex flex-col items-center justify-center mt-10'>
//         <h2 className='text-[45px] text-[#f78547]'>We Offer Best Services</h2>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

//             {category?.map((cat,index)=>(
//                 <div key={index} className='flex flex-col items-center text-center p-4 rounded-lg hover:shadow-lg bg-[#f78547] transition duration-300  '>
//                     <Image  src={cat.icon} width={60} height={60} alt=''/>
//                     <h3 className='mt-4 font-semibold text-lg  mb-5  text-white'>{cat.title}</h3>

//                <p className="mt-2 text-gray-500 text-sm text-white">{cat.desc}</p>

//                 </div>
//             ))}

//         </div>

//     </div>
//   )
// }

// export default Offers
"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Header() {

 

  const [isOpen,setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const { user } = useUser()

  useEffect(()=>{
    const syncUser = async () => {
      if(user?.id && user?.primaryEmailAddress?.emailAddress){
        try {
          const response = await fetch("/api/user",{
             method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              userId: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName || user.firstName || 'User',
            }),
          })

          if (response.ok) {
            const userData = await response.json()
            setUserRole(userData.role)
          }
        } catch (error) {
          console.error('Error syncing user:', error)
        }
      }else {
        // Reset role when user logs out
        setUserRole(null)
      }
    }
    syncUser()
  },[user])

  const isAdmin = userRole === 'admin'
  const isUser = userRole === 'user'

  return (
    <>
   
    <div className='mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-md '>
       
           <div className='flex-shrink-0"'> 

                       <Link  href="/">
    <Image 
             src="/logo.png" 
             width={200} 
             height={200} 
             alt="Travel booking logo"
             className='w-50 h-30 object-cover' />
            </Link>

           </div>


           <div className='sm:hidden'>
            <button  className="text-gray-800 text-2xl focus:outline-none" 
            onClick={()=> setIsOpen(!isOpen)}>

              {/* web menu  */}

              {isOpen ? "✖" : "☰"}

            </button>
           </div>

           <div className='hidden sm:flex gap-6'>
           <Link className='nav-link'  href="/destinationsList">Destination</Link>
            <Link  className='nav-link'  href="/ai">Ask AI</Link>

             {isUser&&  (
            <Link className='nav-link' href="/bookings">My Booking</Link>
          )}

          {/* is admin  */}
          {isAdmin && (
            <Link className='nav-link' href="/admin/add-destination">Add Destination</Link>
          )}
             {/* <Link className='nav-link'  href="">Testimonial</Link> */}
                 {/* clerk check user */}


            {!user ? (
            <>
            <SignInButton mode='modal'>
              <Button>Signin</Button>
            </SignInButton>

           <SignUpButton mode='modal' >
            <Button >Signup</Button>
           </SignUpButton>
            </>
           ):(
         <UserButton afterSignOutUrl="/" />
           )}
          
           </div> 
    </div>


         {/* mobile web menu */}
    {isOpen && (
        <nav className="sm:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow-md">
          <Link className="nav-link block" href="">Destination</Link>
          <Link className="nav-link block" href="">Services</Link>
          <Link className="nav-link block" href="">Booking</Link>
          <Link className="nav-link block" href="">Testimonial</Link>
        </nav>
      )}

     </>
  )
}

export default Header

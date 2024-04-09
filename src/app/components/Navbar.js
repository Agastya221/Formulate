import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex justify-between p-3  ml-2 mr-2 shadow-lg'>
       
       <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
          src="/next.svg"
          alt="Next.js Logo"
          width={100}
          height={20}
          priority
        />
      <li className='space-x-6 list-none text-purple-400 cursor-pointer font-medium'>
        <Link href='/Home'>Home</Link>
        <Link href='/profile'>Profile</Link>
        <Link href='/Login'>Pricing</Link>
        <Link href='/Login'>Careers</Link>
      </li>
      <li className='space-x-6  list-none cursor-pointer font-medium'>
        <Link className='text-purple-400 hover:text-purple-200'  href='/login'>Log in</Link>
        <Link className='rounded bg-purple-600 py-2 px-4 hover:bg-purple-700 transition duration-200' href='/signup'>Sign up</Link>
        
      </li>
    </div>
  )
}

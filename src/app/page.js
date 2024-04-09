import Image from 'next/image'
import Navbar from './components/Navbar'
import Link from 'next/link'
export default function Home() {
  return ( 
    <div> 
      <Navbar />
      <div className='flex h-screen justify-center items-center '>
        <div className="relative cursor-pointer group">  
        <div className="  absolute px-8 py-6 -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600  rounded-lg blur opacity-75  group-hover:opacity-100 transition duration-300  ">
        </div>
        <Link href="/adduser">
        <h1 className='relative flex items-center  bg-black rounded-lg shadow-lg px-8 py-4 leading-none hover:text-grey-700'>
          
          <span className=' flex items-center mr-2 '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 " >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
        </span>Start Adding User here</h1>
        </Link>
        </div>
         
      </div>
    </div>
    
  )
}

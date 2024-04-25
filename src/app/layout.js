import StoreProvider from './StoreProvider'
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Formulate',
  description: 'Formulate is a versatile data management platform that empowers users to effortlessly create, edit, and delete form entries with precision and ease. Seamlessly integrated with email functionality',
}

export default function RootLayout({ children }) {
  return (

      <html lang="en">
      <body className={inter.className}>
      
       <div className='h-screen width: auto; box-border '>
        <StoreProvider>
        {children}
        </StoreProvider>
        </div> 
        </body>
      </html>
  )
}

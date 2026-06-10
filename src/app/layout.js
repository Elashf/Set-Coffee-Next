
import './globals.css'
import { Inter } from 'next/font/google'
import AOSInit from '@/utils/aos'
import ScrollToTop from '@/utils/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'قهوه ست | رستری و فروشگاه تخصصی قهوه',
  description: 'Ela coffee project with next.js',
  icons:{
    icon: "/images/about.PNG"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
       <AOSInit />
        {children}
        <ScrollToTop />
        </body>
    </html>
  )
}

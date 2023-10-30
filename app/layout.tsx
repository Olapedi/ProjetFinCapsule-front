import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GlobalNavbar from '@/components/common/globalnavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neoney',
  description: 'Business social network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ReduxProvider>
            <GlobalNavbar />
            {children}
          </ReduxProvider>
        </body>
    </html>
  )
}

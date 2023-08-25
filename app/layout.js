'use client'
import { CartContextProvider } from '@/components/CartContext';
import Metadata from '@/components/MetaData';
import { Inter, Roboto } from 'next/font/google'
import { createGlobalStyle } from 'styled-components'

export const roboto = Roboto({
  subsets: ['cyrillic'],
  weight: '500'
})

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding:0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <GlobalStyles />
      <Metadata />
      <CartContextProvider>
      <body className={roboto.className}>{children}</body>
      </CartContextProvider>
      
    </html>
    </>
  )
}

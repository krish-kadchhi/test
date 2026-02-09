import React from 'react'

import { CartThingsProvider } from './CartThings'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <CartThingsProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </CartThingsProvider>
    </ThemeProvider>
  )
}

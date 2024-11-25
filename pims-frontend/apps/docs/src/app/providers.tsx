'use client'

import { AppStore, makeStore } from '@pims-frontend/docs/lib/store'
import { MuiThemeProvider } from '@pims-frontend/ui/components/providers/MuiThemeProvider'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import * as React from 'react'
import { Provider } from 'react-redux'

function ReduxProvider(props: React.PropsWithChildren) {
  const storeRef = React.useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

function MuiThemeProviderWrapper(props: React.PropsWithChildren) {
  const { theme } = useTheme()
  return <MuiThemeProvider mode={theme}>{props.children}</MuiThemeProvider>
}

export default function Providers(props: React.PropsWithChildren) {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MuiThemeProviderWrapper>{props.children}</MuiThemeProviderWrapper>
      </ThemeProvider>
    </ReduxProvider>
  )
}

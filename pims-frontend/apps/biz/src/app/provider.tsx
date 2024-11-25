'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import React from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '../lib/store'
import { MuiThemeProvider } from '@pims-frontend/ui/components/providers/MuiThemeProvider'
import { NextIntlClientProvider, useMessages } from 'next-intl'

interface IProvidersProps {
  children: React.ReactNode
  locale: string
  messages: ReturnType<typeof useMessages>
}

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

export default function Providers({
  children,
  locale,
  messages,
}: IProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReduxProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MuiThemeProviderWrapper>{children}</MuiThemeProviderWrapper>
        </ThemeProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  )
}

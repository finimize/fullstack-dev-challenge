/* eslint-disable no-console */
import React, { FC, useEffect } from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Container } from '@chakra-ui/react'
import { AppProvider } from './store'
import { DefaultLayout } from './components/layouts/Default'
import { theme } from './theme'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server

export const App: FC = () => (
    <AppProvider>
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout />
        </ChakraProvider>
    </AppProvider>
)

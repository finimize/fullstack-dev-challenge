import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Savings } from './containers/Savings/Savings'
import theme from './theme'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <Savings />
        </ChakraProvider>
    )
}

export default App

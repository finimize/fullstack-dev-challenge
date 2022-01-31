import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import SavingsProjections from './containers/SavingsProjections'
import theme from './theme'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            {/* We've just bundled everything into one file here to 
            get you started!*/}
            <SavingsProjections />
        </ChakraProvider>
    )
}

export default App

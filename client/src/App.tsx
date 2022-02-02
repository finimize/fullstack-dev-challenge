import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import SavingsProjections from './containers/SavingsProjections'
import theme from './theme'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <SavingsProjections />
        </ChakraProvider>
    )
}

export default App

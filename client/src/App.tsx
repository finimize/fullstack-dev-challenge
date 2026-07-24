import './App.css'
import {
    ChakraProvider,
    Container,
    createSystem,
    defaultConfig,
    defineConfig,
} from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import SavingsCalculator from './components/SavingsCalculator'
import theme from './theme'

// Chakra v3 registers design tokens via a "system". We expose the scaffold's
// brand colours as tokens so style props like `bg="blue700"` keep resolving.
const toColorTokens = (colors: Record<string, string>) =>
    Object.fromEntries(Object.entries(colors).map(([name, value]) => [name, { value }]))

const config = defineConfig({
    theme: {
        tokens: {
            colors: toColorTokens(theme.colors),
        },
    },
})

const system = createSystem(defaultConfig, config)

function App() {
    return (
        <ChakraProvider value={system}>
            <DefaultLayout>
                <Container maxW="6xl" py={8}>
                    <SavingsCalculator />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App

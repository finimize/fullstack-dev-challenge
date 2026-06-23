import './App.css'
import {
    ChakraProvider,
    Container,
    createSystem,
    defaultConfig,
    defineConfig,
} from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'

// Chakra v3 registers design tokens via a "system". We expose the scaffold's
// brand colours as tokens so style props like `bg="blue700"` keep resolving.
const toColorTokens = (colors: Record<string, string>) =>
    Object.fromEntries(
        Object.entries(colors).map(([name, value]) => [name, { value }])
    )

const config = defineConfig({
    theme: {
        tokens: {
            colors: toColorTokens(theme.colors),
        },
    },
})

const system = createSystem(defaultConfig, config)

// Note: This is just for example purposes
// should be replaced with real data from the backend
const tempData = {
    xAxis: ['0', '1', '2', '3', '4', '5'],
    yAxis: ['100', '150', '180', '210', '240', '350'],
}

function App() {
    return (
        <ChakraProvider value={system}>
            {/* We've just bundled everything into one file here to 
            get you started!*/}
            <DefaultLayout>
                <Container pt={6}>
                    <LineChart
                        title="Savings Over time"
                        xAxisData={tempData.xAxis}
                        yAxisData={tempData.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App

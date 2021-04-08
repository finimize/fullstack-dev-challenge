import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import TextField from './components/TextField'
import RangeSlider from './components/RangeSlider'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
    ],
    yAxis: [
        100,
        150,
        180,
        210,
        240,
        350,
        360,
        370,
        380,
        390,
        391,
        392,
        392,
        395,
        395,
        396,
        400,
        404,
        407,
        409,
        410,
        411,
        413,
        414,
        418,
        420,
        423,
        425,
        427,
        430,
        431,
        432,
        435,
        437,
        439,
        492,
        500,
        501,
        510,
        511,
        512,
        524,
        526,
        600,
        700,
        900,
        910,
        911,
        1000,
        1050,
    ],
}

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
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
                    <TextField
                        setText={() => {}}
                        type={'text'}
                        timeoutValue={200}
                        placeholder={'Initial Deposit'}
                    />
                    <RangeSlider min={0} max={150} setValue={() => {}} defaultValue={0} />
                    <RangeSlider min={0} max={100} setValue={() => {}} defaultValue={0} />
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App

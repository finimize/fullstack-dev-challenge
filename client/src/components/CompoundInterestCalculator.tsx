import React, { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Container, Grid, GridItem, Input } from '@chakra-ui/react';
import DefaultLayout from './layouts/Default';
import LineChart from './LineChart';
import theme from '../theme';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react';


const defaultTheme = extendTheme(theme);

interface GraphData {
    yAxis: Array<number>,
    xAxis: Array<number>,
};

function CompoundInterestCalculator() {
    const [data, setData] = useState<GraphData>({
        xAxis: [],
        yAxis: [],
    });
    const [formParams, setFormParams] = useState({
        initialSavings: 1000,
        monthlySavings: 200,
        interestRate: 1,
        periodInYears: 50,
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setFormParams({
            ...formParams,
            [event.target.name]: event.target.value
        })
    };

    function handleSliderChangeEnd(value: number): void {
        setFormParams({
            ...formParams,
            interestRate: value
        })
    };

    useEffect(() => {
        fetch(`http://localhost:3001/calculate-savings-over-time?initialDeposit=${encodeURIComponent(formParams.initialSavings)}&monthlySavings=${encodeURIComponent(formParams.monthlySavings)}&interestRate=${encodeURIComponent(formParams.interestRate)}&periodInYears=${encodeURIComponent(formParams.periodInYears)}`)
            .then((res) => res.json())
            .then((data) => {
                setData({
                    xAxis: Array.from({length: data.monthlySavings.length}, (v, i) => i),
                    yAxis: data.monthlySavings,
                })
            })
    }, [formParams]);
    return (
        <ChakraProvider theme={defaultTheme}>
            {/* We've just bundled everything into one file here to 
            get you started!*/}
            <DefaultLayout>
                <Container pt={6}>
                    <LineChart
                        title="Savings Over time"
                        xAxisData={data.xAxis}
                        yAxisData={data.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
                <Container pt={6}>
                    <FormControl id="initial-savings">
                        <FormLabel>Initial Savings</FormLabel>
                        <Input type="number" name="initialSavings" value={formParams.initialSavings} onChange={handleInputChange} />
                        <FormHelperText>Your one time initial savings</FormHelperText>
                    </FormControl>
                    <FormControl id="monthly-savings" >
                        <FormLabel>Monthly Savings</FormLabel>
                        <Input type="number" name="monthlySavings" value={formParams.monthlySavings} onChange={handleInputChange} />
                        <FormHelperText>How much do you wish to save, each month?</FormHelperText>
                    </FormControl>
                    <FormControl id="interest-rate">
                        <FormLabel>Interest Rate</FormLabel>
                        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                            <GridItem colSpan={1}>
                                <Input type="number" name="interestRate" value={formParams.interestRate} onChange={handleInputChange} />
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Slider aria-label="interest-rate-slider" name="interestRate" value={formParams.interestRate} onChange={handleSliderChangeEnd}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </GridItem>
                        </Grid>
                        <FormHelperText>What is the interest rate?</FormHelperText>
                    </FormControl>
                </Container>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default CompoundInterestCalculator;

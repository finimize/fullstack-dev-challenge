import React, { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Container, Grid, GridItem, NumberInput, NumberInputField } from '@chakra-ui/react';
import DefaultLayout from './layouts/Default';
import LineChart from './LineChart';
import theme from '../theme';
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react';


const defaultTheme = extendTheme(theme);

const baseURL = "http://localhost:3001/calculate-savings-over-time?";

interface GraphData {
    yAxis: Array<number>,
    xAxis: Array<number>,
};

interface FormParams {
    initialDeposit: number,
    monthlySavings: number,
    interestRate: number,
    periodInYears: number,
}

export function areFormParamsValid(formParams: FormParams): boolean {
    let key: keyof typeof formParams;
    for (key in formParams) {
        if ((isNaN(formParams[key]))) {
            return false;
        }
        let strVal = String(formParams[key])
        if (strVal[strVal.length-1] === ".") {
            return false;
        }
        if (!formParams[key]) {
            return false;
        }
    }
    return true;
};

export function generateQuery(baseURL: string, formParams: FormParams): string {
    let query = "";
    let key: keyof typeof formParams;
    for (key in formParams) {
        query += `${key}=${encodeURIComponent(formParams[key])}&`
    }

    return baseURL + query.slice(0, -1);
}

export function CompoundInterestCalculator() {
    const [data, setData] = useState<GraphData>({
        xAxis: [],
        yAxis: [],
    });

    const [formParams, setFormParams] = useState({
        initialDeposit: 1000,
        monthlySavings: 200,
        interestRate: 1,
        periodInYears: 50,
    });

    function handleInputChange(fieldName: string, value: string | number): void {
        setFormParams({
            ...formParams,
            [fieldName]: value
        })
    };

    useEffect(() => {
        if (!areFormParamsValid(formParams)) {
            return;
        }
        const query = generateQuery(baseURL, formParams);
        fetch(query)
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
                    <FormControl>
                        <FormLabel>Initial Savings</FormLabel>
                        <NumberInput value={formParams.initialDeposit} onChange={(value) => handleInputChange("initialDeposit", value)}>
                            <NumberInputField />
                        </NumberInput>
                        <FormHelperText>Your one time initial savings</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Monthly Savings</FormLabel>
                        <NumberInput value={formParams.monthlySavings} onChange={(value) => handleInputChange("monthlySavings", value)}>
                            <NumberInputField />
                        </NumberInput>
                        <FormHelperText>How much do you wish to save, each month?</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Interest Rate</FormLabel>
                        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                            <GridItem colSpan={1}>
                                <NumberInput value={formParams.interestRate} step={0.1} min={0} max={100} onChange={(value) => handleInputChange("interestRate", value)}>
                                    <NumberInputField />
                                </NumberInput>
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Slider aria-label="interest-rate-slider" step={0.1} value={formParams.interestRate} onChange={(value) => handleInputChange("interestRate", value)}>
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


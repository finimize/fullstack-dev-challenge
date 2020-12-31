import React, { useState, useEffect } from 'react'
import { Container, Heading, VStack, Progress } from '@chakra-ui/react'

import Slider from '../../components/Slider'
import LineChart from '../../components/LineChart'
import DefaultLayout from '../../components/layouts/Default'
import { NumberInput } from '../../components/NumberInput'
import { useFetchProjections } from '../../api'
import { getFormValidator, isGTE, useFormValues } from '../../form'
import { useDebouncedFn } from '../../utils'

export const INITIAL_FORM_VALUES = {
    initialSavingsAmount: '50000',
    monthlyDeposit: '100',
}
const INITIAL_INTEREST_RATE = 2
const YEAR_RANGE_TO_FETCH = [0, 50] as [number, number]

type FormValues = typeof INITIAL_FORM_VALUES

const FORM_VALIDATORS = getFormValidator({
    initialSavingsAmount: [
        {
            message: 'Initial savings amount should be equal or greater than zero',
            condition: (val) => !isGTE(val, 0),
        },
        {
            message: 'Initial savings amount too big',
            condition: (val) => !Number.isSafeInteger(Number(val)),
        },
    ],
    monthlyDeposit: [
        {
            message: 'Monthly deposit amount should be equal or greater than zero',
            condition: (val) => !isGTE(val, 0),
        },
        {
            message: 'Monthly deposit amount too big',
            condition: (val) => !Number.isSafeInteger(Number(val)),
        },
    ],
})

export const Savings = () => {
    const [interestRatePercentage, setInterestRatePercentage] = useState(INITIAL_INTEREST_RATE)

    const { getProjections, loading, projections, error } = useFetchProjections(
        interestRatePercentage,
        YEAR_RANGE_TO_FETCH
    )

    useEffect(() => {
        const { initialSavingsAmount, monthlyDeposit } = INITIAL_FORM_VALUES
        getProjections(initialSavingsAmount, monthlyDeposit)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const debouncedGetProjections = useDebouncedFn(getProjections)

    const onFormUpdate = (
        isFormValid: boolean,
        { initialSavingsAmount, monthlyDeposit }: FormValues
    ) => {
        if (isFormValid) {
            debouncedGetProjections(initialSavingsAmount, monthlyDeposit)
        }
    }

    const { formValues, getErrorMessage, updateFormValue, validationErrors } = useFormValues(
        INITIAL_FORM_VALUES,
        FORM_VALIDATORS,
        onFormUpdate
    )

    const formIsValid = !validationErrors.length
    const yearlySavingsProjections = formIsValid ? projections : projections.map(() => 0)

    return (
        <DefaultLayout>
            <Progress size="xs" value={0} isIndeterminate={loading} />
            <Container pt={6}>
                <VStack spacing={4}>
                    <Heading as="h1" textAlign="center">
                        Interest Rate Calculator
                    </Heading>
                    <NumberInput
                        label="Initial Savings Amount [£]"
                        placeholder="5000"
                        min={0}
                        step={2000}
                        value={formValues['initialSavingsAmount']}
                        onChange={updateFormValue('initialSavingsAmount')}
                        errorMessage={getErrorMessage('initialSavingsAmount')}
                        data-testid="initial-savings-input-wrapper"
                    />
                    <NumberInput
                        label="Monthly Deposit [£]"
                        placeholder="100"
                        min={0}
                        step={100}
                        value={formValues['monthlyDeposit']}
                        onChange={updateFormValue('monthlyDeposit')}
                        errorMessage={getErrorMessage('monthlyDeposit')}
                        data-testid="monthly-deposit-input-wrapper"
                    />
                    <Slider
                        label={`Yearly Interest Rate (${interestRatePercentage}%)`}
                        defaultValue={2}
                        min={0}
                        max={15}
                        value={interestRatePercentage}
                        onChange={setInterestRatePercentage}
                        data-testid="interest-rate-slider-wrapper"
                    />
                    <LineChart
                        title="Savings Over Time"
                        xAxisData={yearlySavingsProjections.map((_, idx) => idx)}
                        yAxisData={yearlySavingsProjections}
                        xLabel="Years"
                        yLabel="Amount [£]"
                        loading={loading}
                        error={!formIsValid || !!error}
                    />
                </VStack>
            </Container>
        </DefaultLayout>
    )
}

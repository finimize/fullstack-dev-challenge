import React, { useState, useEffect } from 'react'
import { Container, Heading, VStack, Progress } from '@chakra-ui/react'

import Slider from '../../components/Slider'
import LineChart from '../../components/LineChart'
import DefaultLayout from '../../components/layouts/Default'
import { NumberInput } from '../../components/NumberInput'
import { useFetchProjections } from '../../api'
import { useFormValues } from '../../form'
import { useDebouncedFn } from '../../utils'

import {
    INITIAL_FORM_VALUES,
    INITIAL_INTEREST_RATE,
    YEAR_RANGE_TO_FETCH,
    FORM_VALIDATORS,
    FormValues,
} from './form'

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

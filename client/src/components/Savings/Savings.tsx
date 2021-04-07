import React, { FC, useContext, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { AppContext } from '../../store'
import { UPDATE_DATA, PREVIOUS_PAGE } from '../../store/types'
import { DataValueInterface } from '../../store/store.interface'
import { PageControls } from '../PageControls'
import { SavingsControls } from '../SavingsControls'
import { SavingsChart } from '../SavingsChart'
import { postCalculation } from '../../api'

export const Savings: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const { calculations } = state
    const { calculatorMode } = state
    const isSimpleMode = calculatorMode === 'Simple'

    useEffect(() => {
        const monthlyContributionsParam = isSimpleMode
            ? 0
            : Number(calculations.monthlyContributions.value)
        const compoundFreqParam = isSimpleMode ? 1 : calculations.compoundingFrequency
        postCalculation(
            Number(calculations.initialSavings.value),
            Number(calculations.interestRate),
            compoundFreqParam,
            monthlyContributionsParam,
        )
            .then((data: DataValueInterface) =>
                dispatch({
                    type: UPDATE_DATA,
                    payload: {
                        value: { ...data },
                        error: '',
                        isLoading: false,
                    },
                }),
            )
            .catch((err) =>
                dispatch({
                    type: UPDATE_DATA,
                    payload: {
                        value: null,
                        error: String(err),
                        isLoading: false,
                    },
                }),
            )
    }, [
        calculations.interestRate,
        calculations.initialSavings.value,
        calculations.monthlyContributions.value,
        calculations.compoundingFrequency,
    ])

    const prevPage = () => dispatch({ type: PREVIOUS_PAGE })

    return (
        <Box>
            <SavingsControls />
            <SavingsChart />
            <PageControls prevPage={prevPage} nextPage={() => null} />
        </Box>
    )
}

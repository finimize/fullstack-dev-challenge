import React from 'react'
import { screen } from '@testing-library/react'
import { renderForTest } from '../../test'

import SavingsSelectors from './SavingsSelectors'

describe('SavingsSelectors', () => {
    it('renders successfully, sliders are visible and handle change is initialised correctly', () => {
        const handleChangeInitMock = jest.fn()
        const props = {
            savingsInputs: {
                initialSavings: 1000,
                monthlyDeposit: 10,
                interestRate: 2,
            },
            handleChange: handleChangeInitMock,
        }

        renderForTest(<SavingsSelectors {...props} />)

        expect(screen.getByLabelText('slider-savings')).toBeInTheDocument()
        expect(screen.getByLabelText('slider-monthly')).toBeInTheDocument()
        expect(screen.getByLabelText('slider-interest')).toBeInTheDocument()
        expect(handleChangeInitMock).toHaveBeenCalledTimes(3)
        expect(handleChangeInitMock).toHaveBeenCalledWith('initialSavings')
        expect(handleChangeInitMock).toHaveBeenCalledWith('monthlyDeposit')
        expect(handleChangeInitMock).toHaveBeenCalledWith('interestRate')
    })
})

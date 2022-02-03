import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderForTest } from '../../test'

import SliderWithOverride from './SliderWithOverride'

describe('SliderWithOverride', () => {
    const onChangeMock = jest.fn()
    const props = {
        value: 1000,
        label: 'Initial savings ',
        valueText: '£1,000.00',
        name: 'initialSavings',
        min: 0,
        max: 10000,
        step: 1000,
        onChange: onChangeMock,
        ariaLabel: 'slider-savings',
    }

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('renders successfully, slider, amount and edit icon are visible, number input is not', () => {
        renderForTest(<SliderWithOverride {...props} />)

        expect(screen.getByLabelText('slider-savings')).toBeInTheDocument()
        expect(screen.getByText('£1,000.00')).toBeInTheDocument()
        expect(screen.getByTestId('edit-slider-savings')).toBeInTheDocument()
        expect(screen.queryByRole('spinbutton')).toBeNull()
    })

    it('pressing edit icon reveals the number input with correct value and then clicking again restores the slider', () => {
        renderForTest(<SliderWithOverride {...props} />)

        userEvent.click(screen.getByTestId('edit-slider-savings'))
        expect(screen.getByRole('spinbutton')).toHaveValue('1000')
        expect(screen.queryByLabelText('slider-savings')).toBeNull()

        userEvent.click(screen.getByTestId('edit-slider-savings'))
        expect(screen.getByLabelText('slider-savings')).toBeInTheDocument()
        expect(screen.queryByRole('spinbutton')).toBeNull()
    })
})

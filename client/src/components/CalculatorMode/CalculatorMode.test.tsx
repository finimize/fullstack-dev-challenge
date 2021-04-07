import React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialState } from '../../store/initialState'
import { customRender } from '../../utils/test-utils'
import { CalculatorMode } from './CalculatorMode'

afterEach(cleanup)

describe('component/CalculatorMode', () => {
    it('renders Calculator Mode component', () => {
        const { render } = customRender(<CalculatorMode />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('allows calculator modes to be changed to advacned mode', () => {
        const { render, dispatchMock } = customRender(<CalculatorMode />, {})
        const { getByText, getByTestId, container } = render
        expect(getByText('Simple')).toBeInTheDocument()
        const advancedbutton = getByTestId('Advanced')
        const simplebutton = getByTestId('Simple')
        // Check initial view
        expect(simplebutton).toHaveAttribute('checked')
        expect(advancedbutton).not.toBeChecked()
        // Check Advanced button is working
        fireEvent.click(advancedbutton)
        expect(dispatchMock).toHaveBeenCalledWith({ payload: 'Advanced', type: 'TOGGLE_MODE' })
        expect(advancedbutton).toBeChecked()
        expect(container).toMatchSnapshot()
    })

    it('allows calculator modes to be changed to simple mode', () => {
        const { render, dispatchMock } = customRender(<CalculatorMode />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        const { getByText, getByTestId, container } = render
        expect(getByText('Simple')).toBeInTheDocument()
        const advancedbutton = getByTestId('Advanced')
        const simplebutton = getByTestId('Simple')
        // Check initial view
        expect(simplebutton).not.toHaveAttribute('checked')
        expect(advancedbutton).toBeChecked()
        // Check Advanced button is working
        fireEvent.click(simplebutton)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, { payload: 'Simple', type: 'TOGGLE_MODE' })
        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: 'UPDATE_CALCULATIONS',
            field: 'monthlyContributions',
            payload: {
                value: '0',
            },
        })
        expect(dispatchMock).toHaveBeenNthCalledWith(3, {
            payload: 'annually',
            type: 'TOGGLE_COMPOUNDING_FREQUENCY',
        })
        expect(dispatchMock).toHaveBeenCalledTimes(3)
        expect(simplebutton).toBeChecked()
        expect(container).toMatchSnapshot()
    })
    it('allows to hit', () => {
        const { render, dispatchMock } = customRender(<CalculatorMode />, {
            store: { ...initialState, currentPage: 2 },
        })
        const { getByTestId } = render
        const prevbutton = getByTestId('previous-button')
        const nextbutton = getByTestId('next-button')
        userEvent.click(prevbutton)
        expect(dispatchMock).toHaveBeenCalledWith({ type: 'PREVIOUS_PAGE' })
        userEvent.click(nextbutton)
        expect(dispatchMock).toHaveBeenCalledWith({ type: 'NEXT_PAGE' })
    })
})

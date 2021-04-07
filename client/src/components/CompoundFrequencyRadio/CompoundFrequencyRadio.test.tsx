import React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { CompoundFrequencyRadio } from './CompoundFrequencyRadio'

afterEach(cleanup)

describe('component/CompoundFrequencyRadio', () => {
    it('renders Calculator Mode component', () => {
        const { render } = customRender(<CompoundFrequencyRadio />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('allows compounding frequency mode to be changed', () => {
        const { render, dispatchMock } = customRender(<CompoundFrequencyRadio />, {})
        const { getByTestId } = render
        const annuallybutton = getByTestId('cfr-annually')
        const monthlybutton = getByTestId('cfr-monthly')
        const quarterlybutton = getByTestId('cfr-quarterly')
        // Check initial view
        expect(annuallybutton).toBeChecked()
        expect(monthlybutton).not.toBeChecked()
        expect(quarterlybutton).not.toBeChecked()
        // // Check monthly button is working
        fireEvent.click(monthlybutton)
        expect(dispatchMock).toHaveBeenCalledWith({
            payload: 'monthly',
            type: 'TOGGLE_COMPOUNDING_FREQUENCY',
        })
        expect(monthlybutton).toBeChecked()
        fireEvent.click(quarterlybutton)
        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            payload: 'quarterly',
            type: 'TOGGLE_COMPOUNDING_FREQUENCY',
        })
        expect(quarterlybutton).toBeChecked()
    })

    // it('allows calculator modes to be changed to simple mode', () => {
    //     const { render, dispatchMock } = customRender(<CalculatorMode />, {
    //         store: { ...initialState, calculatorMode: 'Advanced' },
    //     })
    //     const { getByText, getByTestId, container } = render
    //     expect(getByText('Simple')).toBeInTheDocument()
    //     const advancedbutton = getByTestId('Advanced')
    //     const simplebutton = getByTestId('Simple')
    //     // Check initial view
    //     expect(simplebutton).not.toHaveAttribute('checked')
    //     expect(advancedbutton).toBeChecked()
    //     // Check Advanced button is working
    //     fireEvent.click(simplebutton)
    //     expect(dispatchMock).toHaveBeenNthCalledWith(1, { payload: 'Simple', type: 'TOGGLE_MODE' })
    //     expect(dispatchMock).toHaveBeenNthCalledWith(2, {
    //         type: 'UPDATE_CALCULATIONS',
    //         field: 'monthlyContributions',
    //         payload: {
    //             value: '0',
    //         },
    //     })
    //     expect(dispatchMock).toHaveBeenNthCalledWith(3, {
    //         payload: 'annually',
    //         type: 'TOGGLE_COMPOUNDING_FREQUENCY',
    //     })
    //     expect(dispatchMock).toHaveBeenCalledTimes(3)
    //     expect(simplebutton).toBeChecked()
    //     expect(container).toMatchSnapshot()
    // })
    // it('allows to hit', () => {
    //     const { render, dispatchMock } = customRender(<CalculatorMode />, {
    //         store: { ...initialState, currentPage: 2 },
    //     })
    //     const { getByTestId } = render
    //     const prevbutton = getByTestId('previous-button')
    //     const nextbutton = getByTestId('next-button')
    //     userEvent.click(prevbutton)
    //     expect(dispatchMock).toHaveBeenCalledWith({ type: 'PREVIOUS_PAGE' })
    //     userEvent.click(nextbutton)
    //     expect(dispatchMock).toHaveBeenCalledWith({ type: 'NEXT_PAGE' })
    // })
})

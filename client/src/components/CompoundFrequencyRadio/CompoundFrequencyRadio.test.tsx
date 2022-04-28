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
})

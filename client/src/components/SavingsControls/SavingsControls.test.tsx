import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialState } from '../../store/initialState'
import { customRender } from '../../utils/test-utils'
import { SavingsControls } from './SavingsControls'

afterEach(cleanup)

describe('component/Savings Controls', () => {
    it('renders Savings Controls  component', () => {
        const { render } = customRender(<SavingsControls />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('renders correct inputs for simple mode', () => {
        const { render } = customRender(<SavingsControls />, {})
        const { queryByTestId } = render
        expect(queryByTestId('input-Initial Deposit')).toBeInTheDocument()
        expect(queryByTestId('input-Monthly Contributions')).not.toBeInTheDocument()
        expect(queryByTestId('interest-rate-slider')).toBeInTheDocument()
        expect(queryByTestId('cfr-radio-input')).not.toBeInTheDocument()
    })
    it('renders correct inputs for advance mode', () => {
        const { render } = customRender(<SavingsControls />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        const { queryByTestId } = render
        expect(queryByTestId('input-Initial Deposit')).toBeInTheDocument()
        expect(queryByTestId('input-Monthly Contributions')).toBeInTheDocument()
        expect(queryByTestId('interest-rate-slider')).toBeInTheDocument()
        expect(queryByTestId('cfr-radio-input')).toBeInTheDocument()
    })

    it('handles iniital deposit input correctly', () => {
        const { render, dispatchMock } = customRender(<SavingsControls />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        const { getByTestId } = render
        const initialDeposit = getByTestId('input-Initial Deposit')
        // Testing initial Deposit
        userEvent.type(initialDeposit, '2')
        expect(dispatchMock).toHaveBeenCalledWith({
            field: 'initialSavings',
            payload: { error: '', value: '102' },
            type: 'UPDATE_CALCULATIONS',
        })
        expect(initialDeposit).toHaveValue('102')
        userEvent.type(initialDeposit, '{backspace}{backspace}{backspace}')
        expect(initialDeposit).toBeInvalid()
    })

    it('handles monthly contribution input correctly', () => {
        const { render, dispatchMock } = customRender(<SavingsControls />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        const { getByTestId } = render
        const montlyContribution = getByTestId('input-Monthly Contributions')
        // Testing initial Deposit
        userEvent.type(montlyContribution, '5')
        expect(dispatchMock).toHaveBeenCalledWith({
            field: 'monthlyContributions',
            payload: { error: '', value: '05' },
            type: 'UPDATE_CALCULATIONS',
        })
        expect(montlyContribution).toHaveValue('05')
        userEvent.type(montlyContribution, '{backspace}{backspace}')
        expect(montlyContribution).toBeInvalid()
    })
})

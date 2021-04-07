import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { customRender } from '../../utils/test-utils'
import { Details } from './Details'

afterEach(cleanup)

describe('component/CalculatorMode', () => {
    it('renders Calculator Mode component', () => {
        const { render } = customRender(<Details />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('can update inputs and move to next page', () => {
        const { render, dispatchMock } = customRender(<Details />, {})
        const { getByTestId } = render

        const nameInput = getByTestId('input-First Name')
        const lastInput = getByTestId('input-Last Name')
        const emailInput = getByTestId('input-Email')

        userEvent.type(nameInput, 'John')
        expect(nameInput).toHaveValue('John')
        userEvent.type(lastInput, 'Smith')
        expect(lastInput).toHaveValue('Smith')
        userEvent.type(emailInput, 'jsmith@gmail.com')
        expect(emailInput).toHaveValue('jsmith@gmail.com')
        const nextbutton = getByTestId('next-button')
        userEvent.click(nextbutton)
        // It should call dispatch to next page (26th dispatch after typing in first name, last name and email)
        expect(dispatchMock).toHaveBeenNthCalledWith(26, { type: 'NEXT_PAGE' })
    })

    it('will show error once submitted and empty', async () => {
        const { render, dispatchMock } = customRender(<Details />, {})
        const { getByTestId } = render

        const nameInput = getByTestId('input-First Name')
        const lastInput = getByTestId('input-Last Name')
        const nextbutton = getByTestId('next-button')
        userEvent.click(nextbutton)
        expect(dispatchMock).toHaveBeenCalledWith({
            payload: {
                email: 'Add a valid email',
                firstName: 'Please enter a value',
                lastName: 'Please enter a value',
            },
            type: 'VALIDATE_DETAILS',
        })
        expect(nameInput).toBeInvalid()
        userEvent.type(nameInput, 'M')
        // Validity checks on change
        expect(nameInput).toBeValid()
        // Validity error on change when fields are empty
        userEvent.type(nameInput, '{backspace}')
        fireEvent.click(lastInput)
        expect(nameInput).toHaveValue('')
        // expect(dispatchMock).toHaveBeenNthCalledWith(3, {"payload": {"email": "Add a valid email", "firstName": "Please enter a value", "lastName": "Please enter a value"}, "type": "VALIDATE_DETAILS"})
        await waitFor(() => expect(nameInput).toBeInvalid())
    })
})

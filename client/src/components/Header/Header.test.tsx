import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialState } from '../../store/initialState'
import { customRender } from '../../utils/test-utils'
import { Header } from './Header'

afterEach(cleanup)

describe('component/Savings Controls', () => {
    it('renders Header component', () => {
        const { render } = customRender(<Header />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })
    it('renders Header component', () => {
        const { render } = customRender(<Header />, {})
        const { getByTestId } = render
        const step1 = getByTestId('step-button-0')
        const step2 = getByTestId('step-button-1')
        const step3 = getByTestId('step-button-2')
        expect(step1).not.toBeDisabled()
        expect(step2).toBeDisabled()
        expect(step3).toBeDisabled()
    })

    it('renders Header component', () => {
        const { render, dispatchMock } = customRender(<Header />, {
            store: {
                ...initialState,
                details: {
                    firstName: {
                        value: 'john smith',
                        error: '',
                    },
                    lastName: {
                        value: 'john smith',
                        error: '',
                    },
                    email: {
                        value: 'johnsmith@gmail.com',
                        error: '',
                    },
                },
            },
        })
        const { getByTestId } = render
        const step1 = getByTestId('step-button-0')
        const step2 = getByTestId('step-button-1')
        const step3 = getByTestId('step-button-2')
        expect(step1).not.toBeDisabled()
        expect(step2).not.toBeDisabled()
        expect(step3).not.toBeDisabled()
        userEvent.click(step2)
        expect(dispatchMock).toBeCalledWith({ payload: 2, type: 'GOT_TO_PAGE' })
        userEvent.click(step3)
        expect(dispatchMock).toBeCalledWith({ payload: 3, type: 'GOT_TO_PAGE' })
    })
})

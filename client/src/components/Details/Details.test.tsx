import React from 'react'
import { cleanup } from '@testing-library/react'
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

    it('renders Calculator Mode component', () => {
        const { render, dispatchMock } = customRender(<Details />, {})
        const { getByTestId } = render

        const nameInput = getByTestId('input-First Name')
        userEvent.type(nameInput, 'Jim')
        expect(dispatchMock).toHaveBeenCalled()
    })
})

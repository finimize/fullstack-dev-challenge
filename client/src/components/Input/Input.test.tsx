import React from 'react'
import { cleanup } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { Input } from './Input'

afterEach(cleanup)

describe('component/CalculatorMode', () => {
    it('renders Calculator Mode component', () => {
        const { render } = customRender(<Input label='test' />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('renders Calculator Mode component', () => {
        const { render } = customRender(<Input label='number test' isNumberInput />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })
})

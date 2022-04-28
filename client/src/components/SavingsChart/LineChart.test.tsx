import React from 'react'
import { cleanup } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { SavingsChart } from './SavingsChart'

afterEach(cleanup)

describe('component/Savings', () => {
    it('renders Calculator Mode component', () => {
        const { render } = customRender(<SavingsChart />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })
})

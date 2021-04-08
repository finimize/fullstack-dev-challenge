import React from 'react'
import { cleanup } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { SavingsSummary } from './SavingsSummary'

afterEach(cleanup)

describe('component/SavingsSummary', () => {
    it('renders Savings summary component', () => {
        const { render } = customRender(<SavingsSummary />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })
})

import React from 'react'
import { cleanup } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { StepButton } from './StepButton'

afterEach(cleanup)

describe('component/Savings', () => {
    it('renders step button component', () => {
        const { render } = customRender(<StepButton label={1} />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('renders step button component when selected', () => {
        const { render } = customRender(<StepButton label={1} selected />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })
})

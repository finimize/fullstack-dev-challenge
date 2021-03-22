import React from 'react'
import { render } from '@testing-library/react'
import { NavHeader } from '.'

describe('App', () => {
    it('renders learn react link', () => {
        const { container } = render(<NavHeader />)
        expect(container).toMatchSnapshot()
    })
})

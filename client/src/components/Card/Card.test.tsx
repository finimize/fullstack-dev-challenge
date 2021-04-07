import React from 'react'
import { render } from '@testing-library/react'
import { Card } from './Card'

describe('components/Card', () => {
    it('renders the Card Component with a child', () => {
        const { container } = render(
            <Card>
                <div>Hello</div>
            </Card>,
        )
        expect(container).toMatchSnapshot()
    })
})

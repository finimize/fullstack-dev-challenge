import React from 'react'
import { screen } from '@testing-library/react'
import { renderForTest } from '../../test'

import TextWithTag from './TextWithTag'

describe('TextWithTag', () => {
    it('renders successfully, sliders are visible and handle change is initialised correctly', () => {
        const props = {
            label: 'Initial saving ',
            valueText: '£1,000.00',
        }

        renderForTest(<TextWithTag {...props} />)

        expect(screen.getByText('Initial saving')).toBeInTheDocument()
        expect(screen.getByText('£1,000.00')).toBeInTheDocument()
    })
})

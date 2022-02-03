import React from 'react'
import { screen } from '@testing-library/react'
import { renderForTest } from '../../test'

import SavingsResults from './SavingsResults'

describe('SavingsResults', () => {
    it('renders successfully and title and totals are visible', () => {
        const props = {
            savingsTotals: {
                totalSaved: 10000,
                totalInvested: 8000,
                interestEarned: 2000,
            },
        }

        renderForTest(<SavingsResults {...props} />)

        expect(screen.getByText('Totals after 50 years')).toBeInTheDocument()
        expect(screen.getByText('£10,000.00')).toBeInTheDocument()
        expect(screen.getByText('£8,000.00')).toBeInTheDocument()
        expect(screen.getByText('£2,000.00')).toBeInTheDocument()
    })
})

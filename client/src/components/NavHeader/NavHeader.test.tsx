import React from 'react'
import { screen } from '@testing-library/react'
import { renderForTest } from '../../test'

import NavHeader from './NavHeader'

describe('NavHeader', () => {
    it('renders successfully and Logo is visible', () => {
        renderForTest(<NavHeader />)

        const logo = screen.getByRole('img')
        expect(logo).toHaveAttribute('alt', 'Finimize')
    })
})

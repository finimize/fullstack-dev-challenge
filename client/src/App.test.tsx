import React from 'react'
import { screen } from '@testing-library/react'
import { renderForTest, mockLineChart } from './test'
import App from './App'

jest.mock('./components/LineChart')

test('renders successfully and shows title', () => {
    mockLineChart()

    renderForTest(<App />)

    expect(screen.getByText('Compound interest projections')).toBeInTheDocument()
})

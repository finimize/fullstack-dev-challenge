import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import fetch from 'jest-fetch-mock'

jest.mock('./components/LineChart', () => (props: any) => 'graph' + JSON.stringify(props))

describe('Input', () => {
    beforeEach(() => {
        fetch.resetMocks()
        fetch.mockResponse(
            JSON.stringify({
                data: {
                    year: [0, 1, 2, 3, 4, 5],
                    amount: [200, 300, 400, 500, 600, 700],
                },
            })
        )
    })

    it('renders three inputs and graph', () => {
        render(<App />)
        expect(screen.getByText('How much are you starting with?')).toBeInTheDocument()
        expect(screen.getByText('How much can you put aside monthly?')).toBeInTheDocument()
        expect(screen.getByText('What percentage interest rate can you get?')).toBeInTheDocument()
        expect(screen.getByText(/graph/i)).toBeInTheDocument()
    })

    it('fetches from API when initial value changes', async () => {
        render(<App />)
        const input = screen.getByTestId('initialValueInput')
        fireEvent.change(input, { target: { value: 15 } })

        await waitFor(() =>
            expect(screen.getByText(/[200,300,400,500,600,700]/)).toBeInTheDocument()
        )
        expect(fetch).toHaveBeenCalledTimes(2)
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3001/calculation?initial=15&monthlyDeposit=100&interestRate=3'
        )
    })

    it('fetches from API when monthly deposit changes', async () => {
        render(<App />)
        const input = screen.getByTestId('monthlyDepositInput')
        fireEvent.change(input, { target: { value: 15 } })

        await waitFor(() =>
            expect(screen.getByText(/[200,300,400,500,600,700]/)).toBeInTheDocument()
        )
        expect(fetch).toHaveBeenCalledTimes(2)
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3001/calculation?initial=1000&monthlyDeposit=15&interestRate=3'
        )
    })

    it('fetches from API when interest rate changes', async () => {
        render(<App />)
        const input = screen.getByTestId('interestRateInput')
        fireEvent.change(input, { target: { value: 15 } })

        await waitFor(() =>
            expect(screen.getByText(/[200,300,400,500,600,700]/)).toBeInTheDocument()
        )
        expect(fetch).toHaveBeenCalledTimes(2)
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3001/calculation?initial=1000&monthlyDeposit=100&interestRate=15'
        )
    })
})

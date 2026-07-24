import { render, screen } from '@testing-library/react'
import App from './App'

// chart.js needs a real <canvas> context that jsdom doesn't provide,
// so stub the chart component for rendering tests.
vi.mock('react-chartjs-2', () => ({
    Line: () => <div data-testid="line-chart" />,
}))

vi.mock('./hooks/useProjection', () => ({
    useProjection: () => ({
        projection: {
            params: {
                initialSavings: 5000,
                monthlyDeposit: 250,
                annualInterestRate: 5,
            },
            points: [
                { month: 0, balance: 5000, contributions: 5000, interest: 0 },
                { month: 12, balance: 8000, contributions: 8000, interest: 0 },
                { month: 600, balance: 500000, contributions: 155000, interest: 345000 },
            ],
        },
        loading: false,
        error: null,
    }),
}))

test('renders the Finimize header, calculator inputs and savings chart', () => {
    render(<App />)
    expect(screen.getByAltText('Finimize')).toBeInTheDocument()
    expect(screen.getByLabelText('Initial savings slider')).toBeInTheDocument()
    expect(screen.getByLabelText('Monthly deposit slider')).toBeInTheDocument()
    expect(screen.getByLabelText('Annual interest rate slider')).toBeInTheDocument()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
})

import { render, screen } from '@testing-library/react'
import App from './App'

// chart.js needs a real <canvas> context that jsdom doesn't provide,
// so stub the chart component for rendering tests.
vi.mock('react-chartjs-2', () => ({
    Line: () => <div data-testid="line-chart" />,
}))

test('renders the Finimize header and the savings chart', () => {
    render(<App />)
    expect(screen.getByAltText('Finimize')).toBeInTheDocument()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
})

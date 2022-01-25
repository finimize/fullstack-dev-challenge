import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

const mockOnChange = jest.fn()

describe('Input', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('renders title and default value', () => {
        render(
            <Input
                title="test-title"
                defaultValue="12"
                onChange={mockOnChange}
                testId="input-test"
            />
        )
        expect(screen.getByText(/test-title/i)).toBeInTheDocument()
        const input = screen.getByTestId('input-test') as HTMLInputElement
        expect(input.value).toBe('12')
    })

    it('calls onChange when value changes', () => {
        render(
            <Input
                title="test-title"
                defaultValue="12"
                onChange={mockOnChange}
                testId="input-test"
            />
        )

        const input = screen.getByTestId('input-test') as HTMLInputElement
        expect(input.value).toBe('12')
        fireEvent.change(input, { target: { value: 15 } })
        expect(input.value).toBe('15')

        expect(mockOnChange).toHaveBeenCalledTimes(1)
        expect(mockOnChange).toHaveBeenCalledWith('15', 15)
    })
})

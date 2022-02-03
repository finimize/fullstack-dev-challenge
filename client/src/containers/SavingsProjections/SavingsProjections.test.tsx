import React from 'react'
import { fireEvent, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderForTest, mockLineChart } from '../../test'

import SavingsProjections from './SavingsProjections'

jest.mock('../../components/LineChart')

const fetchMock = jest.fn()
global.fetch = fetchMock as jest.Mock

describe('SavingsProjections', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('debounces multiple requests to fetch the projection data as expected', () => {
        // due to this bug with lodash debounce: https://github.com/facebook/jest/issues/3465
        jest.useFakeTimers('modern')

        fetchMock.mockImplementation(() => Promise.resolve())
        mockLineChart()

        renderForTest(<SavingsProjections />)

        expect(fetchMock).toHaveBeenCalledTimes(1)

        const savingsSlider = screen.getByLabelText('slider-savings')

        fireEvent.mouseDown(savingsSlider)
        fireEvent.mouseDown(savingsSlider)
        fireEvent.mouseDown(savingsSlider)
        fireEvent.mouseDown(savingsSlider)

        // @ts-ignore:next-line
        act(() => jest.runAllTimers())

        expect(fetchMock).toHaveBeenCalledTimes(2)

        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })

    it('when response is successful displays expected savings results', async () => {
        const data = {
            savings: [5000, 6000],
            totalInvested: 5500,
            interestEarned: 500,
        }
        fetchMock.mockImplementation(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({ data }) })
        )
        mockLineChart()

        renderForTest(<SavingsProjections />)

        expect(fetchMock).toHaveBeenCalledTimes(1)

        await waitFor(() => {
            expect(screen.getByText('£6,000.00')).toBeInTheDocument()
            expect(screen.getByText('£5,500.00')).toBeInTheDocument()
            expect(screen.getByText('£500.00')).toBeInTheDocument()
        })
    })

    it('does not make invalid requests when form values are invalid', async () => {
        fetchMock.mockImplementation(() => Promise.resolve())
        mockLineChart()

        renderForTest(<SavingsProjections />)

        expect(fetchMock).toHaveBeenCalledTimes(1)

        const data = {
            savings: [5000, 6000],
            totalInvested: 5500,
            interestEarned: 500,
        }
        fetchMock.mockImplementation(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({ data }) })
        )

        userEvent.click(screen.getByTestId('edit-slider-interest'))
        const interestInput = screen.getByRole('spinbutton')
        userEvent.clear(interestInput)
        userEvent.type(interestInput, '2')

        await waitFor(() => {
            expect(screen.getByText('£6,000.00')).toBeInTheDocument()
        })

        expect(fetchMock).toHaveBeenCalledTimes(2)

        // We use timers for this one as we don't expect any state updates
        // due to this bug with lodash debounce: https://github.com/facebook/jest/issues/3465
        jest.useFakeTimers('modern')

        userEvent.type(interestInput, '.')

        // @ts-ignore:next-line
        act(() => jest.runAllTimers())

        expect(fetchMock).toHaveBeenCalledTimes(2)

        jest.useRealTimers()
    })

    it('when response fails it shows error message', async () => {
        fetchMock.mockImplementation(() => Promise.reject())
        mockLineChart()

        renderForTest(<SavingsProjections />)

        expect(fetchMock).toHaveBeenCalledTimes(1)

        await waitFor(() => {
            expect(
                screen.getAllByText(
                    'Sorry, an error occured retrieving projection data. Please try again later.'
                )[0]
            ).toBeInTheDocument()
        })
    })
})

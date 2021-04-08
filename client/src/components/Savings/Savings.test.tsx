import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent, { TargetElement } from '@testing-library/user-event'
import { initialState } from '../../store/initialState'
import { customRender } from '../../utils/test-utils'
import * as postMethods from '../../api'
import { Savings } from './Savings'

afterEach(cleanup)

describe('component/Savings', () => {
    it('renders savings component in simple mode', () => {
        const { render } = customRender(<Savings />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('renders savings component in advanced mode', () => {
        const { render } = customRender(<Savings />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        const { container } = render
        expect(container).toMatchSnapshot()
    })

    it('postCalculation is called', () => {
        const spy = jest.spyOn(postMethods, 'postCalculation')
        const { render } = customRender(<Savings />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        const { getByTestId } = render
        const montlyContribution = getByTestId('input-Monthly Contributions')
        expect(montlyContribution).toBeInTheDocument()

        userEvent.type(montlyContribution, '6')
        expect(spy).toHaveBeenNthCalledWith(2, 10, 20, 1, 6)
    })

    it('postCalculation is called on render and dispatch is called to update store', async () => {
        const spy = jest.spyOn(postMethods, 'postCalculation')
        spy.mockReturnValue(
            Promise.resolve({
                yearlySavings: [1, 2],
                finalValue: 5,
                yearlyBreakdown: [
                    {
                        yearFinal: 5,
                        savings: [1, 2],
                    },
                ],
            }),
        )

        const { dispatchMock } = customRender(<Savings />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        await waitFor(() =>
            expect(dispatchMock).toHaveBeenCalledWith({
                payload: {
                    error: '',
                    isLoading: false,
                    value: {
                        finalValue: 5,
                        yearlyBreakdown: [{ savings: [1, 2], yearFinal: 5 }],
                        yearlySavings: [1, 2],
                    },
                },
                type: 'UPDATE_DATA',
            }),
        )
    })

    it('postCalculation is called on render and dispatch is called to update store', async () => {
        const spy = jest.spyOn(postMethods, 'postCalculation')
        spy.mockReturnValue(Promise.reject(new Error()))

        const { dispatchMock } = customRender(<Savings />, {
            store: { ...initialState, calculatorMode: 'Advanced' },
        })
        await waitFor(() =>
            expect(dispatchMock).toHaveBeenCalledWith({
                payload: { error: 'Error', isLoading: false, value: null },
                type: 'UPDATE_DATA',
            }),
        )
    })

    it('allows to hit previous but not next button', async () => {
        const spy = jest.spyOn(postMethods, 'postCalculation')
        spy.mockReturnValue(
            Promise.resolve({
                yearlySavings: [1, 2],
                finalValue: 5,
                yearlyBreakdown: [
                    {
                        yearFinal: 5,
                        savings: [1, 2],
                    },
                ],
            }),
        )
        const { render, dispatchMock } = customRender(<Savings />, {
            store: { ...initialState, calculatorMode: 'Advanced', currentPage: 3 },
        })
        const { getByTestId, queryByTestId } = render
        let prevButton: unknown
        await waitFor(() => {
            prevButton = getByTestId('previous-button')
        })
        let nextButton
        await waitFor(() => {
            nextButton = queryByTestId('next-button')
        })

        expect(nextButton).not.toBeInTheDocument()
        expect(prevButton).toBeInTheDocument()
        userEvent.click(prevButton as TargetElement)
        expect(dispatchMock).toHaveBeenCalledWith({ type: 'PREVIOUS_PAGE' })
    })
})

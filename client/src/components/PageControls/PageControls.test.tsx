import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { initialState } from '../../store/initialState'
import { customRender } from '../../utils/test-utils'
import { PageControls } from './PageControls'

afterEach(cleanup)

describe('component/PageControls', () => {
    it('allows to both buttons to be pressed on second page', () => {
        const nextMock = jest.fn()
        const prevMock = jest.fn()
        const { render } = customRender(<PageControls nextPage={nextMock} prevPage={prevMock} />, {
            store: { ...initialState, currentPage: 2 },
        })
        const { getByTestId, container } = render
        expect(container).toMatchSnapshot()
        const prevbutton = getByTestId('previous-button')
        const nextbutton = getByTestId('next-button')
        userEvent.click(prevbutton)
        expect(prevMock).toHaveBeenCalled()
        userEvent.click(nextbutton)
        expect(nextMock).toHaveBeenCalled()
    })

    it('allows only next button on 1st page', () => {
        const nextMock = jest.fn()
        const prevMock = jest.fn()
        const { render } = customRender(
            <PageControls nextPage={nextMock} prevPage={prevMock} />,
            {},
        )
        const { getByTestId, queryByTestId, container } = render
        expect(container).toMatchSnapshot()
        // Query the previous button as it should not be in the document
        const prevbutton = queryByTestId('previous-button')
        const nextbutton = getByTestId('next-button')
        expect(prevbutton).not.toBeInTheDocument()
        userEvent.click(nextbutton)
        expect(nextMock).toHaveBeenCalled()
    })

    it('allows only previous button on 3st page', () => {
        const nextMock = jest.fn()
        const prevMock = jest.fn()
        const { render } = customRender(<PageControls nextPage={nextMock} prevPage={prevMock} />, {
            store: { ...initialState, currentPage: 3 },
        })
        const { getByTestId, queryByTestId, container } = render
        // Query the previous button as it should not be in the document
        expect(container).toMatchSnapshot()
        const prevbutton = getByTestId('previous-button')
        const nextbutton = queryByTestId('next-button')
        expect(nextbutton).not.toBeInTheDocument()
        userEvent.click(prevbutton)
        expect(prevMock).toHaveBeenCalled()
    })
})

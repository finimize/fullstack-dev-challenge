import React from 'react'
import { cleanup } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { initialState } from '../../store/initialState'
import { DefaultLayout } from './Default'

afterEach(cleanup)

describe('component/Default Layout', () => {
    it('renders page 1', () => {
        const { render } = customRender(<DefaultLayout />, {
            store: { ...initialState, currentPage: 1 },
        })
        const { container } = render
        expect(container).toMatchSnapshot()
    })
    it('renders page 2', () => {
        const { render } = customRender(<DefaultLayout />, {
            store: { ...initialState, currentPage: 2 },
        })
        const { container } = render
        expect(container).toMatchSnapshot()
    })
    it('renders page 3', () => {
        const { render } = customRender(<DefaultLayout />, {
            store: { ...initialState, currentPage: 3 },
        })
        const { container } = render
        expect(container).toMatchSnapshot()
    })
})

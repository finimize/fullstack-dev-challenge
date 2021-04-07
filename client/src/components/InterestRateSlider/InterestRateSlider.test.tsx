import React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { InterestRateSlider } from './Slider'

afterEach(cleanup)

describe('component/Slider', () => {
    it('renders Slidercomponent', () => {
        const { render } = customRender(<InterestRateSlider />, {})
        const { container } = render
        expect(container).toMatchSnapshot()
    })
    it('dispatch on change', () => {
        const { render, dispatchMock } = customRender(<InterestRateSlider />, {})
        const { getByTestId } = render
        const sliderComponent = getByTestId('interest-rate-slider')
        fireEvent.focus(sliderComponent)
        fireEvent.mouseDown(sliderComponent)
        expect(dispatchMock).toHaveBeenCalled()
    })
})

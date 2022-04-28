import React from 'react'
import { cleanup } from '@testing-library/react'
import { customRender } from '../../utils/test-utils'
import { LineChart } from './LineChart'

afterEach(cleanup)

describe('component/Savings', () => {
    it('renders Calculator Mode component', () => {
        const tempData = {
            xAxis: [0, 1, 2, 3, 4, 5],
            yAxis: [100, 150, 180, 210, 240, 350],
        }
        const { render } = customRender(
            <LineChart xAxisData={tempData.xAxis} yAxisData={tempData.yAxis} />,
            {},
        )
        const { container } = render
        expect(container).toMatchSnapshot()
    })
})

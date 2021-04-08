import React from 'react';
import RangeSlider from "../RangeSlider";
import {render, fireEvent} from "@testing-library/react";

describe('Slider', () => {
    const setValueMock = jest.fn();
    const props = {
        min: 1,
        max: 10,
        defaultValue: 1,
        setValue: setValueMock
    };
    afterEach(() => {
       jest.restoreAllMocks();
    });
    test('renders slider input', () => {
        const {getByTestId} = render(<RangeSlider {...props}/>);
        expect(getByTestId('slider-input')).toBeInTheDocument();
    });
    test("change in input should setValue", () => {
        const {getByTestId} = render(
            <RangeSlider{...props}/>);

        fireEvent.input(getByTestId('slider-input'), { target: { value: '5' } });
        expect(getByTestId('slider-value').textContent?.trim()).toEqual("5");
        expect(setValueMock).toBeCalledWith("5");
    })
});

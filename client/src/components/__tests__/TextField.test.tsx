import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import TextField from "../TextField";


describe("TextField", () => {
    const props = {
        setText: jest.fn(),
        timeoutValue: 800,
        type: "text"
    }
    beforeEach(() => {
       jest.useFakeTimers();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('renders component', () => {
        const { container } = render(<TextField {...props}/>);
        expect(container).toBeInTheDocument();
    });

    test('Given user types in text box Should call and throttle setter function',  () => {
        const {getByTestId} = render(<TextField {...props} />);
        const input = getByTestId("text-field");

        fireEvent.change(input, { target: { value: "pretzel" } });
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 800);

    });

});

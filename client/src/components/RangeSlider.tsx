import React, {useState} from 'react';

type Props = {
    min: number;
    max: number;
    defaultValue?: number
    setValue: Function;
}


const RangeSlider = ({ min, max, defaultValue, setValue} : Props) => {
    const [currentValue, setCurrentValue] = useState<string>(min.toString() ?? "0");
     const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         if(event.target instanceof HTMLInputElement) {
             const {target: {value}} = event;
             setCurrentValue(value);
             setValue(value);
         }
     };
     return (
        <div className="range-slider">
            <input data-testid="slider-input" type="range" className="slider-input" name="slider-input" min={min} max={max} defaultValue={defaultValue} onInput={onInputChange} />
            <div data-testid="slider-value" className="slider-value"> {currentValue}</div>
        </div>
     )
};

export default RangeSlider;

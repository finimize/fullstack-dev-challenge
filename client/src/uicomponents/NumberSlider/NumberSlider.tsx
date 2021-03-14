import { NumberInput, NumberInputField, Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  maxSlider?: number;
  step?: number;
}

const NumberSlider = ({ value, onChange, min, max, maxSlider, step }: Props) => {
  const [temp, setTemp] = useState<number>(value)
  const [isEditing, setEditing] = useState<boolean>(false)

  useEffect(() => {
    setTemp(value)
  }, [value])

  useEffect(() => {
    if (!isEditing && temp && (max || maxSlider || 100) >= temp ) {
      onChange(temp)
    }
  }, [temp, isEditing, onChange])

  return (
    <Box>
      <NumberInput 
        defaultValue={temp}
        min={min}
        max={max}
        value={temp} 
        onChange={(value, valueAsNumber = 0) => {
          setTemp(valueAsNumber || 0)
        }}>
        <NumberInputField />
      </NumberInput>
      <Slider 
        aria-label="slider-ex-1" 
        size="lg"
        mt={2}
        defaultValue={temp} 
        min={min} 
        max={maxSlider} 
        value={temp}
        step={step}
        onChangeEnd={() => setEditing(false)}
        onChange={setTemp}
        onChangeStart={() => setEditing(true)}
        focusThumbOnChange={false}
      >
        <SliderTrack h={2}>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}

export default NumberSlider

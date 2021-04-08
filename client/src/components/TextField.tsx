import React, { ChangeEvent } from 'react'

type Props = {
    setText: Function
    placeholder?: string
    timeoutValue?: number
    type: string
}
const TextField = ({ setText, type, placeholder, timeoutValue = 0 }: Props) => {
    const onChange = (setterFunc: Function, timeout: number) => (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        if (timeout === 0) {
            setterFunc(event.target.value)
            return
        }
        setTimeout(() => setterFunc(event.target.value), timeout)
    }

    return (
        <div id="TextField">
            <input
                data-testid="text-field"
                name="TextInput"
                type={type}
                placeholder={placeholder}
                onChange={onChange(setText, timeoutValue)}
            />
        </div>
    )
}

export default TextField

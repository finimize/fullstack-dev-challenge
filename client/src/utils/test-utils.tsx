import React, { ReactElement, FC, useState } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { render as rtlRender, RenderResult, RenderOptions } from '@testing-library/react'
import { AppContext } from '../store'
import { initialState } from '../store/initialState'
import { StateInterface } from '../store/store.interface'
import { theme } from '../theme'

const mainTheme = extendTheme(theme)

interface DistpatchMockinterface {
    payload: string
    type: string
}

interface CustomRenderOptions extends Partial<RenderOptions> {
    store?: StateInterface
    defaultTheme?: typeof theme
}

interface CustomRenderInterface {
    (
        ui: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>,
        options: CustomRenderOptions,
    ): { render: RenderResult; dispatchMock: jest.Mock<unknown, unknown[]> }
}

const customRender: CustomRenderInterface = (
    ui: ReactElement,
    { store = initialState, defaultTheme = mainTheme, ...options },
) => {
    const dispatchMock = jest.fn()
    const AllProviders: FC = ({ children }) => {
        const [calculatorState, setCalculatorState] = useState(store)
        return (
            <ChakraProvider theme={defaultTheme}>
                <AppContext.Provider
                    value={{
                        state: calculatorState,
                        dispatch: dispatchMock.mockImplementation(
                            (value: DistpatchMockinterface) => {
                                setCalculatorState(() => ({
                                    ...calculatorState,
                                    calculatorMode: value.payload,
                                }))
                            },
                        ),
                    }}
                >
                    {' '}
                    {children}{' '}
                </AppContext.Provider>{' '}
            </ChakraProvider>
        )
    }
    return { render: rtlRender(ui, { wrapper: AllProviders, ...options }), dispatchMock }
}

export { customRender }

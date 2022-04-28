import React, { FC, useReducer } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { render as rtlRender, RenderResult, RenderOptions } from '@testing-library/react'
import { AppContext, DispatchType } from '../store'
import { initialState } from '../store/initialState'
import { reducer } from '../store/reducer'
import { StateInterface } from '../store/store.interface'
import { theme } from '../theme'

const mainTheme = extendTheme(theme)

interface CustomRenderOptions extends Partial<RenderOptions> {
    store?: StateInterface
    defaultTheme?: typeof theme
}

export interface CustomRenderInterface {
    (
        ui: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>,
        options: CustomRenderOptions,
    ): { render: RenderResult; dispatchMock: jest.Mock<unknown, unknown[]> }
}

const customRender: CustomRenderInterface = (
    ui,
    { store = initialState, defaultTheme = mainTheme, ...options },
) => {
    const dispatchMock = jest.fn()
    const AllProviders: FC = ({ children }) => {
        // const [calculatorState, setCalculatorState] = useState(store)
        const [calculatorState, dispatch] = useReducer(reducer, store)
        return (
            <ChakraProvider theme={defaultTheme}>
                <AppContext.Provider
                    value={{
                        state: calculatorState,
                        dispatch: dispatchMock.mockImplementation((value: DispatchType) =>
                            dispatch(value),
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

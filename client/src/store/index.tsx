import React, { createContext, useReducer, FC } from 'react'
import { initialState } from './initialState'
import { reducer } from './reducer'
import { UpdateDetailsTypeInterface, StateInterface, AppProps } from './store.interface'

const AppContext = createContext<{
    state: StateInterface
    dispatch: React.Dispatch<UpdateDetailsTypeInterface>
}>({
    state: initialState,
    dispatch: () => null,
})

const AppProvider: FC<AppProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }

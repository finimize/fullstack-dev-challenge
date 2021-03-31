import React, { FC, useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { NavHeader } from '../NavHeader'
import { StepButton } from '../StepButton'
import { Header } from '../Header'
import { Details } from '../Details'
import { CalculatorMode } from '../CalculatorMode'
import { Savings } from '../Savings'
import { AppContext } from '../../store'

// type LayoutProps = {
//     children: React.ReactNode
// }

export const DefaultLayout: FC = () => {
    const { state } = useContext(AppContext)

    return (
        <Box
            display='flex'
            minHeight='100vh'
            height='100%'
            flexDirection='column'
            backgroundColor='grey2'
        >
            <NavHeader />
            <Header />
            {state.currentPage === 1 && <Details />}
            {state.currentPage === 2 && <CalculatorMode />}
            {state.currentPage === 3 && <Savings />}
        </Box>
    )
}

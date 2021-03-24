import React, { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { NavHeader } from '../NavHeader'
import { StepButton } from '../StepButton'
import { Header } from '../Header'

type LayoutProps = {
    children: React.ReactNode
}

export const DefaultLayout: FC<LayoutProps> = ({ children }: LayoutProps) => (
    <Box
        display='flex'
        minHeight='100vh'
        height='100%'
        flexDirection='column'
        backgroundColor='grey2'
    >
        <NavHeader />
        <Header />
        <>{children}</>
    </Box>
)

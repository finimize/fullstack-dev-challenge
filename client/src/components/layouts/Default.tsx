import React from 'react'
import { Box } from '@chakra-ui/react'
import NavHeader from '../NavHeader'

type LayoutProps = {
    children: React.ReactNode
}

const DefaultLayout = ({ children }: LayoutProps) => (
    <Box display="flex" minHeight="100vh" height="100%" flexDirection="column">
        <NavHeader />
        <>{children}</>
    </Box>
)

export default DefaultLayout

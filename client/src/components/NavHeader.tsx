import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import images from '../images'

const NavHeader = () => (
    <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        px={6}
        py={4}
        bg="blue700"
    >
        <Image src={images.fullBrandLogo} alt="Finimize" width="160px" />
    </Box>
)

export default NavHeader

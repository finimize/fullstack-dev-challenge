import React, { FC } from 'react'
import { Box, Image } from '@chakra-ui/react'
import { images } from '../../images'

export const NavHeader: FC = () => (
    <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        px={6}
        py={4}
        bg='blueHeader'
    >
        <Image src={images.fullBrandLogo} alt='Finimize' width='160px' />
    </Box>
)

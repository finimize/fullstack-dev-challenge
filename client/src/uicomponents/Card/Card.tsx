import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

const Card = ({ children, ...props }: CardProps) => {
  return (
    <Box shadow="xs" border="1px solid #eeeeee" borderRadius={4} p={4} {...props}>
      {children}
    </Box>
  )
}

export default Card

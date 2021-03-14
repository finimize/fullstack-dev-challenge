import { Box, BoxProps, Text } from '@chakra-ui/react'
import React from 'react'
import theme from '../../theme'

interface Props extends BoxProps {
  amount: String
}

const CIInfoSection = ({ title, amount, ...props }: Props) => {
  return (
    <Box {...props} flex="1" w="100%" p={4} borderBottom={`1px solid ${theme.colors.grey3}`}>
      <Box>
        <Text fontSize="sm">{title}</Text>
      </Box>
      <Box>
        <Text fontSize="31px" fontWeight="bold">{amount}</Text>
      </Box>
    </Box>
  )
}

export default CIInfoSection

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { IProjection } from '../../api/compoundInterest/calculateProjection'
import theme from '../../theme'
import CIInfoSection from './CIInfoSection'

type Props = {
  projections: IProjection[]
}

const CIInfo = ({ projections }: Props) => {
  if (!projections.length) {
    return null
  }

  const { totalDeposit, totalInterest, balance } = projections[projections.length - 1]

  return (
    <Flex direction="column" h="100%" > 
      <Box m={-4} mb={0}  p={4} bg={theme.colors.primary} color={theme.colors.white}>
        Your Savings Details
      </Box>
      <Flex direction="column" align="flex-start" justify="space-around" h="100%" m={-4} mt={0}>
        <CIInfoSection title="Total Deposits" amount={totalDeposit} borderBottom="1px "/>
        <CIInfoSection title="Total Interest Paid" amount={totalInterest} />
        <CIInfoSection title="Your Balance" amount={balance} />
      </Flex>
    </Flex>
  )
}

export default CIInfo
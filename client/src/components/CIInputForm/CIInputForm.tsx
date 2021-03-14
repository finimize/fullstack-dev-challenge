import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
  onChange: Function
}

export type CIRequest = {
  principal: Number
  monthlyDeposit: Number
  interestRate: Number
}

const CIInputFrom = ({ onChange }: Props) => {
  const [principal, setPrincipal] = useState('')
  const [monthlyDeposit, setMonthlyDeposit] = useState('')
  const [interestRate, setInterestRate] = useState('')

  useEffect(() => {
    if (principal && monthlyDeposit && interestRate) {
      onChange({
        principal: parseInt(principal),
        monthlyDeposit: parseInt(monthlyDeposit),
        interestRate: parseInt(interestRate)
      })
    }
  }, [principal, monthlyDeposit, interestRate, onChange])

  return (
    <VStack>
      <FormControl id="principal">
        <FormLabel>Initial deposit</FormLabel>
        <Input type="number" onChange={(e) => setPrincipal(e.target.value)} value={principal} />
      </FormControl>

      <FormControl id="interest">
        <FormLabel>Interest Rate</FormLabel>
        <Input type="number" onChange={(e) => setInterestRate(e.target.value)} value={interestRate} />
      </FormControl>

      <FormControl id="monthlyDeposit">
        <FormLabel>Monthly deposit</FormLabel>
        <Input type="number" onChange={(e) => setMonthlyDeposit(e.target.value)} value={monthlyDeposit} />
      </FormControl>
    </VStack>
  )
}

export default CIInputFrom

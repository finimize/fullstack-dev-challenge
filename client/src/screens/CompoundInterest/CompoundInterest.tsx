import { Container, Stack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import calculateProjection, { IProjection, IProjectionRequest } from '../../api/compoundInterest/calculateProjection'
import CIGraph from '../../components/CIGraph'
import CIInfo from '../../components/CIInfo'
import CIInputFrom from '../../components/CIInputForm'
import Card from '../../uicomponents/Card'


const CompoundInterest = () => {
  const [projection, setProjection] = useState<IProjection[]>([])

  const fetchProjection =  useCallback(async (requestData: IProjectionRequest) => {
    const projection = await calculateProjection(requestData)
    setProjection(projection)
  }, [setProjection])


  return (
    <Container pt={12} maxW="container.lg">
      <Stack spacing={6} direction={["column", "column", "row"]}>
        <Card flex="1" minH="358px">
          <CIInputFrom onChange={fetchProjection} />
        </Card>

        <Card flex="1">
          <CIInfo projections={projection} />
        </Card>
      </Stack>

      {projection.length > 0 && 
        <Card w="100%" mt={4} mb={4}>
            <CIGraph projection={projection} />
        </Card>
      }  
    </Container>
  )
}

export default CompoundInterest

import React, { FC, useContext } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { StepButton } from '../StepButton'
import { AppContext } from '../../store'
import { GOT_TO_PAGE } from '../../store/types'
import { useValidateDetails } from '../Hooks/useValidateDetails'

export const Header: FC = () => {
    const { state, dispatch } = useContext(AppContext)
    const validationData = useValidateDetails()

    return (
        <Box backgroundColor='white' padding='6'>
            <Box display='flex' width='100%' justifyContent='space-evenly' padding='6'>
                {Array.from({ length: 3 }).map((e, i) => (
                    <StepButton
                        key={i}
                        label={i}
                        disabled={i > 0 && !validationData.valid}
                        selected={state.currentPage === i + 1}
                        onClick={() =>
                            dispatch({
                                type: GOT_TO_PAGE,
                                payload: i + 1,
                            })
                        }
                    />
                ))}
            </Box>
            <Text
                fontSize='xxl'
                marginLeft='8'
                marginBottom='4'
                color='blueHeader'
                fontWeight='500'
            >
                Let&apos;s start the savings...
            </Text>
        </Box>
    )
}

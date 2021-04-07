import React, { FC, useContext } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { AppContext } from '../../store'

interface PageControlProps {
    prevPage?: () => void
    nextPage?: () => void
}

export const PageControls: FC<PageControlProps> = ({ prevPage, nextPage }) => {
    const { state } = useContext(AppContext)
    const buttonJustification: () => string = () => {
        if (state.currentPage === 1) return 'flex-end'
        if (state.currentPage === 3) return 'flex-start'
        return 'space-between'
    }

    return (
        <Box justifyContent={buttonJustification()} display='flex' padding='8'>
            {state.currentPage !== 1 && (
                <Button
                    data-testid='previous-button'
                    backgroundColor='primary'
                    width='24'
                    _hover={{
                        bg: 'blue400',
                    }}
                    color='white'
                    boxShadow='-1px 1px 3px 0px #a7a7a7'
                    onClick={prevPage}
                >
                    Back
                </Button>
            )}
            {state.currentPage !== 3 && (
                <Button
                    data-testid='next-button'
                    width='24'
                    borderColor='blue400'
                    borderWidth='2px'
                    backgroundColor='primary'
                    boxShadow='-1px 1px 3px 0px #a7a7a7'
                    color='white'
                    _hover={{
                        bg: 'blue400',
                    }}
                    onClick={nextPage}
                >
                    Next
                </Button>
            )}
        </Box>
    )
}

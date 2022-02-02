import React from 'react'
import { Heading } from '@chakra-ui/react'
import TextWithTag from './TextWithTag'
import { numberFormatter, SAVINGS_DEFAULTS } from '../lib'

type Props = {
    savingsTotals: { totalSaved: number; totalInvested: number; interestEarned: number }
}

const SavingsResults = ({ savingsTotals }: Props) => (
    <>
        <Heading variant="h2">{`Totals after ${SAVINGS_DEFAULTS.YEARS} years`}</Heading>
        <TextWithTag
            label="Total savings"
            valueText={numberFormatter.format(savingsTotals.totalSaved)}
        />
        <TextWithTag
            label="Total invested"
            valueText={numberFormatter.format(savingsTotals.totalInvested)}
        />
        <TextWithTag
            label="Interest earned"
            valueText={numberFormatter.format(savingsTotals.interestEarned)}
        />
    </>
)

export default SavingsResults

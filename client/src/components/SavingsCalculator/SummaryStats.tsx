import { Box, Text } from '@chakra-ui/react'
import theme from '../../theme'
import { formatCurrency } from '../../utils'

type Stat = {
    label: string
    value: number
    colour?: string
}

type Props = {
    finalBalance: number
    totalContributions: number
    totalInterest: number
    years: number
}

const StatCard = ({ label, value, colour }: Stat) => (
    <Box
        flex="1"
        bg={theme.colors.white}
        border={`1px solid ${theme.colors.grey3}`}
        borderRadius="8px"
        px={4}
        py={3}
        minWidth="180px"
    >
        <Text color={theme.colors.grey5} fontSize={theme.fontSizes.xs} textTransform="uppercase">
            {label}
        </Text>
        <Text
            mt={1}
            fontWeight="bold"
            fontSize={theme.fontSizes.xl}
            color={colour ?? theme.colors.text}
        >
            {formatCurrency(value)}
        </Text>
    </Box>
)

const SummaryStats = ({ finalBalance, totalContributions, totalInterest, years }: Props) => (
    <Box display="flex" gap={3} flexWrap="wrap">
        <StatCard
            label={`Balance after ${years} years`}
            value={finalBalance}
            colour={theme.colors.primary}
        />
        <StatCard label="You put in" value={totalContributions} />
        <StatCard label="Interest earned" value={totalInterest} colour={theme.colors.success} />
    </Box>
)

export default SummaryStats

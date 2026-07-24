import { Box, Heading, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useProjection } from '../../hooks/useProjection'
import { Projection, ProjectionParams } from '../../types/projection'
import theme from '../../theme'
import LineChart from '../LineChart'
import InputControls from './InputControls'
import SummaryStats from './SummaryStats'

const PROJECTION_YEARS = 50

const DEFAULT_VALUES: ProjectionParams = {
    initialSavings: 5_000,
    monthlyDeposit: 250,
    annualInterestRate: 5,
}

type YearlySeries = {
    labels: string[]
    balance: number[]
    contributions: number[]
}

const toYearlySeries = (projection: Projection): YearlySeries => {
    const yearly = projection.points.filter((p) => p.month % 12 === 0)

    return yearly.reduce(
        (prev, p) => {
            prev.labels.push(String(p.month / 12))
            prev.balance.push(p.balance)
            prev.contributions.push(p.contributions)
            return prev
        },
        {
            labels: [],
            balance: [],
            contributions: [],
        } as YearlySeries,
    )
}

const SavingsCalculator = () => {
    const [values, setValues] = useState(DEFAULT_VALUES)

    const { projection, error } = useProjection(values)

    const handleChange = (key: keyof ProjectionParams, value: number) => {
        setValues((prev) => ({ ...prev, [key]: value }))
    }

    const series = useMemo(() => (projection ? toYearlySeries(projection) : null), [projection])

    const finalPoint = projection?.points[projection.points.length - 1]

    return (
        <Box>
            <Heading as="h1" size="lg" color={theme.colors.text} mb={2}>
                Watch your savings grow
            </Heading>
            <Text color={theme.colors.grey5} mb={6}>
                Drag the sliders to see how your pot could look over the next {PROJECTION_YEARS}{' '}
                years.
            </Text>

            <Box
                display="grid"
                gap={6}
                gridTemplateColumns={{ base: '1fr', md: 'minmax(280px, 340px) 1fr' }}
                alignItems="start"
            >
                <Box
                    bg={theme.colors.grey1}
                    border={`1px solid ${theme.colors.grey3}`}
                    borderRadius="8px"
                    p={5}
                >
                    <InputControls values={values} onChange={handleChange} />
                </Box>

                <Box display="flex" flexDirection="column" gap={4}>
                    {finalPoint && (
                        <SummaryStats
                            finalBalance={finalPoint.balance}
                            totalContributions={finalPoint.contributions}
                            totalInterest={finalPoint.interest}
                            years={PROJECTION_YEARS}
                        />
                    )}

                    <Box
                        bg={theme.colors.white}
                        border={`1px solid ${theme.colors.grey3}`}
                        borderRadius="8px"
                        p={4}
                        height="420px"
                    >
                        {error && (
                            <Text color={theme.colors.danger} role="alert">
                                {error}
                            </Text>
                        )}
                        {series && (
                            <LineChart
                                title="Projected savings"
                                xLabel="Years"
                                yLabel="Amount"
                                xAxisData={series.labels}
                                datasets={[
                                    {
                                        label: 'Balance',
                                        data: series.balance,
                                        colour: theme.colors.primary,
                                        fillColour: theme.colors.blue200,
                                    },
                                    {
                                        label: 'Contributions',
                                        data: series.contributions,
                                        colour: theme.colors.grey5,
                                    },
                                ]}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SavingsCalculator

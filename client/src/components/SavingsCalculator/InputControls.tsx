import { Box } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'
import theme from '../../theme'
import { clamp, formatCurrency } from '../../utils'
import { ProjectionParams } from '../../types/projection'

type InputFormat = 'currency' | 'percent'
const INPUTS: {
    key: keyof ProjectionParams
    label: string
    min: number
    max: number
    step: number
    format: InputFormat
}[] = [
    {
        key: 'initialSavings',
        label: 'Initial savings',
        min: 0,
        max: 100_000,
        step: 100,
        format: 'currency',
    },
    {
        key: 'monthlyDeposit',
        label: 'Monthly deposit',
        min: 0,
        max: 5_000,
        step: 25,
        format: 'currency',
    },
    {
        key: 'annualInterestRate',
        label: 'Annual interest rate',
        min: 0,
        max: 15,
        step: 0.1,
        format: 'percent',
    },
]

type Props = {
    values: ProjectionParams
    onChange: (key: keyof ProjectionParams, value: number) => void
}

export const formatValue = (value: number, format: InputFormat): string => {
    return format === 'percent' ? `${value.toFixed(2)}%` : formatCurrency(value)
}

const sharedInputStyles = {
    border: `1px solid ${theme.colors.grey3}`,
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
    width: '140px',
    background: theme.colors.white,
    outline: 'none',
}

const InputControls = ({ values, onChange }: Props) => (
    <Box display="flex" flexDirection="column" gap={5}>
        {INPUTS.map((spec) => {
            const value = values[spec.key]

            const handleSlider = (event: ChangeEvent<HTMLInputElement>) => {
                const next = clamp(Number(event.target.value), spec.min, spec.max)
                onChange(spec.key, next)
            }

            const handleNumber = (event: ChangeEvent<HTMLInputElement>) => {
                const raw = event.target.value
                if (raw === '') {
                    onChange(spec.key, spec.min)
                    return
                }
                const parsed = Number(raw)
                if (!Number.isFinite(parsed)) {
                    return
                }
                onChange(spec.key, clamp(parsed, spec.min, spec.max))
            }

            return (
                <Box key={spec.key}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <label
                            htmlFor={`${spec.key}-range`}
                            style={{
                                fontWeight: theme.fontWeights.medium,
                                color: theme.colors.text,
                            }}
                        >
                            {spec.label}
                        </label>
                        <input
                            id={`${spec.key}-number`}
                            aria-label={`${spec.label} value`}
                            type="number"
                            min={spec.min}
                            max={spec.max}
                            step={spec.step}
                            value={value}
                            onChange={handleNumber}
                            style={sharedInputStyles}
                        />
                    </Box>
                    <input
                        id={`${spec.key}-range`}
                        aria-label={`${spec.label} slider`}
                        type="range"
                        min={spec.min}
                        max={spec.max}
                        step={spec.step}
                        value={value}
                        onChange={handleSlider}
                        style={{
                            width: '100%',
                            accentColor: theme.colors.primary,
                        }}
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        color={theme.colors.grey5}
                        fontSize={theme.fontSizes.xs}
                        mt={1}
                    >
                        <span>{formatValue(spec.min, spec.format)}</span>
                        <span>{formatValue(spec.max, spec.format)}</span>
                    </Box>
                </Box>
            )
        })}
    </Box>
)

export default InputControls

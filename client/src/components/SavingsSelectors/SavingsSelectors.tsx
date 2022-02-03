import React from 'react'
import SliderWithOverride from '../SliderWithOverride'
import { numberFormatter, SAVINGS_DEFAULTS } from '../../lib'
import type { ISavingsInputs } from '../../lib'

type Props = {
    savingsInputs: ISavingsInputs
    handleChange: (savingsInput: string) => (newValue: number | string) => void
}

const SavingsSelectors = ({ savingsInputs, handleChange }: Props) => (
    <>
        <SliderWithOverride
            value={savingsInputs.initialSavings}
            label="Initial savings "
            valueText={numberFormatter.format(savingsInputs.initialSavings)}
            name="initialSavings"
            min={SAVINGS_DEFAULTS.INITIAL_MIN}
            max={SAVINGS_DEFAULTS.INITIAL_MAX}
            step={SAVINGS_DEFAULTS.INITIAL_STEP}
            onChange={handleChange('initialSavings')}
            ariaLabel="slider-savings"
        />
        <SliderWithOverride
            value={savingsInputs.monthlyDeposit}
            label="Monthly deposit "
            valueText={numberFormatter.format(savingsInputs.monthlyDeposit)}
            name="monthlyDeposit"
            min={SAVINGS_DEFAULTS.MONTHLY_MIN}
            max={SAVINGS_DEFAULTS.MONTHLY_MAX}
            step={SAVINGS_DEFAULTS.MONTHLY_STEP}
            onChange={handleChange('monthlyDeposit')}
            ariaLabel="slider-monthly"
        />
        <SliderWithOverride
            value={savingsInputs.interestRate}
            label="Interest Rate "
            valueText={`${savingsInputs.interestRate}%`}
            name="interestRate"
            min={SAVINGS_DEFAULTS.INTEREST_MIN}
            max={SAVINGS_DEFAULTS.INTEREST_MAX}
            step={SAVINGS_DEFAULTS.INTEREST_STEP}
            onChange={handleChange('interestRate')}
            ariaLabel="slider-interest"
        />
    </>
)

export default SavingsSelectors

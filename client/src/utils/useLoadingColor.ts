import { useEffect, useRef, useState } from 'react'

import theme from '../theme'

export const useLoadingColor = (loading: boolean = false, transitionTimeMS = 400) => {
    const [color, setColor] = useState(theme.colors.primary)
    const interval = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const returnToDefaults = () => {
            setColor(theme.colors.primary)
            if (interval.current !== null) {
                clearInterval(interval.current)
            }
        }

        if (loading) {
            interval.current = setInterval(() => {
                console.log('happening')
                setColor(
                    (currentColor) =>
                        [theme.colors.primary, theme.colors.grey3].filter(
                            (color) => color !== currentColor
                        )[0]
                )
            }, transitionTimeMS)
        } else {
            returnToDefaults()
        }

        return returnToDefaults
    }, [loading, transitionTimeMS])

    return color
}

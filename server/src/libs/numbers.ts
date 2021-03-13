export const roundValue = (value: number, scale: number = 2) => {
  const rounded = + value.toFixed(scale)
  return rounded
}
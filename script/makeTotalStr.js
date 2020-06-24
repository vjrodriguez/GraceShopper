export default function makeTotalString(amount) {
  return (
    amount.toString().slice(0, amount.toString().length - 2) +
    '.' +
    amount.toString().slice(amount.toString().length - 2)
  )
}

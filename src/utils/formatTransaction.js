function format(value) {
  return value < 10 ? `0${value}` : value
}

export default (transaction) => {
  const date = new Date(transaction.timestamp)

  return {
    id: transaction.id,
    віддаю: `${transaction.from.amount} ${transaction.from.currency}`,
    отримую: `${transaction.to.amount} ${transaction.to.currency}`,
    'по курсу': `1 = ${transaction.rate}`,
    дата: `${format(date.getDate())}.${format(date.getMonth())}.${date.getFullYear()} ${format(
      date.getHours()
    )}:${format(date.getMinutes())}`
  }
}

interface Expense {
  _id: string
  date: Date
  item: string
  amount: number
  currency: string
  category: string
}

const RecentExpenses = ({ expenses }) => {
  expenses = expenses || []
  return expenses.map((obj: Expense) => (
    <div>
      <h3>{String(obj.date)}</h3>
      <div>{obj.item}</div>
      <div>{obj.amount}</div>
      <div>{obj.currency}</div>
      <div>{obj.category}</div>
    </div>
  ))
}

export default RecentExpenses

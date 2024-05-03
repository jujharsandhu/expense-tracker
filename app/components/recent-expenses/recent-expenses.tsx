import { DataTable } from '@/components'

interface Expense {
  _id: string
  date: Date
  item: string
  amount: number
  currency: string
  category: string
}

const headers = [
  'Date',
  'Item',
  'Amount',
  'Currency',
  'Category',
  'Note',
  'Edit',
]

const filterExpenses = (expenses: Expense[]) => {
  const allowed = ['date', 'item', 'amount', 'currency', 'category', 'note']
  const newExpenses = expenses.map((expense) => {
    const newExp = {}
    for (const attribute of allowed) {
      newExp[attribute] = expense[attribute] || '-'
    }
    return newExp
  })

  return newExpenses
}

const RecentExpenses = ({ expenses }) => {
  expenses = expenses || []

  const cleanExpenses = filterExpenses(expenses)

  return <DataTable headerRow={headers} data={cleanExpenses} />
}

export default RecentExpenses

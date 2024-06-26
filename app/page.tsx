import { RecentExpenses } from '@/components'

const Header = ({ title }) => {
  return <h1>{title ? title : 'Default title'}</h1>
}

const HomePage = async () => {
  const result = await fetch(`${process.env.URL}/api/get-expense`)
  const recentExpenses = await result.json()
  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <h2>Recent Expenses</h2>
      <RecentExpenses expenses={recentExpenses} />
    </div>
  )
}
export default HomePage

import { RecentExpenses } from '@/component'
import { clientPromise, FindExpenses } from '@/api'
import { MongoClient } from 'mongodb'

const Header = ({ title }) => {
  return <h1>{title ? title : 'Default title'}</h1>
}

const HomePage = async () => {
  const testingres = await fetch('http://localhost:3000/api/get-expense')
  const testing = JSON.stringify(testingres)
  console.log('response: ', testing)
  let recentExpenses

  try {
    const client: MongoClient = await clientPromise
    const result = await FindExpenses(client, {})
    recentExpenses = JSON.parse(JSON.stringify(result))
  } catch (e) {
    console.error(e)
    location.reload()
    recentExpenses = []
  }
  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <h2>Recent Expenses</h2>
      <RecentExpenses expenses={recentExpenses} />
    </div>
  )
}
export default HomePage

import { RecentExpenses } from "./components/recent-expenses/"

const Header = ({ title }) => {
  return <h1>{title ? title : 'Default title'}</h1>
}

const HomePage = async () => {
  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <h2>this is where is dashboard is at</h2>
      <RecentExpenses />
    </div>
  )
}
export default HomePage

import { clientPromise } from '@/api'

const Header = ({ title }) => {
  return <h1>{title ? title : 'Default title'}</h1>
}

const HomePage = async () => {
  try {
    const client = await clientPromise
    console.log('connected')
  } catch (e) {
    console.error(e)
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <h2>this is where is dashboard is at</h2>
    </div>
  )
}
export default HomePage

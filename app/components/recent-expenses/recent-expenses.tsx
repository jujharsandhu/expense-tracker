import { clientPromise, FindExpenses } from '@/api'
import { MongoClient } from 'mongodb'

const RecentExpenses = async () => {
    let client:MongoClient
    try {
        client = await clientPromise
        console.log('connected')
    } catch (e) {
        console.error(e)
        location.reload()
    }

    const recentExpenses = await FindExpenses(client, {})
    console.log(recentExpenses)      
    return recentExpenses.map((obj) => 
                { return (<div>
                    <h3>{obj.date}</h3>
                    <div>{obj.item}</div>
                    <div>{obj.amount}</div>
                    <div>{obj.currency}</div>
                    <div>{obj.category}</div>
                </div>)}
    )
    
}

export default RecentExpenses
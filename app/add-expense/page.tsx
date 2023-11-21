import {getMongoClient} from './../api'

const AddExpense = async () => {
    const mongoClient = await getMongoClient()
    const databasesList = await mongoClient.db().admin().listDatabases()
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
    
    return (<h1>Add Expense Here</h1>)
}

export default AddExpense
import {MongoClient} from 'mongodb'


const FetchData = async (mongoClient: MongoClient) => {
    const databasesList = await mongoClient.db().admin().listDatabases()
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}

export default FetchData

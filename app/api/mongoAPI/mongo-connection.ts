import mongoURI from './mongo-logins'
import {MongoClient} from 'mongodb'

var mongoClient;

const MongoConnect = async () => {
    const client = new MongoClient(mongoURI);
    try {
        await client.connect()
        mongoClient = client
        // mongoClient = client.mongoClient("expenses")
        console.log("connected");
    } catch(e) {
        console.error(`Mongo Connection Error: ${e}`)
    }
}

export const getMongoClient = async () => {
    
    console.log("mongoClient", mongoClient);
    if (!!mongoClient) {
        await MongoConnect()
    }
    return mongoClient
}

export default MongoConnect

import mongoURI from './mongo-logins'
import {MongoClient} from 'mongodb'
import FetchData from './fetch-data'

export var mongoClient;

const client = new MongoClient(mongoURI)

const MongoConnect = async () => {
    try {
        await client.connect()
            .then((client) => {mongoClient = client});
        
            console.log("connected");
        await FetchData(mongoClient)

    } catch(e) {
        console.error(`Mongo Connection Error: ${e}`)
    }
}

export const MongoFetch = async () => {
    await FetchData(mongoClient)
} 

export default MongoConnect

import {MongoClient} from 'mongodb'
import FetchData from './fetch-data'

export var mongoClient;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

const mongoURI = process.env.MONGODB_URI
const client = new MongoClient(mongoURI)

const MongoConnect = async () => {
    try {
        await client.connect()
            .then((client) => {mongoClient = client});
        
            console.log("connected");
    } catch(e) {
        console.error(`Mongo Connection Error: ${e}`)
    }
}

export const MongoFetch = async () => {
    await FetchData(mongoClient)
} 

export default MongoConnect

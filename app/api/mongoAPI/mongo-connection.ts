import mongoURI from './mongo-logins'
import {MongoClient} from 'mongodb'
import FetchData from './fetch-data'

export var mongoClient;

const MongoConnect = async () => {
    try {
        new MongoClient(mongoURI).connect()
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

import { MongoClient, ServerApiVersion } from "mongodb";

export let mongoClient: MongoClient;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

const mongoURI = process.env.MONGODB_URI
const options = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
};

let client: MongoClient
let clientPromise: Promise<MongoClient>

client = new MongoClient(mongoURI, options);
clientPromise = client.connect();

export default clientPromise

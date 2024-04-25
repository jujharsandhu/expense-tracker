import {MongoClient} from 'mongodb'

/**
 * example query:
 * {
 *  currency: "USD",
 * }
 */

export const FindOneExpense = async (client: MongoClient, query: Object) => {
    const result = await client.db("expenses").collection("dev-playground").findOne(query)

    if (result) {
        console.log(`Found a listing in the collection:`);
        console.log(result);
    } else {
        console.log(`No listings found, query: '`);
        console.log(query)
    }
}

export const FindExpenses = async (client: MongoClient, query: Object) => {
    const cursor = await client.db("expenses").collection("dev-playground").find(query).sort({date: -1})
    const result = await cursor.toArray()
    if (result) {
        console.log(`Found listing(s) in the collection:`);
        console.log(result);
    } else {
        console.log(`No listings found, query: '`);
        console.log(query)
    }
}
import { MongoClient } from 'mongodb'

/**
 * example query:
 * {
 *  currency: "USD",
 * }
 */

export const FindOneExpense = async (client: MongoClient, query: Object) => {
  const result = await client
    .db('expenses')
    .collection('dev-playground')
    .findOne(query)
  if (result) {
    return result
  } else {
    return {}
  }
}

export const FindExpenses = async (client: MongoClient, query: Object) => {
  const cursor = await client
    .db('expenses')
    .collection('dev-playground')
    .find(query)
    .sort({ date: -1 })
  const result = await cursor.toArray()
  if (result) {
    return result
  } else {
    return []
  }
}

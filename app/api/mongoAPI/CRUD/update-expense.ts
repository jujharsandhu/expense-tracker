import { MongoClient } from 'mongodb'

export const UpdateOneExpense = async (
  client: MongoClient,
  query,
  updatedQuery
) => {
  await client
    .db('expenses')
    .collection('dev-playground')
    .updateOne(query, { $set: updatedQuery })
}

export const UpdateManyExpenses = async (
  client: MongoClient,
  query,
  updatedQuery
) => {
  await client
    .db('expenses')
    .collection('dev-playground')
    .updateMany(query, { $set: updatedQuery })
}

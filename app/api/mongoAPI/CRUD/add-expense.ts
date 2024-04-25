import { MongoClient } from 'mongodb'

/**
example expense: 
{
    date: new Date(),
    item: "dinner",
    amount: "200",
    currency: "TWD",
    category: "food"
},
*/

export const CreateExpense = async (
  client: MongoClient,
  newExpense: Object
) => {
  const res = await client
    .db('expenses')
    .collection('dev-playground')
    .insertOne(newExpense)
  console.log('expense created with id: ', res.insertedId)
}

export const CreateMultipleExpenses = async (
  client: MongoClient,
  newExpense
) => {
  const res = await client
    .db('expenses')
    .collection('dev-playground')
    .insertMany(newExpense, { ordered: true })
  console.log(`${res.insertedCount} expense(s) created with id:`)
  console.log(res.insertedIds)
}

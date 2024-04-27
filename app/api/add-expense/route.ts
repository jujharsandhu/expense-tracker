import { clientPromise, CreateExpense } from '@/api'
import { MongoClient } from 'mongodb'

export async function GET(req) {
  return new Response('This is a new API route')
}

export async function PUT(req) {
  console.log(req)
  try {
    const client: MongoClient = await clientPromise
    console.log('connected')
    const result = await CreateExpense(client, req)
    console.log(result)
    // recentExpenses = JSON.parse(JSON.stringify(result))
  } catch (e) {
    console.error(e)
    location.reload()
    // recentExpenses = []
  }
}

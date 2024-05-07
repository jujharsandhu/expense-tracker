import { clientPromise } from '@/api'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  let allCurrencies
  try {
    const client: MongoClient = await clientPromise
    const cursor = await client
      .db('expenses')
      .collection('currencies')
      .find(req)
      .sort({ lastUsed: -1, currency: 1 })
    const result = await cursor.toArray()
    if (result) {
      allCurrencies = result
    } else {
      allCurrencies = []
    }
  } catch (e) {
    console.error(e)
    allCurrencies = []
  }
  return new NextResponse(JSON.stringify(allCurrencies))
}

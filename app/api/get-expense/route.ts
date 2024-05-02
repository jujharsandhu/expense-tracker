import { FindExpenses, clientPromise } from '@/api'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  let recentExpenses
  try {
    const client: MongoClient = await clientPromise
    recentExpenses = await FindExpenses(client, req)
  } catch (e) {
    console.error(e)
    location.reload()
    recentExpenses = []
  }
  return new NextResponse(JSON.stringify(recentExpenses))
}

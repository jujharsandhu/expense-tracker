import { clientPromise, FindExpenses } from '@/api'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  let recentExpenses
  try {
    const client: MongoClient = await clientPromise
    const result = await FindExpenses(client, req)
    recentExpenses = JSON.parse(JSON.stringify(result))
  } catch (e) {
    console.error(e)
    location.reload()
    recentExpenses = []
  }
  return new NextResponse(recentExpenses)
}

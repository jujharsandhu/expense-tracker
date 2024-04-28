import { clientPromise, CreateExpense } from '@/api'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET(req) {
  return new Response('This is a new API route')
}

export async function POST(req: Request) {
    
  const requestBody = await req.json()
  console.log('requestBody: ', requestBody)
  try {
    const client: MongoClient = await clientPromise
    console.log('connected')
    // const result = await CreateExpense(client, req)
    // console.log(result)
    // recentExpenses = JSON.parse(JSON.stringify(result))
  } catch (e) {
    console.error(e)
    location.reload()
    // recentExpenses = []
  }
  return new NextResponse("hello i am put")
}

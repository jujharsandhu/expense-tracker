import { clientPromise } from '@/api'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
import * as catalog from '@/lib/all-currencies.json'

export async function GET() {
  const data = catalog.catalog
  const newData = []
  for (const object of data) {
    newData.push({
      ...object,
      abbreviation: object.label,
      label: `${object.currency} (${object.label})`,
      lastUsed: '',
    })
  }
  try {
    const client: MongoClient = await clientPromise
    const res = await client
      .db('expenses')
      .collection('currencies')
      .insertMany(newData, { ordered: true })
    console.log(`${res.insertedCount} created with id`)
  } catch (e) {
    console.error(e)
  }
  return new NextResponse(JSON.stringify(newData))
}

import { NextRequest } from 'next/server'

export const putData = async (param) => {
  const test = new NextRequest(`${process.env.URL}/api/add-expense`, {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await fetch(test)
  return 'finished'
}

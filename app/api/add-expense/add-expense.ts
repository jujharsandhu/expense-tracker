import { NextRequest } from 'next/server'

export const putData = async (param) => {
  const req = new NextRequest(`${process.env.URL}/api/add-expense`, {
    method: 'POST',
    body: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const result = await fetch(req)
  return 'finished'
}

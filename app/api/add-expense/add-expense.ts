import { NextRequest } from "next/server"

export const putData = async (param) => {
    const test = new NextRequest('http://localhost:3000/api/add-expense', {
        method: 'POST',
        body: JSON.stringify(param),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await fetch(test)
    return "finished"
}
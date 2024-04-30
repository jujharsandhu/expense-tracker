import { Suspense } from 'react'
import { AddExpense } from '@/components'

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading module...</p>}>
        <AddExpense />
      </Suspense>
    </section>
  )
}

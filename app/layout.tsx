import { ExpenseDialog, UpdateExpense } from './components'
import { CurrencyProvider } from '@/lib/index'
export const metadata = {
  title: 'expense-track stonks',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>this is the nav</div>
        <CurrencyProvider>
          <ExpenseDialog />
          <UpdateExpense />
          {children}
        </CurrencyProvider>
      </body>
    </html>
  )
}

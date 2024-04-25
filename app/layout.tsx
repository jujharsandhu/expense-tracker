import {MongoConnect} from "@/api"

export const metadata = {
  title: 'expense-track stonks',
  description: 'Generated by Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // await MongoConnect()
  return (
    <html lang="en">
      <body>
        <div>this is the nav</div>
        {children}
      </body>
    </html>
  )
}

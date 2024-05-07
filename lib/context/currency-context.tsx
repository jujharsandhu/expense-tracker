'use client'

import { createContext, useEffect, useState, useContext } from 'react'

const CurrencyContext = createContext({})

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const getCurrencies = async () => {
      const result = await fetch('/api/get-currencies')
      const allCurrencies = await result.json()
      setCurrencies(allCurrencies)
    }
    getCurrencies()
  }, [])
  return (
    <CurrencyContext.Provider value={currencies}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}

export default CurrencyProvider

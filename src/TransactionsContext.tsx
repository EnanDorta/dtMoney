import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

interface Transactions {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string,
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transactions[];
  createTransactions: (transaction: TransactionsInput) => void;
}

type TransactionsInput = Omit<Transactions, 'id' | 'createdAt'>

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps ) {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('transactions')
    .then( response => setTransactions(response.data.transactions))
  }, [])

  function createTransactions(transaction: TransactionsInput) {
    api.post('/transactions', transaction)
  }

  return(
    <TransactionsContext.Provider value={{ transactions, createTransactions}}>
      { children }
    </TransactionsContext.Provider>
  )
}
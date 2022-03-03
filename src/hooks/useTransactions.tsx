import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

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

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
)

export function TransactionsProvider({ children }: TransactionsProviderProps ) {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('transactions')
    .then( response => setTransactions(response.data.transactions))
  }, [])

  async function createTransactions(transactionInput: TransactionsInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    const { transaction } = response.data
    console.log(transaction)
    console.log(transactions)
    setTransactions([
      ...transactions,
      transaction
   ])
  }
  return(
    <TransactionsContext.Provider value={{ transactions, createTransactions}}>
      { children }
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}
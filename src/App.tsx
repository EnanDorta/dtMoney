import { useState } from "react";
import Modal from "react-modal";
import { TransactionsProvider } from './hooks/useTransactions'


import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root');

export function App() {
  //State for know, case modal is open or is close.
  const [isNewTransactionModalOpen, SetIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    //change modal state for true
    SetIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal() {
    //change modal state for false
    SetIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>

      <Dashboard />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      
      <GlobalStyle />
    </TransactionsProvider> 
  )
}

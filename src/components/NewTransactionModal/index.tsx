import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

import Modal from 'react-modal';

import outcomeImg from '../../assets/outcome.svg'
import incomeImg from '../../assets/income.svg'
import closeImg from '../../assets/close.svg'

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  //save state from button
  const { createTransactions } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('deposit')
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction (event: FormEvent) {
    event.preventDefault();
    
    if (title === '') return alert('Preencha o campo title')
    if (amount === 0) return alert('Preencha o campo valor')
    if (category === '') return alert('Preencha o campo caterogia')

    await createTransactions({
      title,
      type,
      category, 
      amount,
    })

    onRequestClose()

    setTitle('')
    setAmount(0)
    setType('')
    setCategory('')
  }

  return (
    <Modal 
      //modal is open? run function in component App.tsx
      isOpen={isOpen}
      //close modal? run function in component App.tsx
      onRequestClose={onRequestClose}

      overlayClassName="react-modal-overlay"

      className="react-modal-content" 
      >
        
        <button
         type="button"
         onClick={onRequestClose}
         className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction} >
        <h2>Cadastrar nova transação</h2>
        
        <input 
          placeholder="Título" 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input 
          type="number"
          placeholder="Valor" 
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
           type="button"
           onClick={() => { setType('deposit') }}
           isActive={type === 'deposit'}
           activeColor = "green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
           type="button" 
           onClick={() => { setType('withdraw') }}
           isActive={type === 'withdraw'} 
           activeColor = "red"    
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input 
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)} 
        />
        <button type="submit">
          Cadastrar
        </button>

        </Container>
        
      </Modal>
  )
}
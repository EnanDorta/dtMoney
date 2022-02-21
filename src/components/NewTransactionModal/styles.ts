import styled from "styled-components";
import { darken } from "polished"

export const Container = styled.form`
  h2 {
    text-align: left;
    font-size: 1.5rem;
    color: var(--text-title);
    line-height: 2.25rem;
    margin-bottom: 1.5rem;
  }
  ::placeholder {
    margin-left: 0.5rem;
    color: var(--text-body);
  }
  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #D7D7D7;
    background: #E7E9EE;
  
  & + input {
    margin-top: 0.8rem;
  }
}
button[type="submit"] {
  width: 100%;
  padding: 0 1.5rem;
  height: 4rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  background: var(--green);
  color: #fff;
  margin-top: 1.5rem;
  border-radius: 0.25rem;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
}
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  button {
    height: 4rem;
    border: 1px solid #D7D7D7;
    border-radius: 0.25rem;

    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: ${darken(0.1, '#D7D7D7')};
    }
    img {
      width: 20px;
      height: 20px;
    }

    span {
      display: inline-block;
      margin-left: 1.5rem;
      font-size: 1rem;
      color: var(--text-title);
    }
  }
`;
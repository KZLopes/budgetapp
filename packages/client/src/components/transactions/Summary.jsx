import React from 'react';

const Summary = ({ transactions }) => {
  let income = 0,
    expenses = 0,
    balance = 0;

  transactions.forEach((transaction) => {
    balance += transaction.value;
    if (transaction.value >= 0) {
      income += transaction.value;
    } else {
      expenses += transaction.value;
    }
  });

  return (
    <section className='summary'>
      <h3>Resumo</h3>
      <div>
        <p>Saldo: R${balance}</p>
        <div className='details'>
          <span>Recebido: R${income}</span>
          <span>Gastos: R${expenses}</span>
        </div>
      </div>
    </section>
  );
};

export default Summary;

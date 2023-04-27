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
    <div className='summarycontainer'>
      <h3>Resumo</h3>
      <div className='summary'>
        <div className='balance'>
          <p>Saldo:</p>
          <p>R${balance}</p>
        </div>
        <div className='details'>
          <div>
            <p>Recebido:</p>
            <p className='income'>R${income}</p>
          </div>
          <div>
            <p>Gastos:</p>
            <p className='expenses'>R${expenses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

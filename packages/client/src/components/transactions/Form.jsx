import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../features/transaction/slice';

const Form = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState();

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTransaction({
        title: title,
        value: value,
        date: date,
      })
    );
    setTitle('');
    setDate('');
    setValue();
  };

  return (
    <div className='container'>
      <h3>Nova Transação</h3>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Transação</label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='value'>Valor</label>
            <input
              type='number'
              name='value'
              id='value'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='date'>Data da Transação</label>
            <input
              type='date'
              name='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              <FaPlus />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export { Form as TransactionForm };

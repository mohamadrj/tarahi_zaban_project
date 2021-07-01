import React, { useState, useContext, useEffect } from 'react';
import IncomeContext from '../../context/income/incomeContext';

const IncomeForm = () => {
  const incomeContext = useContext(IncomeContext);

  const { addIncome, current, clearCurrent, updateIncome } = incomeContext;

  useEffect(() => {
    if (current !== null) {
      setIncome(current);
    } else {
      setIncome({
        num: '',
        total: '',
        spend: '',
        profit: '',
      });
    }
  }, [incomeContext, current]);

  const [income, setIncome] = useState({
    num: '',
    total: '',
    spend: '',
    profit: '',
  });

  const { num, total, spend, profit } = income;

  const onChange = (e) =>
    setIncome({ ...income, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addIncome(income);
    } else {
      updateIncome(income);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>{current ? 'Edit Income' : 'Add Income'}</h3>
      <input
        type='text'
        name='num'
        placeholder='ID Of Film'
        value={num}
        onChange={onChange}
      />
      <input
        type='text'
        name='total'
        placeholder='Total Price'
        value={total}
        onChange={onChange}
      />
      <input
        type='text'
        name='spend'
        placeholder='Spending'
        value={spend}
        onChange={onChange}
      />
      <input
        name='profit'
        type='text'
        placeholder='Profit'
        value={profit}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Income' : 'Add Income'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear All
          </button>
        </div>
      )}
    </form>
  );
};

export default IncomeForm;

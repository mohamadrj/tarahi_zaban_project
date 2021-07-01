import React, { useContext, useRef, useEffect } from 'react';
import IncomeContext from '../../context/income/incomeContext';

const IncomeFilter = () => {
  const incomeContext = useContext(IncomeContext);

  const text = useRef('');

  const { filterIncomes, clearFilter, filtered } = incomeContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterIncomes(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Incomes...'
        onChange={onChange}
      />
    </form>
  );
};
export default IncomeFilter;

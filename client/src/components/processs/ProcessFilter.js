import React, { useContext, useRef, useEffect } from 'react';
import ProcessContext from '../../context/process/processContext';

const ProcessFilter = () => {
  const processContext = useContext(ProcessContext);

  const text = useRef('');

  const { filterProcesss, clearFilter, filtered } = processContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterProcesss(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Processs...'
        onChange={onChange}
      />
    </form>
  );
};
export default ProcessFilter;

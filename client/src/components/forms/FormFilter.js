import React, { useContext, useRef, useEffect } from 'react';
import FormContext from '../../context/form/formContext';

const FormFilter = () => {
  const formContext = useContext(FormContext);

  const text = useRef('');

  const { filterForms, clearFilter, filtered } = formContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterForms(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Forms...'
        onChange={onChange}
      />
    </form>
  );
};
export default FormFilter;

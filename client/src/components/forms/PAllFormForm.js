import React, { useState, useContext, useEffect } from 'react';
import FormContext from '../../context/form/formContext';

const PAllFormForm = () => {
  const formContext = useContext(FormContext);

  const { current, clearCurrent, updateallForm } = formContext;

  useEffect(() => {
    if (current !== null) {
      setForm(current);
    } else {
      setForm({
        price: 'Waiting',
      });
    }
  }, [formContext, current]);

  const [form, setForm] = useState({
    price: 'Waiting',
  });

  const { price } = form;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    updateallForm(form);

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>
        {current ? 'Edit Price' : 'Click Edit If You Want'}
      </h3>
      <input
        type='text'
        name='price'
        placeholder='Price'
        value={price}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Edit Price' : 'Choose One Of The Movie'}
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

export default PAllFormForm;

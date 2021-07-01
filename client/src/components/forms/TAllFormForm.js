import React, { useState, useContext, useEffect } from 'react';
import FormContext from '../../context/form/formContext';

const TAllFormForm = () => {
  const formContext = useContext(FormContext);

  const { current, clearCurrent, updateallForm } = formContext;

  useEffect(() => {
    if (current !== null) {
      setForm(current);
    } else {
      setForm({
        stat: 'Not Started',
      });
    }
  }, [formContext, current]);

  const [form, setForm] = useState({
    stat: 'Not Started',
  });

  const { stat } = form;

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
        {current ? 'Edit Process' : 'Click Edit If You Want'}
      </h3>
      <input
        type='radio'
        name='stat'
        value='Not Started'
        onChange={onChange}
        checked={stat === 'Not Started'}
      />
      Not Started{' '}
      <input
        type='radio'
        name='stat'
        value='first step'
        onChange={onChange}
        checked={stat === 'first step'}
      />
      First Step{' '}
      <input
        type='radio'
        name='stat'
        value='second step'
        onChange={onChange}
        checked={stat === 'second step'}
      />
      Second Step{' '}
      <input
        type='radio'
        name='stat'
        value='finish'
        onChange={onChange}
        checked={stat === 'finish'}
      />
      Finish{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Edit Process' : 'Choose One Of The Movie'}
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

export default TAllFormForm;

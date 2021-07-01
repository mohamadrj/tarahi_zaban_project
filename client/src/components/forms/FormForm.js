import React, { useState, useContext, useEffect } from 'react';
import FormContext from '../../context/form/formContext';

const FormForm = () => {
  const formContext = useContext(FormContext);

  const { addForm, current, clearCurrent, updateForm } = formContext;

  useEffect(() => {
    if (current !== null) {
      setForm(current);
    } else {
      setForm({
        emaill: '',
        movid: '',
        time: '1 min',
        clas: 'A',
        quality: 'HD',
        camtype: 'DSLR',
        move: 'Mobile',
        stat: 'Not Started',
        price: 'Waiting',
        more: 'Nothing',
      });
    }
  }, [formContext, current]);

  const [form, setForm] = useState({
    emaill: '',
    movid: '',
    time: '1-5min',
    clas: 'A',
    quality: 'HD',
    camtype: 'DSLR',
    move: 'Mobile',
    stat: 'Not Started',
    price: 'Waiting',
    more: 'Nothing',
  });

  const { movid, time, clas, quality, camtype, move, stat, price, more } = form;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addForm(form);
    } else {
      updateForm(form);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>{current ? 'Edit Order' : 'Add Order'}</h3>
      <input type='hidden' name='stat' value={stat} onChange={onChange} />
      <input type='hidden' name='price' value={price} onChange={onChange} />
      <input
        type='text'
        name='movid'
        placeholder='Movie id'
        value={movid}
        onChange={onChange}
      />
      <h5>Movie Time</h5>
      <input
        type='radio'
        name='time'
        value='1-5min'
        onChange={onChange}
        checked={time === '1-5min'}
      />
      1-5 Min{' '}
      <input
        type='radio'
        name='time'
        value='5-10 min'
        onChange={onChange}
        checked={time === '5-10 min'}
      />
      5-10 Min{' '}
      <input
        type='radio'
        name='time'
        value='More than 10 min'
        onChange={onChange}
        checked={time === 'More than 10 min'}
      />
      More than 10 min
      <h5>Movie Class</h5>
      <input
        type='radio'
        name='clas'
        value='A'
        onChange={onChange}
        checked={clas === 'A'}
      />
      A{' '}
      <input
        type='radio'
        name='clas'
        value='B'
        onChange={onChange}
        checked={clas === 'B'}
      />
      B{' '}
      <input
        type='radio'
        name='clas'
        value='C'
        onChange={onChange}
        checked={clas === 'C'}
      />
      C<h5>Movie Quality</h5>
      <input
        type='radio'
        name='quality'
        value='HD'
        onChange={onChange}
        checked={quality === 'HD'}
      />
      HD{' '}
      <input
        type='radio'
        name='quality'
        value='FHD'
        onChange={onChange}
        checked={quality === 'FHD'}
      />
      FHD{' '}
      <input
        type='radio'
        name='quality'
        value='UHD'
        onChange={onChange}
        checked={quality === 'UHD'}
      />
      UHD
      <h5>Camera Model</h5>
      <input
        type='radio'
        name='camtype'
        value='DSLR'
        onChange={onChange}
        checked={camtype === 'DSLR'}
      />
      DSLR{' '}
      <input
        type='radio'
        name='camtype'
        value='Compact'
        onChange={onChange}
        checked={camtype === 'Compact'}
      />
      Compact{' '}
      <input
        type='radio'
        name='camtype'
        value='professional'
        onChange={onChange}
        checked={camtype === 'professional'}
      />
      professional
      <h5>Move Model</h5>
      <input
        type='radio'
        name='move'
        value='Mobile'
        onChange={onChange}
        checked={move === 'Mobile'}
      />
      Mobile{' '}
      <input
        type='radio'
        name='move'
        value='Fixed'
        onChange={onChange}
        checked={move === 'Fixed'}
      />
      Fixed{' '}
      <input
        type='radio'
        name='move'
        value='Aerial'
        onChange={onChange}
        checked={move === 'Aerial'}
      />
      Aerial
      <h5>Your More Expectations:</h5>
      <br />
      <textarea
        name='more'
        value={more}
        placeholder='More...'
        cols='30'
        rows='10'
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Form' : 'Add Form'}
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

export default FormForm;

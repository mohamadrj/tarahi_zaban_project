import React, { useState, useContext, useEffect } from 'react';
import ProcessContext from '../../context/process/processContext';

const ProcessForm = () => {
  const processContext = useContext(ProcessContext);

  const { addProcess, current, clearCurrent, updateProcess } = processContext;

  useEffect(() => {
    if (current !== null) {
      setProcess(current);
    } else {
      setProcess({
        movid: '',

        status: 'not started',
      });
    }
  }, [processContext, current]);

  const [process, setProcess] = useState({
    movid: '',

    status: 'not started',
  });

  const { movid, status } = process;

  const onChange = (e) =>
    setProcess({ ...process, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addProcess(process);
    } else {
      updateProcess(process);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>
        {current ? 'Edit Process' : 'Add Process'}
      </h3>
      <input
        type='text'
        name='movid'
        placeholder='movid'
        value={movid}
        onChange={onChange}
      />
      <h5>Status:</h5>
      <input
        type='radio'
        name='status'
        value='not started'
        onChange={onChange}
        checked={status === 'not started'}
      />
      Not Started{' '}
      <input
        type='radio'
        name='status'
        value='first step'
        onChange={onChange}
        checked={status === 'first step'}
      />
      First Step{' '}
      <input
        type='radio'
        name='status'
        value='second step'
        onChange={onChange}
        checked={status === 'second step'}
      />
      Second Step{' '}
      <input
        type='radio'
        name='status'
        value='finish'
        onChange={onChange}
        checked={status === 'finish'}
      />
      Finish{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Process' : 'Add Process'}
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

export default ProcessForm;

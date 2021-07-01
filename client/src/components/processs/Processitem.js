import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ProcessContext from '../../context/process/processContext';

const Processitem = ({ process }) => {
  const processContext = useContext(ProcessContext);
  const { deleteProcess, setCurrent, clearCurrent } = processContext;

  const { _id, movid, status } = process;

  const onDelete = () => {
    deleteProcess(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <i className='fas fa-file-alt'></i> {movid}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (status === 'not started' ? 'badge-danger' : 'badge-success')
          }
        >
          {status}
        </span>
      </h3>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(process)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

Processitem.propTypes = {
  process: PropTypes.object.isRequired,
};

export default Processitem;

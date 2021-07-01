import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../context/form/formContext';

const PAllFormitem = ({ form }) => {
  const formContext = useContext(FormContext);
  const { deleteallForm, setCurrent, clearCurrent } = formContext;

  const { _id, movid, price } = form;

  const onDelete = () => {
    deleteallForm(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <ul className='list'>
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (price === 'Waiting' ? 'badge-danger' : 'badge-success')
          }
        >
          {price}
        </span>
        <li>
          <h3 className='text-primary text-left'>
            Movie ID:
            <span className='badge badge-success'>{movid}</span>
          </h3>
        </li>
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(form)}
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

PAllFormitem.propTypes = {
  form: PropTypes.object.isRequired,
};

export default PAllFormitem;

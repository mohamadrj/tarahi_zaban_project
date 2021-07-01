import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../context/form/formContext';

const TAllFormitem = ({ form }) => {
  const formContext = useContext(FormContext);
  const { deleteallForm, setCurrent, clearCurrent } = formContext;

  const { _id, movid, time, clas, quality, camtype, move, stat } = form;

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
            'badge ' +
            (stat === 'Not Started' ? 'badge-danger' : 'badge-success')
          }
        >
          {stat}
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

TAllFormitem.propTypes = {
  form: PropTypes.object.isRequired,
};

export default TAllFormitem;

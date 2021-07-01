import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../context/form/formContext';

const TEAllFormitem = ({ form }) => {
  const formContext = useContext(FormContext);
  const { deleteallForm, setCurrent, clearCurrent } = formContext;

  const { _id, movid, time, clas, quality, camtype, move, more } = form;

  const onDelete = () => {
    deleteallForm(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <ul className='list'>
        <li>
          <h3 className='text-primary text-left'>
            Movie ID:
            <span className='badge badge-success'>{movid}</span>
          </h3>
        </li>
        <li>
          <h3 className='text-primary text-left'>
            Movie Time:
            <span className='badge badge-success'>{time}</span>
          </h3>
        </li>
        <li>
          <h3 className='text-primary text-left'>
            Movie Quality:
            <span className='badge badge-success'>{quality}</span>
          </h3>
        </li>
        <li>
          <h3 className='text-primary text-left'>
            Movie Class:
            <span className='badge badge-success'>{clas}</span>
          </h3>
        </li>
        <li>
          <h3 className='text-primary text-left'>
            Camera Model:
            <span className='badge badge-success'>{camtype}</span>
          </h3>
        </li>
        <li>
          <h3 className='text-primary text-left'>
            Move Model:
            <span className='badge badge-success'>{move}</span>
          </h3>
        </li>
        <li>
          <h3 className='text-primary text-left'>Customer Expectations : </h3>
          <span className='text-dark'>{more}</span>
        </li>
      </ul>
      <p>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

TEAllFormitem.propTypes = {
  form: PropTypes.object.isRequired,
};

export default TEAllFormitem;

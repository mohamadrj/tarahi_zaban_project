import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from '../../context/form/formContext';

const Formitem = ({ form }) => {
  const formContext = useContext(FormContext);
  const { deleteForm, setCurrent, clearCurrent } = formContext;

  const {
    _id,
    movid,
    time,
    clas,
    quality,
    camtype,
    move,
    stat,
    price,
    more,
  } = form;

  const onDelete = () => {
    deleteForm(_id);
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
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (price === 'Waiting' ? 'badge-danger' : 'badge-success')
          }
        >
          <i className='fas fa-dollar-sign'></i> {price}
        </span>
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
          <h3 className='text-primary text-left'>
            More:
            <span className='badge badge-success'>{more}</span>
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
        <input
          type={price === 'Waiting' ? 'hidden' : 'button'}
          className='btn btn-primary btn-sm'
          value='Pay'
        />
      </p>
    </div>
  );
};

Formitem.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Formitem;

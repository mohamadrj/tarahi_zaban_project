import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/user/userContext';

const Useritem = ({ user }) => {
  const userContext = useContext(UserContext);
  const { deleteallUser, setCurrent, clearCurrent } = userContext;

  const { _id, name, email } = user;

  const onDelete = () => {
    deleteallUser(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>{name}</h3>
      <h3 className='text-primary text-left'>{email}</h3>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(user)}
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

Useritem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Useritem;

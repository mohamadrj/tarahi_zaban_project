import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';

const UserForm = () => {
  const userContext = useContext(UserContext);

  const { current, clearCurrent, updateallUser } = userContext;

  useEffect(() => {
    if (current !== null) {
      setUser(current);
    } else {
      setUser({
        name: '',
        email: '',
      });
    }
  }, [userContext, current]);

  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const { name, email } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    updateallUser(user);

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>
        {current ? 'Edit User' : 'Click Edit if You Want'}
      </h3>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />

      <div>
        <input
          type='submit'
          value={current ? 'Update User' : 'Click One of Users'}
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

export default UserForm;

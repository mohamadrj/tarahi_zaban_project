import React, { Fragment, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Useritem from './Useritem';
import Spinner from '../layout/Spinner';

const Users = () => {
  const userContext = useContext(UserContext);

  const { users, filtered, getallUsers, loading } = userContext;

  useEffect(() => {
    getallUsers();
    //eslint-disable-next-line
  }, []);

  if (users !== null && users.length === 0 && !loading) {
    return <h4>Please Add User</h4>;
  }

  return (
    <Fragment>
      {users !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((user) => (
                <CSSTransition key={user._id} timeout={500} classNames='item'>
                  <Useritem user={user} />
                </CSSTransition>
              ))
            : users.map((user) => (
                <CSSTransition key={user._id} timeout={500} classNames='item'>
                  <Useritem user={user} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Users;

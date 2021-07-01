import React, { Fragment, useContext, useEffect } from 'react';
import FormContext from '../../context/form/formContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Formitem from './Formitem';
import Spinner from '../layout/Spinner';

const Forms = () => {
  const formContext = useContext(FormContext);

  const { forms, filtered, getForms, loading } = formContext;

  useEffect(() => {
    getForms();
    //eslint-disable-next-line
  }, []);

  if (forms !== null && forms.length === 0 && !loading) {
    return <h4>Please Add Form</h4>;
  }

  return (
    <Fragment>
      {forms !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((form) => (
                <CSSTransition key={form._id} timeout={500} classNames='item'>
                  <Formitem form={form} />
                </CSSTransition>
              ))
            : forms.map((form) => (
                <CSSTransition key={form._id} timeout={500} classNames='item'>
                  <Formitem form={form} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Forms;

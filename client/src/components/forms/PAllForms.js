import React, { Fragment, useContext, useEffect } from 'react';
import FormContext from '../../context/form/formContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PAllFormitem from './PAllFormitem';
import Spinner from '../layout/Spinner';

const PAllForms = () => {
  const formContext = useContext(FormContext);

  const { forms, filtered, getallForms, loading } = formContext;

  useEffect(() => {
    getallForms();
    //eslint-disable-next-line
  }, []);

  if (forms !== null && forms.length === 0 && !loading) {
    return <h4>Nothing....</h4>;
  }

  return (
    <Fragment>
      {forms !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((form) => (
                <CSSTransition key={form._id} timeout={500} classNames='item'>
                  <PAllFormitem form={form} />
                </CSSTransition>
              ))
            : forms.map((form) => (
                <CSSTransition key={form._id} timeout={500} classNames='item'>
                  <PAllFormitem form={form} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default PAllForms;

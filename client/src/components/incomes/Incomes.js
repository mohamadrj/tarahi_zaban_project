import React, { Fragment, useContext, useEffect } from 'react';
import IncomeContext from '../../context/income/incomeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Incomeitem from './Incomeitem';
import Spinner from '../layout/Spinner';

const Incomes = () => {
  const incomeContext = useContext(IncomeContext);

  const { incomes, filtered, getIncomes, loading } = incomeContext;

  useEffect(() => {
    getIncomes();
    //eslint-disable-next-line
  }, []);

  if (incomes !== null && incomes.length === 0 && !loading) {
    return <h4>Please Add Income</h4>;
  }

  return (
    <Fragment>
      {incomes !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((income) => (
                <CSSTransition key={income._id} timeout={500} classNames='item'>
                  <Incomeitem income={income} />
                </CSSTransition>
              ))
            : incomes.map((income) => (
                <CSSTransition key={income._id} timeout={500} classNames='item'>
                  <Incomeitem income={income} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Incomes;

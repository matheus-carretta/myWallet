import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  expenseTotal() {
    const { expenses } = this.props;
    const expenseConvertTotal = expenses.reduce((acc, expense) => {
      const { value, exchangeRates, currency } = expense;
      const currentCurrency = exchangeRates[currency].ask;
      const total = value * currentCurrency;
      acc += total;
      return acc;
    }, 0);
    return expenseConvertTotal;
  }

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ userEmail }</p>
        <span data-testid="total-field">
          { expenses.length ? this.expenseTotal() : 0 }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);

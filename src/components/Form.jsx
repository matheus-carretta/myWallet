import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchCurrenciesData } from '../actions/walletActions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends Component {
  constructor() {
    super();

    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { getExpenses } = this.props;
    getExpenses(this.state);
    this.setState({ ...initialState });
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor
        <input
          type="text"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrency() {
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select name="currency" id="currency" onChange={ this.handleChange }>
          {currencies.filter((coin) => coin !== 'USDT').map((coin, index) => (
            <option value={ coin } key={ index }>{coin}</option>
          ))}
        </select>
      </label>
    );
  }

  renderMethod() {
    return (
      <label htmlFor="method">
        Método de Pagamento
        <select name="method" id="method" onChange={ this.handleChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de Crédito</option>
          <option value="Cartão de débito">Cartão de Débito</option>
        </select>
      </label>
    );
  }

  renderTag() {
    return (
      <label htmlFor="tag">
        Tag
        <select name="tag" id="tag" onChange={ this.handleChange }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <form>
        {this.renderValue()}
        {this.renderDescription()}
        {this.renderCurrency()}
        {this.renderMethod()}
        {this.renderTag()}
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getExpenses: (data) => dispatch(fetchCurrenciesData(data)),
});

Form.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

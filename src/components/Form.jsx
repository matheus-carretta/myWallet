import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrencies from '../actions/walletActions';

class Form extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input type="text" name="valor" id="valor" />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input type="text" name="descrição" id="descrição" />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select name="moeda" id="moeda">
            {currencies.filter((currency) => currency !== 'USDT').map((currency) => (
              <option value={ currency } key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="metodoDePagamento">
          Método de Pagamento
          <select name="metodoDePagamento" id="metodoDePagamento">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de Crédito</option>
            <option value="debito">Cartão de Débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select name="tag" id="tag">
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Form.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

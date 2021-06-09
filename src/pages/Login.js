import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import saveEmail from '../actions/userActions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailVerified: false,
      passwordVerified: false,
      isLogged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.loginClick = this.loginClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === 'email') {
      this.verifyEmail(value);
    }

    if (name === 'password') {
      this.verifyPassword(value);
    }
  }

  verifyEmail(email) {
    const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; // https://regexr.com/3e48o
    if (emailValidator.test(email)) {
      this.setState((prevState) => ({
        ...prevState, emailVerified: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState, emailVerified: false,
      }));
    }
  }

  verifyPassword(password) {
    const minPasswordLength = 6;
    if (password.length >= minPasswordLength) {
      this.setState((prevState) => ({
        ...prevState, passwordVerified: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState, passwordVerified: false,
      }));
    }
  }

  loginClick() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState((prevState) => ({
      ...prevState,
      isLogged: true,
    }));
  }

  render() {
    const { email, password, emailVerified, passwordVerified, isLogged } = this.state;
    if (isLogged) {
      return <Redirect to="/carteira" />;
    }
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          autoComplete="off"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ !(emailVerified && passwordVerified) }
          onClick={ this.loginClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailVerified: false,
      passwordVerified: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
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

  render() {
    const { email, password, emailVerified, passwordVerified } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu email!"
          name="email"
          value={ email }
          onChange={ this.handleChange }
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
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;

import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    loginInputValue: '',
    buttonDisabled: true,
    login: '',
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.buttonEnabled();
    });
  }

  buttonEnabled = () => {
    const { loginInputValue } = this.state;
    const minInputValue = 3;
    const enableButton = loginInputValue.length < minInputValue;
    this.setState({ buttonDisabled: enableButton });
  };

  nameUser = async () => {
    const { loginInputValue } = this.state;
    this.setState({ login: 'loggingIn' }, async () => {
      const loggedIn = await createUser({ name: loginInputValue });
      this.setState({ login: loggedIn });
    });
  };

  render() {
    const { buttonDisabled, loginInputValue, login } = this.state;
    return (
      <div>
        { login === '' ? (
          <div data-testid="page-login">
            Login
            <input
              type="text"
              name="loginInputValue"
              id="login-name"
              data-testid="login-name-input"
              value={ loginInputValue }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              name="buttonDisabled"
              data-testid="login-submit-button"
              id="login-button"
              disabled={ buttonDisabled }
              onClick={ this.nameUser }
            >
              Entrar
            </button>
          </div>
        ) : (
          <div>
            { login === 'loggingIn' ? (
              <Loading />
            ) : (
              <Redirect to="/search" />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Login;

// loginWidget.jsx

import React from 'react';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class LoginWidget extends React.Component {
  state = {
    username: '',
    password: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  login = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        } else {
          this.setState({
            error: 'Could not log in.',
          });
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        this.setState({
          error: 'Could not log in.',
        });
      });
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.login}>
          <input name="username" type="text" className="form-control form-control-lg mb-3" placeholder="Username" value={username} onChange={this.handleChange} required />
          <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={password} onChange={this.handleChange} required />
          <button type="submit" className="btn btn-danger btn-block btn-lg">Log in</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <hr />
        <p className="mb-0">Don't have an account? <a className="text-primary" onClick={this.props.toggle}>Sign up</a></p>
      </React.Fragment>
    );
  }
}

export default LoginWidget;

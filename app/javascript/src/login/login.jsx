// Login.jsx

import React from 'react';
import Layout from '@src/layout';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class Login extends React.Component {
  state = {
    authenticated: false,
    show_login: true,
  }

  componentDidMount() {
    fetch('/api/authenticated', safeCredentials())
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        });
      })
      .catch(error => {
        console.error('Error fetching authentication status:', error);
      });
  }

  toggle = () => {
    this.setState(prevState => ({
      show_login: !prevState.show_login,
    }));
  }

  render() {
    const { authenticated, show_login } = this.state;

    if (authenticated) {
      return (
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <p className="mb-0">You are already logged in 🙂</p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                {show_login ? <LoginWidget toggle={this.toggle} /> : <SignupWidget toggle={this.toggle} />}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;

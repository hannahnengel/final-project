import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class Auth extends React.Component {
  render() {
    const { route } = this.context;
    const header = route.path === 'sign-in' ? 'HELLO' : 'REGISTER';

    return (
      <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
        <div className='row'>
          <div className="col">
            <h1>{header}</h1>
          </div>
        </div>
        <AuthForm
        key={route.path}
        action={route.path}
        />
      </div>
    );
  }
}

Auth.contextType = AppContext;

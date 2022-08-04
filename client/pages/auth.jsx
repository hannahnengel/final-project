import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Auth extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to='' />;

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
        onSignIn={handleSignIn}
        />
      </div>
    );
  }
}

Auth.contextType = AppContext;

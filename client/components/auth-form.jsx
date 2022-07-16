import React from 'react';
import AppContext from '../lib/app-context';

export default class AuthForm extends React.Component {

  render() {
    const { route } = this.context;
    let header;
    route.path === 'sign-in' ? header = 'HELLO' : header = 'REGISTER';
    return (
    <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
      <div className='row'>
        <div className="col">
          <h1>{header}</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
        </div>
      </div>
    </div>
    );
  }
}

AuthForm.contextType = AppContext;

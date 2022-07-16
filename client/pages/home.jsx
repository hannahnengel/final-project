import React from 'react';

export default class Home extends React.Component {
  handleSignInClick() {
    window.location.href = '#sign-in';
  }

  handleRegisterClick() {
    window.location.href = '#register';
  }

  render() {
    return (
    <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
      <div className='row mb-5'>
          <div className='col'>
            <h1>WELCOME</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
          <p className='px-3'>A different approach to making new friends...<br /> <br /> Let mutual hatred fuel the fire! &#128293;</p>
          </div>
        </div>
        <div className="row m-5">
          <div className="col-md-6 d-flex justify-content-center">
            <button className='lt-red-btn' onClick={this.handleSignInClick}>
            <i className="fa-solid fa-arrow-right-to-bracket p-2" />
            Sign In
          </button>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <button className='lt-red-btn' onClick={this.handleRegisterClick}>
              <i className="fa-solid fa-user p-2"/>
              Register
            </button>
        </div>
      </div>
    </div>
    );
  }
}

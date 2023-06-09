import React from 'react';
import IncompleteProfile from '../components/incomplete-profile';
import Matches from '../components/matches';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profileComplete: false,
      isLoading: true
    };
    this.handleDemoClick = this.handleDemoClick.bind(this);
  }

  handleSignInClick() {
    window.location.href = '#sign-in';
  }

  handleRegisterClick() {
    window.location.href = '#register';
  }

  handleDemoClick() {
    const { handleSignIn } = this.context;
    const email = process.env.DEMO_USER_EMAIL;
    const password = process.env.DEMO_USER_PWD;

    const body = { email, password };

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        this.setState({ profileComplete: true });
        handleSignIn(result);
      });
  }

  componentDidMount() {
    const { profileComplete } = this.state;
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    if (xaccesstoken !== null) {
      const req = {
        method: 'GET',
        headers: {
          'x-access-token': xaccesstoken
        }
      };
      if (!profileComplete) {
        fetch('/api/auth/user-selections', req)
          .then(res => res.json())
          .then(result => {
            if (result.length === 10) {
              this.setState({ profileComplete: true });
            }
            this.setState({ isLoading: false });
          });
      }
    } else {
      this.setState({ isLoading: false });
    }

  }

  render() {
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    let user;
    if (xaccesstoken === null) {
      user = null;
    } else {
      user = xaccesstoken;
    }

    const { profileComplete, isLoading } = this.state;

    return (
    <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
      {isLoading
        ? (<div className="row">
            <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
          </div>)
        : (user !== null
            ? (profileComplete
                ? (<Matches />)
                : (<IncompleteProfile />))
            : (
            <>
              <div className='row mb-5'>
                <div className='col'>
                  <h1>WELCOME</h1>
                </div >
              </div >
              <div className="row">
                <div className="col">
                  <p className='px-3'>A different approach to making new friends...<br /> <br /> Let mutual hatred fuel the fire! &#128293;</p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6 d-flex justify-content-center">
                  <button className='lt-red-btn' onClick={this.handleSignInClick}>
                    <i className="fa-solid fa-arrow-right-to-bracket py-2 pe-2" />
                    Sign In
                  </button>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                  <button className='lt-red-btn' onClick={this.handleRegisterClick}>
                    <i className="fa-solid fa-user py-2 pe-2" />
                    Register
                  </button>
                </div>
              </div>
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <button className='confirm-btn lt-red-btn' onClick={this.handleDemoClick}>
                      <i className="fa-solid fa-user py-2" />
                      Demo Account
                    </button>
                  </div>
                </div>
            </>
              )
          )

    }
    </div>

    );
  }
}

Home.contextType = AppContext;

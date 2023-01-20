import React from 'react';
import AppContext from '../lib/app-context';

export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      userId: null,
      email: '',
      password: '',
      confirmPassword: '',
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userId, password, confirmPassword } = this.state;
    const body = { userId, password, confirmPassword };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    fetch('/api/auth/reset-password', req)
      .then(res => {
        return res.json();
      })
      .then(result => {
        if (result.error) {
          window.alert(result.error);
          this.setState({ error: true });
        } else {
          window.location.hash = 'sign-in';
        }
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: false });
  }

  componentDidMount() {
    const { route } = this.context;
    const idAndToken = route.path.slice(15);
    let id = '';
    for (let i = 0; i < idAndToken.length; i++) {
      if (idAndToken[i] === '/') {
        break;
      }
      id += idAndToken[i];
    }
    const token = idAndToken.slice(id.length + 1);
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/auth/reset-password/${id}/${token}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.email) {
          this.setState({ valid: true, email: result.email, userId: result.userId });
        }
      });
  }

  render() {
    const { valid, email } = this.state;
    const { handleChange, handleSubmit } = this;
    let contents;

    const style = {
      width: 370,
      height: 475,
      backgroundColor: '#F0F0F0'
    };

    let confirmClass = 'hidden';
    let doesNotMatchClass = 'hidden';
    const { password, confirmPassword } = this.state;
    if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
      confirmClass = '';
    } else if (confirmPassword.length > 0 && password !== confirmPassword) {
      doesNotMatchClass = '';
    }

    if (valid === false) {
      contents = (
          <>
            <h1 className='danger'>Invalid Link. &#128556;</h1>
            <p className='m-3'>
            Return to the <a href='#sign-in'>sign in</a> page to request a reset password link.
            </p>
          </>
      );
    } else {
      contents = (
        <>
          <h1>RESET PASSWORD</h1>
          <form onSubmit={handleSubmit}>
            <div className="card border-0 shadow p-4 m-1" style={style}>
              <label htmlFor='email' className='form-label pt-3 px-2 text-start'>
                Email
              </label>
              <input
                readOnly
                value={email}
                id='email'
                type='email'
                name='email'
                className='form-control input-sm form-font border-0' />
              <label htmlFor='password' className='form-label pt-3 px-2 text-start'>
                New Password
              </label>
              <input
                required
                autoFocus
                id='password'
                type='password'
                name='password'
                onChange={handleChange}
                className='form-control input-sm form-font border-0' />
              <label htmlFor='confirmPassword' className='form-label pt-3 px-2 text-start'>
                Confirm Password
                <span className={`${confirmClass} ps-1`}><i className="fa-solid fa-circle-check green"></i></span>
              </label>
              <input
                required
                autoFocus
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                onChange={handleChange}
                className='form-control input-sm form-font border-0' />
              <span className={`${doesNotMatchClass} danger form-font mt-1 text-start`}>Passwords Do Not Match</span>
            </div>
            <div className='d-flex justify-content-center'>
              <button className='lt-red-btn mt-2 mx-0'>
                Confirm
              </button>
            </div>
          </form>
        </>
      );
    }
    return (
      <div className='vhminus text-center d-flex flex-column align-items-center justify-content-center'>
        {contents}
      </div>
    );

  }

}

ResetPassword.contextType = AppContext;

import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          alert(result.error);
        }
        if (action === 'register') {
          window.location.hash = 'sign-in';
        }
        if (action === 'sign-in') {
          if (result.user && result.token) {
            this.props.onSignIn(result);
          }
        }

      });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { action } = this.props;

    const registerCardStyle = {
      width: 370,
      height: 550,
      backgroundColor: '#F0F0F0'
    };

    const signInCardStyle = {
      width: 370,
      height: 350,
      backgroundColor: '#F0F0F0'
    };

    const style = action === 'sign-in'
      ? signInCardStyle
      : registerCardStyle;

    let confirmClass = 'hidden';
    let doesNotMatchClass = 'hidden';
    const { password, confirmPassword } = this.state;
    if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
      confirmClass = '';
    } else if (confirmPassword.length > 0 && password !== confirmPassword) {
      doesNotMatchClass = '';
    }

    const registerInputs =
      <>
        <label htmlFor='firstName' className='form-label px-2 text-start'>
          First Name
        </label>
        <input
          required
          autoFocus
          id='firstName'
          type='text'
          name='firstName'
          onChange={handleChange}
          className='form-control input-sm form-font border-0' />
        <label htmlFor='email' className='form-label pt-3 px-2 text-start'>
          Email
        </label>
        <input
          required
          autoFocus
          id='email'
          type='email'
          name='email'
          onChange={handleChange}
          className='form-control input-sm form-font border-0' />
        <label htmlFor='password' className='form-label pt-3 px-2 text-start'>
          Password
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
      </>;

    const signInInputs =
      <>
        <label htmlFor='email' className='form-label px-2 text-start'>
          Email
        </label>
        <input
          required
          autoFocus
          id='email'
          type='email'
          name='email'
          onChange={handleChange}
          className='form-control input-sm form-font border-0' />
        <label htmlFor='password' className='form-label pt-3 px-2 text-start'>
          Password
        </label>
        <input
          required
          autoFocus
          id='password'
          type='password'
          name='password'
          onChange={handleChange}
          className='form-control input-sm form-font border-0' />
      </>;

    const inputs = action === 'sign-in'
      ? signInInputs
      : registerInputs;

    const signInButton =
      <>
        <i className="fa-solid fa-arrow-right-to-bracket py-2 pe-2" />
        Sign In
      </>;

    const registerButton =
      <>
        <i className="fa-solid fa-user p-2" />
        Register
      </>;

    const buttonText = action === 'sign-in'
      ? signInButton
      : registerButton;

    return (
        <form onSubmit={handleSubmit}>
          <div className="card border-0 shadow p-4 m-1" style={style}>
            { inputs }
          </div>
          <div className='d-flex justify-content-center'>
            <button className='lt-red-btn mt-2 mx-0'>
              { buttonText }
            </button>
          </div>
      </form>
    );
  }
}

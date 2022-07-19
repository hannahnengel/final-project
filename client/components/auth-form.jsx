import React from 'react';
import Modal from './modal';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmedPassword: ''
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
    // const { action } = this.props;
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
        </label>
        <input
          required
          autoFocus
          id='confirmPassword'
          type='password'
          name='confirmPassword'
          onChange={handleChange}
          className='form-control input-sm form-font border-0' />
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
        <a href='#sign-in' className='form-font py-3' data-bs-toggle="modal" data-bs-target="#forgotPassword"> Forgot Password? </a>
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
      <>
        <Modal />
        <form onSubmit={handleSubmit}>
          <div className="card border-0 shadow p-4 m-1" style={style}>
            { inputs }
          </div>
          <div className='d-flex justify-content-center'>
            <button className='lt-red-btn mt-4 mx-0'>
              { buttonText }
            </button>
          </div>
      </form>
      </>
    );
  }
}

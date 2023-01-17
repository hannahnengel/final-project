import React from 'react';

export default class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      forgottenEmail: '',
      success: false
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
    const { forgottenEmail } = this.state;
    const body = { forgottenEmail };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        this.setState({ success: true });
      });
  }

  render() {
    const modalCardStyle = {
      backgroundColor: '#F0F0F0'
    };

    const modalStyle = {
      backgroundColor: 'rgba(41, 41, 41, 0.70)'
    };

    let successClass = 'invisible';
    let forgotFormClass = '';
    if (this.state.success === true) {
      successClass = '';
      forgotFormClass = 'invisible';
    }

    return (
      <div className="modal fade" style={modalStyle} id='forgotPassword' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="forgotPassword" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content">
            <div className="modal-body rounded border-0" style={modalCardStyle}>
              <div className={`container-fluid ${forgotFormClass}`}>
                <div className="row">
                  <div className='col d-flex justify-content-end'>
                    <i className="fa-solid fa-x" data-bs-dismiss="modal"></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="modal-title danger">
                      Forgot Password?
                    </p>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className='mt-3'>
                        We&apos;ll email you a link to reset it.
                      </p>
                    </div>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className='row d-flex justify-content-start'>
                      <label htmlFor='forgottenEmail' className='form-label px-2 text-start mt-2'>
                        Email
                      </label>
                    </div>
                    <input
                      required
                      autoFocus
                      id='forgottenEmail'
                      type='forgottenEmail'
                      name='forgottenEmail'
                      onChange={this.handleChange}
                      className='form-control input-sm form-font border-0' />
                    <div className='row'>
                      <div className='col mt-3 d-flex justify-content-center'>
                        <button className='lt-red-btn'>Send</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`container-fluid ${successClass}`}>
                <div className="row">
                  <div className="col">
                    <h2 className="modal-title green">
                      <span><i className="fa-solid fa-circle-check fa-2xl"></i></span>
                      <br />
                      Link Sent!
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-3 d-flex justify-content-center">
                    <button type='button' data-bs-dismiss="modal" className='lt-red-btn'>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

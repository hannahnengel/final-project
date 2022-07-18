import React from 'react';

export default function Modal() {

  const modalCardStyle = {
    backgroundColor: '#F0F0F0'
  };

  const modalStyle = {
    backgroundColor: 'rgba(41, 41, 41, 0.70)'
  };

  return (
    <div className="modal fade" style ={modalStyle} id='forgotPassword' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="forgotPassword" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content">
          <div className="modal-body rounded border-0" style={modalCardStyle}>
            <div className='container-fluid'>
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
              <form>
                <div className='row d-flex justify-content-start'>
                    <label htmlFor='email2' className='form-label px-2 text-start mt-2'>
                      Email
                    </label>
                </div>
                <input
                  required
                  autoFocus
                  id='email2'
                  type='email'
                  name='email2'
                  className='form-control input-sm form-font border-0' />
                <div className='row'>
                  <div className='col mt-3 d-flex justify-content-center'>
                    <button className='lt-red-btn'>Send</button>
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

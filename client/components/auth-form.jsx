import React from 'react';

function AuthForm() {
  const header = 'REGISTER';

  return (
    <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
      <div className='row'>
        <div className="col">
          <h1>{header}</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <a href=''>Home</a>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

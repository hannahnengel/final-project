import React from 'react';

export default function Home(props) {
  return (
    <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
      <div className='row m-5'>
          <div className='col'>
            <h1>WELCOME</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>A different approach to making new friends...</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className='p-5'>Let mutual hatred fuel the fire! &#128293;</p>
          </div>
        </div>
      <div className="row m-5">
          <div className="col">
            <a href='#auth-form'>Sign In</a>
          </div>
        <div className="col">
          <a href='#auth-form'>Register</a>
        </div>
        </div>
    </div>
  );
}

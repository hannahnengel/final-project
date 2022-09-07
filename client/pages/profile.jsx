import React from 'react';

export default class Profile extends React.Component {

  render() {
    return (
      <>

      <div className="text-center position-absolute shadow start-0" style={{ width: '100%', maxHeight: '400px', backgroundColor: '#F0F0F0' }}>
        <div className="row pt-2 w-100 row-cols-md-1 d-flex justify-content-center align-items-center">
          <div className="col d-flex justify-content-center px-0">
            <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
              <i className="fa-solid fa-camera fa-xl" style={{ color: '#6D6969' }}></i>
            </div>
          </div>
          <div className="col danger text-align-end px-0">
            <h1 className='font-40'>Hannah</h1>
            <p className="form-font px-0" style={{ color: '#6D6969' }}>Female, 28 years old
              <br /> Irvine, CA
            </p>
          </div>
        </div>
        <div className="row w-100 danger d-flex align-items-center justify-content-center">
          <div className="col col-md-1 d-flex justify-content-end px-0">
            <i className="fa-solid fa-user fa-xl"></i>
          </div>
          <div className="col col-md-2 form-font text-align-start">(949)230-1495
            <br />
            myemail@gmail.com
          </div>
          <div className="col col-md-1 d-flex justify-content-end px-0">
            <i className="fa-solid fa-pen-to-square" style={{ color: '#B0B0B0' }}></i>
          </div>
        </div>
        <div className="row text-align-start p-2 m-0 w-100 row-cols-md-3 row-cols-1 d-flex align-items-center justify-content-center" style={{ color: '#6D6969' }}>
          <div className="col col-md-4 px-0">
            <p className='form-font my-0'>
            <span className='form-font pe-1' style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
              Seeking:</span>
              Female, Male, Non-Binary</p>
          </div>
          <div className="col col-md-1 px-0">
            <p className='form-font my-0'>
              Ages 25-35
            </p>
          </div>
          <div className="col col-md-2 px-0">
            <p className='form-font my-0'>50 Mile Radius<span><i className="fa-solid fa-pen-to-square px-1" style={{ color: '#B0B0B0' }}></i></span></p>
          </div>
        </div>
      </div>
      <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>

      </div>

      </>
    );
  }
}

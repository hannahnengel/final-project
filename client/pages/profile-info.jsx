import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import Years from '../components/years';

export default class ProfileInfo extends React.Component {
  render() {
    const { user } = this.context;
    // console.log('user', user);

    if (user === null) { return <Redirect to="#sign-in"/>; }

    const header = 'PROFILE INFO';
    const formStyle = {
      width: '100%'
    };

    const cardStyle = {
      width: '100%',

      backgroundColor: '#F0F0F0'
    };

    const years = <Years/>;

    return (
      <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
        <div className='row'>
          <div className="col">
            <h1>{header}</h1>
          </div>
        </div>

        <form style={formStyle}>

          <div className="row card border-0 shadow p-4 m-1 text-start" style={cardStyle}>
            <div className="row-cols-md-2">
              <div className="row p-0">
                <p className='mb-1'>Location</p>
              </div>

              <div className="row p-0">
                <p className='form-font grey mb-2'>
                  <span><i className="fa-solid fa-location-crosshairs pe-1"></i></span>
                  Use Current Location
                </p>
              </div>

              <div className="row p-0 grey">
                <div className="col">
                  <input
                    required
                    autoFocus
                    id='city'
                    type='text'
                    name='city'
                    className='form-control input-sm form-font border-0'>
                  </input>
                  <label htmlFor='city' className='form-label form-font'>
                    City
                  </label>
                </div>
                <div className="col">
                  <input required
                    autoFocus
                    id='zipCode'
                    type='text'
                    name='zipCode'
                    className='form-control input-sm form-font border-0'>
                  </input>
                  <label htmlFor='zipCode' className='form-label form-font'>
                    Zip Code
                  </label>
                </div>
              </div>

              <div className="row p-0">
                <p className='mb-1'>Birthday</p>
              </div>

              <div className="row pe-0 grey">
                <div className="col px-0 d-flex align-items-start">
                  <label htmlFor='month' className='form-label form-font'>
                  </label>
                  <select id='month' className='form-select form-font rounded p-2 border-0'>
                    <option value="Month">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div className="col px-1 d-flex align-items-start">
                  <label htmlFor='day' className='form-label form-font'>
                  </label>
                  <select id='day' className='form-select form-font rounded p-2 border-0'>
                    <option value="Day">Day</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
                <div className="col px-0 d-flex align-items-start">
                  <label htmlFor='year' className='form-label form-font'>
                  </label>
                  {years}
                </div>
              </div>

              <div className="row">
                <p className='mb-1'>Gender</p>
              </div>

              <div className="row p-0 grey">
                <div className="col">
                  <input
                    required
                    id='male'
                    type='radio'
                    name='gender'
                    className='form-check-input me-1 border-0'>
                  </input>
                  <label htmlFor='male' className='form-check-label form-font'>
                    Male
                  </label>
                  <br/>
                  <input
                    required
                    id='non-binary'
                    type='radio'
                    name='gender'
                    className='form-check-input me-1 border-0'>
                  </input>
                  <label htmlFor='non-binary' className='form-check-label form-font'>
                    Non-Binary
                  </label>
                </div>
                <div className="col">
                  <input
                    required
                    id='female'
                    type='radio'
                    name='gender'
                    className='form-check-input me-1 border-0'>
                  </input>
                  <label htmlFor='female' className='form-check-label form-font'>
                    Female
                  </label>
                </div>
              </div>

            </div>
            <div className="row-cols-md-2">
              <div className="row">
                <p className='mb-1'>Preferred Contact</p>
                <p className='form-font grey'>Must check at least one form of contact to display on your profile</p>
              </div>

              <div className="row">
                <div className="col">
                  <input
                    required
                    autoFocus
                    id='phone'
                    type='checkbox'
                    name='contact'
                    className='form-check-input border-0'>
                  </input>
                  <label htmlFor='phone' className='form-check-label form-font pt-1 px-2'>
                    Phone
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    required
                    autoFocus
                    id='email'
                    type='checkbox'
                    name='contact'
                    className='form-check-input border-0'>
                  </input>
                  <label htmlFor='email' className='form-check-label form-font pt-1 px-2'>
                    Email
                  </label>
                </div>
              </div>

            </div>

          </div>
          <div className="d-flex justify-content-end">
            <button className='lt-red-btn next-back-btn px-2'>
              Next
              <span><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>

        </form>
      </div>
    );
  }
}

ProfileInfo.contextType = AppContext;

import React from 'react';
import Map from './map';
export default class ProfileInfoForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      birthday: '',
      gender: '',
      contact: {
        selections: [],
        checked: {
          email: false,
          phone: false
        }
      },
      phone: null,
      city: '',
      zipCode: null,
      mileRadius: 50,
      friendGender: {
        selections: [],
        checked: {
          female: false,
          male: false,
          nonBinary: false
        }
      },
      friendAge: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    if (event.type === 'submit') {
      if (action === 'friend-preferences') {
        if (this.state.friendGender.selections.length === 0) {
          alert('Must select at least one gender.');
          return;
        }
        if (this.state.friendAge === '') {
          alert('Must select at least one friend age range selection.');
          return;
        }
      }
      if (action === 'profile-info') {
        if (this.state.phone === null && this.state.contact.checked.phone === true) {
          alert('Must provide phone number if selected as a preferred method of contact.');
          return;
        }
        if (this.state.contact.selections.length === 0) {
          alert('Must select at least one preferred method of contact.');
          return;
        }
        // if(this.state.friendAge)
      }

      window.location.hash = 'friend-preferences';
      // console.log('submitted everything!');
      // api call to db goes here
    }

    if (event.target.type === 'button') {
      window.location.hash = 'profile-info';
    }

  }

  handlePrevious() {
    window.location.hash = 'profile-info';
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (name === 'friendGender' || name === 'contact') {
      const stateCopy = Object.assign({}, this.state[name]);
      stateCopy.checked[value] = !stateCopy.checked[value];

      for (const prop in stateCopy.checked) {
        if (stateCopy.checked[prop] === true) {
          const index = stateCopy.selections.indexOf(prop);
          if (index === -1) {
            stateCopy.selections.push(prop);
          }
        } else if (stateCopy.checked[prop] === false) {
          const index = stateCopy.selections.indexOf(prop);
          if (index !== -1) {
            stateCopy.selections.splice(index, 1);
          }
        }
      }
      this.setState({ [name]: stateCopy });

    } else {
      this.setState({ [name]: value });
    }

  }

  render() {
    // console.log('STATE', this.state);
    const { action } = this.props;

    const maxWidth = action === 'profile-info'
      ? '700px'
      : '900px';

    const formStyle = {
      width: '100%',
      maxWidth,
      backgroundColor: 'none'
    };

    const cardStyle = {
      width: '100%',
      backgroundColor: '#F0F0F0',
      minHeight: '400px'
    };

    const handleChange = this.handleChange;
    const handleSubmit = this.handleSubmit;

    const radius = this.state.mileRadius;

    const profileInfoInputs =
      <>
          <div className="row row-cols-md-2">
            <div className="col">
              <div className="row mt-2">
                <div className="col">
                  <p className='m-0'>Gender</p>
                </div>
              <div className="col-12 grey">
                <input
                  required
                  id='female'
                  type='radio'
                  value='female'
                  name='gender'
                  className='form-check-input me-1 border-0'
                  onChange={handleChange}>
                </input>
                <label htmlFor='female' className='form-check-label form-font'>
                  Female
                </label>
              </div>
              <div className="col-12 grey">
                <input
                  required
                  id='male'
                  type='radio'
                  value='male'
                  name='gender'
                  className='form-check-input me-1 border-0'
                  onChange={handleChange}>
                </input>
                <label htmlFor='male' className='form-check-label form-font'>
                  Male
                </label>
              </div>
              <div className="col-12 grey">
                <input
                  required
                  id='non-binary'
                  type='radio'
                  value='non-binary'
                  name='gender'
                  className='form-check-input me-1 border-0'
                  onChange={handleChange}>
                </input>
                <label htmlFor='non-binary' className='form-check-label form-font'>
                  Non-Binary
                </label>
              </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mt-2">
                <p className='mb-1'>Preferred Contact</p>
                <p className='form-font-sm mb-1 pe-0 grey'>Must check at least one form of contact to display on your profile</p>
              </div>
              <div className="row grey">
                <div className="input-group" required>
                  <div className="row">
                    <div className="col">
                      <input
                        autoFocus
                        id='phone'
                        type='checkbox'
                        value='phone'
                        name='contact'
                        className='form-check-input border-0'
                        onChange={handleChange}>
                      </input>
                      <label htmlFor='phone' className='form-check-label form-font pt-1 px-2'>
                        Phone
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        autoFocus
                        id='email'
                        type='checkbox'
                        value='email'
                        name='contact'
                        className='form-check-input border-0'
                        onChange={handleChange}>
                      </input>
                      <label htmlFor='email' className='form-check-label form-font pt-1 px-2'>
                        Email
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    id='phone'
                    name='phone'
                    autoFocus
                    type="tel"
                    maxLength={10}
                    className="form-control border-0 mt-2"
                    style={{ height: '45px', width: '10rem' }}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone" className="form-label form-font grey">Phone</label>
                </div>
              </div>
            </div>
          <div className="col-12">
            <div className="row mb-2">
              <p className='mb-0'>Birthday</p>
            </div>
            <div className="row grey">
              <div className="col d-flex align-items-start">
                <label htmlFor='birthday' className='form-check-label form-font'>
                </label>
                <input
                  required
                  id='birthday'
                  type='date'
                  name='birthday'
                  className='mb-2 border-0 form-font grey px-2 rounded'
                  onChange={handleChange}>
                </input>
              </div>
            </div>
          </div>
        </div>
      </>;

    const friendPreferenceInputs =
      <>
        <div className="row">
          <div className="col">
            <p className='mb-1'>Your Location</p>
            <Map radius={radius}/>
          </div>
        </div>

        <div className="row row-cols-sm-2 mt-2 grey">
          <div className="col-6 pe-1">
            <input
              required
              autoFocus
              id='city'
              type='text'
              name='city'
              style={{ height: '45px', maxWidth: '10rem' }}
              className='form-control input-sm form-font border-0'
              onChange={handleChange}>
            </input>
            <label htmlFor='city' className='form-label form-font mb-1'>
              City
            </label>
          </div>
          <div className="col-6">
            <input required
              autoFocus
              id='zipCode'
              type='number'
              name='zipCode'
              min='00501'
              max='99950'
              style={{ height: '45px', maxWidth: '10rem' }}
              className='form-control input-sm form-font border-0'
              onChange={handleChange}>
            </input>
            <label htmlFor='zipCode' className='form-label form-font mb-1'>
              Zip Code
            </label>
          </div>
          <div className="col">
            <input required
              autoFocus
              id='mileRadius'
              type='number'
              defaultValue={50}
              name='mileRadius'
              min='1'
              max='3881'
              style={{ height: '45px', maxWidth: '10rem' }}
              className='form-control input-sm form-font border-0'
              onChange={handleChange}>
            </input>
            <label htmlFor='mileRadius' className='form-label form-font mb-0'>
              Friend Mile Radius
            </label>
          </div>
        </div>
        <div className="row row-cols-md-2">
          <div className="col-md-6">
            <div className="row mt-2">
              <div className="col">
                <p className='m-0'>Gender</p>
              </div>

                <div className="col-12 grey">
                  <input
                    id='friendGender'
                    type='checkbox'
                    value='female'
                    name='friendGender'
                    className='form-check-input me-1 border-0'
                    onChange={handleChange}>
                  </input>
                  <label htmlFor='friendGender' className='form-check-label form-font'>
                    Female
                  </label>
                </div>
                <div className="col-12 grey">
                  <input
                    id='friendGender'
                    type='checkbox'
                    value='male'
                    name='friendGender'
                    className='form-check-input me-1 border-0'
                    onChange={handleChange}>
                  </input>
                  <label htmlFor='friendGender' className='form-check-label form-font'>
                    Male
                  </label>
                </div>
                <div className="col-12 grey">
                  <input
                    id='friendGender'
                    type='checkbox'
                    value='nonBinary'
                    name='friendGender'
                    className='form-check-input me-1 border-0'
                    onChange={handleChange}>
                  </input>
                  <label htmlFor='friendGender' className='form-check-label form-font'>
                    Non-Binary
                  </label>
                </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="row mt-2">
              <p className='mb-1'>Age</p>
              <label htmlFor='friendAge'></label>
              <select
                required
                className='form-select-lg border-0'
                name='friendAge'
                id='friendAge'
                style={{ height: '45px', width: '10rem' }}
                onChange={handleChange}
                size={2}
                >
                <option value=''>select one</option>
                <option className='form-font grey'>18-24</option>
                <option className='form-font grey'>25-31</option>
                <option className='form-font grey'>32-38</option>
                <option className='form-font grey'>39-45</option>
                <option className='form-font grey'>46-52</option>
                <option className='form-font grey'>52+</option>
              </select>
            </div>

          </div>
        </div>

      </>;

    const inputs = action === 'profile-info'
      ? profileInfoInputs
      : friendPreferenceInputs;

    const previousBtnClass = action === 'profile-info'
      ? 'hidden'
      : '';

    return (

      <form style={formStyle} onSubmit={handleSubmit}>
          <div className="row card border-0 shadow p-2 m-0 text-start d-flex align-items-center justify-content-center box-sizing" style={cardStyle}>
            {inputs}
          </div>
          <div className="d-flex justify-content-between">
          <button type='button' className={`lt-red-btn next-back-btn px-2 mt-1 mx-0 ${previousBtnClass}`} onClick={handleSubmit} >
            <span><i className="fa-solid fa-arrow-left"></i></span>
            Previous
          </button>
          <button type='submit' className='lt-red-btn next-back-btn px-2 mt-1 mx-0'>
              Next
              <span><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>
        </form>

    );
  }
}

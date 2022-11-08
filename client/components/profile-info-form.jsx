import React from 'react';
import Map from './map';
import Locate from './locate';

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
      coordsCity: '',
      zipCode: null,
      coordsZipCode: null,
      lat: null,
      lng: null,
      position: { lat: null, lng: null },
      mileRadius: 50,
      friendGender: {
        selections: [],
        checked: {
          female: false,
          male: false,
          nonBinary: false
        }
      },
      friendAge: '',
      editing: false,
      isLoaded: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.inputGetCoords = this.inputGetCoords.bind(this);
    this.geoLocate = this.geoLocate.bind(this);
    this.geoGetCoords = this.geoGetCoords.bind(this);
    this.handleLocationError = this.handleLocationError.bind(this);
    this.reverseGeoLocate = this.reverseGeoLocate.bind(this);
  }

  handleCancel(event) {
    window.location.hash = 'my-profile';
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    if (event.type === 'submit') {
      const xaccesstoken = window.localStorage.getItem('react-context-jwt');
      if (action === 'friend-preferences') {
        if (this.state.friendGender.selections.length === 0) {
          alert('Must select at least one gender.');
          return;
        }
        if (this.state.friendAge === '') {
          alert('Must select one friend age range selection.');
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
      }
      let body;
      if (action === 'profile-info') {
        const { birthday, gender, phone } = this.state;
        const contact = this.state.contact.selections;
        body = {
          birthday,
          gender,
          contact,
          phone
        };
      }
      if (action === 'friend-preferences') {
        const { city, zipCode, lat, lng, mileRadius, friendAge } = this.state;
        const friendGender = this.state.friendGender.selections;
        body = {
          city,
          zipCode,
          lat,
          lng,
          mileRadius,
          friendGender,
          friendAge
        };
      }

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': xaccesstoken
        },
        body: JSON.stringify(body)
      };
      fetch(`/api/auth/${action}`, req)
        .then(res => res.json())
        .then(result => {
          if (result.error) {
            alert(result.error);
          }
          if (action === 'profile-info') {
            if (this.state.editing === false) {
              this.setState({ editing: false });
              window.location.hash = 'friend-preferences';
            }
            if (this.state.editing === true) {
              window.location.hash = 'my-profile';
            }
          }
          if (action === 'friend-preferences') {
            if (this.state.editing === false) {
              window.location.hash = 'hate-selections/pets';
            }
            if (this.state.editing === true) {
              window.location.hash = 'my-profile';
            }
          }
        });
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
      return;
    }
    this.setState({ [name]: value });
    if (name === 'city' || name === 'zipCode') {
      if (this.state.zipCode !== null && this.state.zipCode.length !== 5) {
        this.setState({
          position: { lat: null, lng: null },
          coordsCity: '',
          coordsZipCode: null,
          lat: null,
          lng: null
        });
      }

      if (this.state.city === '') {
        this.setState({
          position: { lat: null, lng: null },
          coordsCity: '',
          coordsZipCode: null
        });
      }
    }
  }

  inputGetCoords() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.city}%20${this.state.zipCode}&key=${process.env.GOOGLE_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        let city = '';
        let zipCode = '';
        for (let i = 0; i < data.results[0].address_components.length; i++) {
          if (data.results[0].address_components[i].types[0].includes('locality')) {
            city = data.results[0].address_components[i].long_name;
          }
          if (data.results[0].address_components[i].types[0].includes('postal_code')) {
            zipCode = data.results[0].address_components[i].long_name;
          }
        }
        if (zipCode === '') {
          zipCode = this.state.zipCode;
        }
        this.setState({
          coordsCity: city,
          coordsZipCode: zipCode,
          city,
          zipCode,
          lat: latitude,
          lng: longitude,
          isLoaded: true
        });
      }
      )
      .catch(err => alert(err));
  }

  geoLocate() {
    if (navigator.geolocation) {
      this.setState({ isLoaded: false });
      navigator.geolocation.getCurrentPosition(this.geoGetCoords, this.handleLocationError);
    }
  }

  geoGetCoords(position) {
    this.reverseGeoLocate();
    this.setState({
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  }

  reverseGeoLocate() {
    const lat = this.state.position.lat;
    const lng = this.state.position.lng;
    if (lat !== null && (lat !== this.state.lat && lng !== this.state.lng)) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=false&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          let city = '';
          let zipCode = '';

          for (let i = 0; i < data.results[0].address_components.length; i++) {
            if (data.results[0].address_components[i].types[0] === 'locality') {
              city = data.results[0].address_components[i].long_name;
            }
            if (data.results[0].address_components[i].types[0] === 'postal_code') {
              zipCode = data.results[0].address_components[i].long_name;
            }
          }
          this.setState({
            lat,
            lng,
            city,
            zipCode,
            isLoaded: true
          });
        }
        )
        .catch(err => alert(err));
    }
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred');
        break;
      default:
        alert('An unknown error occurred');
    }
  }

  handleEdit() {
    this.setState({
      city: '',
      zipCode: null,
      position: { lat: null, lng: null },
      coordsCity: '',
      coordsZipCode: null,
      lat: null,
      lng: null
    });
  }

  componentDidMount() {
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };
    fetch('/api/auth/user-selections', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'no info exists') {
          return null;
        } else {
          this.setState({ editing: true });
        }
      });
  }

  render() {
    const { action } = this.props;
    const { isLoaded } = this.state;

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
    const { lat, lng, city } = this.state;
    const zipCode = this.state.zipCode === null ? '' : this.state.zipCode;
    const geoLocate = this.geoLocate;

    if (this.state.position.lat !== null && this.state.lat !== this.state.position.lat && this.state.lng !== this.state.position.lng) {
      this.reverseGeoLocate();
    }
    if (this.state.city !== '' && this.state.zipCode !== null && this.state.zipCode.length === 5 && this.state.lat === null) {
      if (this.state.city !== this.state.coordsCity || this.state.zipCode !== this.state.coordsZipCode) {
        this.inputGetCoords();
      }
    }

    let lockedBtnClass = 'invisible';
    let readOnly = false;

    if (this.state.lat !== null) {
      lockedBtnClass = '';
      readOnly = true;
    }

    const eighteenYearsAgo = () => {
      const TODAY = new Date();
      const YEAR = ((TODAY).getFullYear() - 18).toString();
      let MONTH = ((TODAY).getMonth() + 1).toString();
      if (MONTH.length === 1) {

        MONTH = '0' + MONTH;
      }
      let DATE = ((TODAY).getDate()).toString();
      if (DATE.length === 1) {
        DATE = '0' + DATE;
      }

      const EIGHTEEN_YEARS_BACK = YEAR + '-' + MONTH + '-' + DATE;
      return EIGHTEEN_YEARS_BACK;
    };

    const dateControl = eighteenYearsAgo();

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
                  min={null}
                  max={`${dateControl}`}
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
            <Locate geoLocate={geoLocate}/>
            <Map radius={radius} lat={lat} lng={lng}/>
          </div>
        </div>

        <div className="row row-cols-sm-2 mt-2 grey">
          <div className="col-6 pe-1">
            <input
              required
              autoFocus
              id='city'
              type='text'
              value={city}
              readOnly={readOnly}
              name='city'
              style={{ height: '45px', maxWidth: '10rem' }}
              className='form-control input-sm form-font border-0'
              onChange={handleChange}>
            </input>
            <label htmlFor='city' className='form-label form-font mb-1'>
              City
            </label>
          </div>
          <div className="col-6 d-flex row justify-content-end text-end m-0">
            <input required
              autoFocus
              id='zipCode'
              type='number'
              value={zipCode}
              readOnly={readOnly}
              name='zipCode'
              min='00501'
              max='99950'
              style={{ height: '45px', maxWidth: '10rem' }}
              className='form-control input-sm form-font border-0'
              onChange={handleChange}>
            </input>
            <label htmlFor='zipCode' className='form-label form-font mb-1 px-0'>
              Zip Code
              <span title='Edit City and Zip' onClick={this.handleEdit}><i className={`fa-solid fa-pen-to-square danger mx-2 ${lockedBtnClass}`}></i></span>
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
              className='form-control input-sm form-font border-0 mt-1'
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

          <div className="col-md-6">
            <div className="row d-flex justify-content-end text-md-center mt-1">
              <p className='mb-1'>Age</p>
              <select
                required
                className='form-select-lg border-0'
                name='friendAge'
                id='friendAge'
                style={{ height: '125px', width: '10rem' }}
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

    let buttons;
    if (this.state.editing === true) {
      buttons = (
      <>
          <button type='button' className="lt-red-btn px-2 mt-1 mx-0 confirm-cancel-btn" action='cancel' onClick={this.handleCancel}>
          Cancel
        </button>
          <button type='submit' className='confirm-btn lt-red-btn px-2 mt-1 mx-0 confirm-cancel-btn' action='confirm'>
          Confirm
        </button>
        </>);
    } else {
      buttons = (
        <>
          <button type='button' className={`lt-red-btn next-back-btn px-2 mt-1 mx-0 ${previousBtnClass}`} onClick={handleSubmit} >
            <span><i className="fa-solid fa-arrow-left"></i></span>
            Previous
          </button>
          <button type='submit' className='lt-red-btn next-back-btn px-2 mt-1 mx-0'>
            Next
            <span><i className="fa-solid fa-arrow-right"></i></span>
          </button>
        </>
      );
    }

    return (

      <>
      {isLoaded
        ? (
          <form style={formStyle} onSubmit={handleSubmit}>
            <div className="row card border-0 shadow p-2 m-0 text-start d-flex align-items-center justify-content-center box-sizing" style={cardStyle}>
              {inputs}
            </div>
            <div className="d-flex justify-content-between">
              {buttons}
            </div>
          </form>
          )
        : (
            <div className="row d-flex justify-content-center align-items-center" style={{ height: '700px' }}>
              <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
            </div>
          )}
      </>

    );
  }
}

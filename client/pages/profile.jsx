import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  editInfo(event) {
    const action = event.target.getAttribute('action');
    window.location.hash = action;
  }

  getUserInfo() {
    const xaccesstoken = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };
    fetch('api/auth/profile-info', req)
      .then(res => res.json())
      .then(result => {
        const { gender, birthday, phone, contact } = result[0];
        this.setState({ gender, birthday, phone, contact });
      })
      .then(fetch('api/auth/user-info', req)
        .then(res => res.json())
        .then(result => {
          const { firstName, email } = result[0];
          this.setState({ firstName, email });
        }))
      .then(fetch('/api/auth/friend-preferences', req)
        .then(res => res.json())
        .then(result => {
          const { city, zipCode, friendAge, friendGender, mileRadius } = result[0];
          this.setState({ city, zipCode, friendAge, friendGender, mileRadius });
        }))
      .then(fetch('/api/auth/user-selections', req)
        .then(res => res.json())
        .then(result => {
          const selectionIds = [];
          for (let i = 0; i < result.length; i++) {
            selectionIds.push(result[i].selectionId);
          }
          let selectionId = '';
          const selections = [];
          for (let j = 0; j < selectionIds.length; j++) {
            selectionId = selectionIds[j];
            fetch(`/api/selections/selection/${selectionId}`, req)
              .then(res => res.json())
              .then(result => {
                selections.push(result[0]);
                this.setState({ selections });
              });
          }
        }));
    const { user } = this.context;
    if (!user) {
      return <Redirect to='' />;
    }
  }

  handleClick() {
    window.location.hash = 'hate-selections/pets';
  }

  render() {
    const { gender, birthday, phone, contact, firstName, email, city, zipCode, friendAge, friendGender, mileRadius, selections } = this.state;

    let inputs;
    if (selections !== undefined) {
      selections.sort((a, b) => {
        return (a.categoryId - b.categoryId);
      });

      inputs = selections.map(selection => {
        const words = selection.selectionName.split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const description = words.join(' ');
        return (
        <div className="col pt-2 px-0 d-flex justify-content-center" key={selection.selectionId}>
            <div className="selections-container">
              <img className='hate-selection-img' src={`${selection.src}`} alt={`${selection.selectionName}`}></img>
              <div className="selected-positioning">
                <div className="selected text-center d-flex justify-content-center align-items-center">
                  {`${description}`}
                </div>
              </div>
            </div>
        </div>
        );
      });
    }

    let contactPreference = [];
    if (contact !== undefined) {
      if (contact.includes('phone') && contact.includes('email')) {
        contactPreference = [phone, email];
      } else if (contact.includes('email') && (!contact.includes('phone'))) {
        contactPreference = [email];
      } else if (contact.includes('phone') && (!contact.includes('email'))) {
        contactPreference = [phone];
      }
    }

    const friendGenderPreference = [];
    let friendGenderPreferenceArray = [];
    if (friendGender !== undefined) {
      friendGenderPreferenceArray = friendGender.replace(/{|}|"|"/g, '').split(',');
      for (let i = 0; i < friendGenderPreferenceArray.length; i++) {
        if (i < friendGenderPreferenceArray.length - 1) {
          friendGenderPreference.push(friendGenderPreferenceArray[i][0].toUpperCase() + friendGenderPreferenceArray[i].substring(1) + ', ');
        } else {
          friendGenderPreference.push(friendGenderPreferenceArray[i][0].toUpperCase() + friendGenderPreferenceArray[i].substring(1));
        }
      }
    }

    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (selections === undefined) {
      this.getUserInfo();
      return (
        <div className='vhminus text-center d-flex flex-column align-items-center justify-content-center'>
          <h1><i className="fa-solid fa-spinner fa-lg danger"></i></h1>
        </div>
      );
    } else {
      return (
        <>
          <div className="position-absolute behind dynamic-height shadow start-0" style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
          </div>
          <div className="on-top position-relative">
            <div className="row pt-2 w-100 row-cols-md-1 d-flex justify-content-center align-items-center">
              <div className="col d-flex justify-content-center px-0">
                <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
                  <i className="fa-solid fa-camera fa-xl" style={{ color: '#6D6969' }}></i>
                </div>
              </div>
              <div className="col  px-0">
                <div className="row">
                  <h1 className='font-40 danger d-flex justify-dynamic m-0 px-0'>{`${firstName}`}</h1>
                </div>
                <div className="row">
                  <p className="form-font  d-flex justify-dynamic m-0 px-0" style={{ color: '#6D6969' }}>{`${gender[0].toUpperCase() + gender.substring(1)}`}, {`${age}`} years old </p>
                </div>
                <div className="row">
                  <p className='form-font d-flex justify-dynamic m-0 mb-1 px-0' style={{ color: '#6D6969' }}> {`${city}`}, {`${zipCode}`}</p>
                </div>
              </div>
            </div>
            <div className="row danger d-flex justify-content-around align-items-center margin-100 mt-3">
              <div className="col-3 px-1 d-flex justify-content-end">
                <i className="fa-solid fa-user fa-xl"></i>
              </div>
              <div className="col-6 px-0 form-font text-align-start">
                {
                  (contactPreference.length > 0)
                    ? contactPreference.map((item, index) => {
                      return (
                      <p className='form-font m-0' key={index}> {item} </p>
                      );
                    })
                    : <></>
                }
              </div>
              <div className="col-3 d-flex justify-content-end px-0">
                <i className="fa-solid fa-pen-to-square" action='profile-info' style={{ color: '#B0B0B0' }} onClick={this.editInfo}></i>
              </div>
            </div>
            <div className="row mt-3 row-cols-md-3 row-cols-1 d-flex align-items-center justify-content-around margin-100" style={{ color: '#6D6969' }}>
              <div className="col col-md-6 d-flex justify-content-end px-0">
                <p className='form-font my-0'>
                  <span className='form-font pe-1' style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                    Seeking:</span>
                  {(friendGenderPreference.length > 0)
                    ? friendGenderPreference.map((item, index) => {
                      return (<span className='form-font' key={index}>{item}</span>);
                    })
                    : <></>
                  }</p>
              </div>
              <div className="col col-md-2 d-flex justify-content-end px-0">
                <p className='form-font my-0'>
                  Ages {`${friendAge}`}
                </p>
              </div>
              <div className="col col-md-4 px-0 d-flex justify-content-end">
                <p className='form-font my-0'>{`${mileRadius}`} Mile Radius<span><i className="fa-solid fa-pen-to-square px-1" action='friend-preferences' style={{ color: '#B0B0B0' }} onClick={this.editInfo}></i></span></p>
              </div>
            </div>
          </div>

          <div className='position-relative row mt-4 d-flex justify-content-center align-items-center row-cols-lg-5 row-cols-md-2 row-cols-sm-2' >
            {(inputs.length === 10)
              ? inputs
              : <></>
            }
          </div>
          {(inputs.length === 10)
            ? <div className='row justify-content-center mt-5'>
              <button onClick={this.handleClick} className='lt-red-btn retake-quiz-btn'>Retake Quiz</button>
            </div>
            : <></>
          }
        </>
      );
    }
  }
}

Profile.contextType = AppContext;

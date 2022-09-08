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
          <div className="text-center position-absolute shadow start-0" style={{ width: '100%', height: '400px', backgroundColor: '#F0F0F0' }}>
            <div className="row pt-2 w-100 row-cols-md-1 d-flex justify-content-center align-items-center">
              <div className="col d-flex justify-content-center px-0">
                <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
                  <i className="fa-solid fa-camera fa-xl" style={{ color: '#6D6969' }}></i>
                </div>
              </div>
              <div className="col danger text-align-end px-0">
                <h1 className='font-40'>{`${firstName}`}</h1>
                <p className="form-font px-0" style={{ color: '#6D6969' }}>{`${gender[0].toUpperCase() + gender.substring(1)}`}, {`${age}`} years old
                  <br /> {`${city}`}, {`${zipCode}`}
                </p>
              </div>
            </div>
            <div className="row w-100 danger d-flex justify-content-center align-items-center">
              <div className="col col-md-1 px-0 d-flex justify-content-end">
                <i className="fa-solid fa-user fa-xl"></i>
              </div>
              <div className="col col-md-4 px-1 form-font text-align-start">
                {
                  (contactPreference.length > 0)
                    ? contactPreference.map((item, index) => {
                      return (<p className='form-font m-0' key={index}> {item} </p>);
                    })
                    : <></>
                }
              </div>
              <div className="col col-md-1 d-flex px-0 d-flex justify-content-end">
                <i className="fa-solid fa-pen-to-square" style={{ color: '#B0B0B0' }}></i>
              </div>
            </div>
            <div className="row text-align-start p-2 m-0 w-100 row-cols-md-3 row-cols-1 d-flex align-items-center justify-content-center" style={{ color: '#6D6969' }}>
              <div className="col col-lg-3 px-0 d-flex justify-content-end">
                <p className='form-font my-0'>
                  <span className='form-font pe-1' style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>
                    Seeking:</span>
                  { (friendGenderPreference.length > 0)
                    ? friendGenderPreference.map((item, index) => {
                      return (<span className='form-font' key={index}>{item}</span>);
                    })
                    : <></>
                  }</p>
              </div>
              <div className="col col-lg-1 px-0 d-flex justify-content-end">
                <p className='form-font my-0'>
                  Ages {`${friendAge}`}
                </p>
              </div>
              <div className="col col-lg-2 px-0 d-flex justify-content-end">
                <p className='form-font my-0'>{`${mileRadius}`} Mile Radius<span><i className="fa-solid fa-pen-to-square px-1" style={{ color: '#B0B0B0' }}></i></span></p>
              </div>
            </div>
          </div>
          <div className='vh-profile profile-selection-layout row mx-2 d-flex justify-content-center align-items-center row-cols-lg-5 row-cols-md-2 row-cols-sm-2' style={{ minWidth: '350px' }}>
            {(inputs.length === 10)
              ? inputs
              : <></>
            }
            {(inputs.length === 10)
              ? <div className='row pt-4 justify-content-center'>
                <button className='lt-red-btn' style={{ width: '187px' }}>Retake Quiz</button>
              </div>
              : <></>
            }
          </div>
        </>
      );
    }
  }
}

Profile.contextType = AppContext;
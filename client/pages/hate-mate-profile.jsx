import React from 'react';
import Redirect from '../components/redirect';

export default class HateMateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      redirect: null
    };
  }

  handleClick() {
    window.location.hash = 'match-list';
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
    const hash = window.location.hash;
    const hateMateUserId = Number(hash.slice(19));
    if (!Number.isInteger(hateMateUserId) || hateMateUserId <= 0) {
      this.setState({ redirect: 'not-found' });
      return;
    }
    fetch(`/api/auth/hate-mate-profile-info/${hateMateUserId}`, req)
      .then(res => {
        if (res.status === 200) {
          this.setState({ redirect: 'not-found' });
        }
        return res.json();
      })
      .then(result => {
        const { userInfo, userSelections, matchSelections } = result;
        userSelections.sort((a, b) => {
          return (a.categoryId - b.categoryId);
        });
        this.setState({ isLoading: false, userInfo, userSelections, matchSelections });
      });
  }

  render() {
    const { isLoading, redirect, userInfo, userSelections, matchSelections } = this.state;
    if (redirect === 'not-found') {
      return <Redirect to='not-found' />;
    }

    let firstName;
    let city;
    let zipCode;
    let birthday;
    let gender;
    let contact;
    let email;
    let phone;
    let fileName;
    let url;
    let contactPreference;
    let age;
    let profilePicture = (<div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
      <a><i className="fa-solid fa-camera fa-xl" style={{ color: '#6D6969' }} data-bs-toggle="modal" data-bs-target="#photo-modal" id='modal'></i></a>
    </div>);
    let inputs;

    if (userInfo !== undefined) {
      ({ firstName, city, zipCode, birthday, contact, email, phone, gender, fileName, url } = userInfo);

      if (contact.includes('phone') && contact.includes('email')) {
        contactPreference = [phone, email];
      } else if (contact.includes('email') && (!contact.includes('phone'))) {
        contactPreference = [email];
      } else if (contact.includes('phone') && (!contact.includes('email'))) {
        contactPreference = [phone];
      }

      const today = new Date();
      const birthDate = new Date(birthday);
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (url !== null && fileName !== null) {
        profilePicture = (
          <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px' }}>
            <a><img data-bs-toggle="modal" data-bs-target="#photo-modal" className='profile-picture' id='modal' style={{ width: '120px', height: '120px' }} src={url} alt={fileName} /></a>
          </div>
        );
      }

      inputs = userSelections.map(selection => {
        const words = selection.selectionName.split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const descriptionWords = words.join(' ');
        const description = `${descriptionWords}`;

        let colorClass = selection.colorClass;
        if (colorClass === undefined) {
          colorClass = 'selected';
        }

        matchSelections.forEach(match => {
          if (selection.selectionId === match.selectionId) {
            colorClass = 'matched';
          }
        });

        return (
          <div className="col pt-2 px-0 d-flex justify-content-center"
            key={selection.selectionId}
            selection-id={selection.selectionId}>
            <div className="selections-container"
              selection-id={selection.selectionId}
            >
              <img className='hate-selection-img' src={`${selection.src}`} alt={`${selection.selectionName}`}></img>
              <div className="selected-positioning">
                <div
                  selection-id={selection.selectionId}
                  className={`${colorClass} text-center d-flex justify-content-center align-items-center`}>
                  {description}
                </div>
              </div>
            </div>
          </div>
        );

      });

    }

    return (
      <>
      {isLoading
        ? (
        <div className='vhminus text-center d-flex flex-column align-items-center justify-content-center'>
          <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
        </div>
          )
        : (

          <>
              <div className="position-absolute behind dynamic-height shadow start-0" style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
              </div>
              <div className="on-top position-relative">
                <div className="row pt-4 w-100 row-cols-md-1 d-flex justify-content-center align-items-center">
                  <div className="col d-flex justify-content-center px-0">
                    {profilePicture}
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
                            <p className='form-font mx-0 mt-0 mb-6' key={index}> {item} </p>
                          );
                        })
                        : <></>
                    }
                  </div>
                </div>
              </div>
              {(inputs.length === 10)
                ? (<div className='position-relative row d-flex justify-content-center align-items-center row-cols-lg-5 row-cols-md-2 row-cols-sm-2' style={{ marginTop: '5rem' }}>
                {inputs}
                </div>)
                : <></>
              }

          </>
          )}
        <div className="col d-flex justify-content-center">
          <button onClick={this.handleClick} action='view-pending' className='lt-red-btn px-1 mt-5 mx-0'>
            View Matches
          </button>
        </div>
      </>

    );

  }

}

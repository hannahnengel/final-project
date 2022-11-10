import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import PhotoModal from '../components/photo-modal';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.getDBInfo = this.getDBInfo.bind(this);
  }

  editInfo(event) {
    const action = event.target.getAttribute('action');
    window.location.hash = action;
  }

  handleClick(event) {
    const categoryId = event.target.getAttribute('category');
    let action;
    if (event.target.className.includes('edit-icon')) {
      action = 'edit';
    } else { action = 'retake'; }

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/categories/${categoryId}`, req)
      .then(res => res.json())
      .then(result => {
        const words = result[0].categoryName.toLowerCase().split(' ');
        const category = words.join('-');
        this.setState({ Redirect: category, action });
      });

  }

  handleMouseHover(event) {
    const action = event._reactName;
    const selectionId = parseInt(event.target.getAttribute('selection-id'), 10);
    const selections = this.state.selections;
    const selectionsCopy = [...selections];
    for (let i = 0; i < selectionsCopy.length; i++) {
      if (selectionId === selectionsCopy[i].selectionId) {
        if (action === 'onMouseEnter') {
          selectionsCopy[i].colorClass = 'white-overlay';
          selectionsCopy[i].descriptionType = 'icon';
        }
        if (action === 'onMouseLeave') {
          selectionsCopy[i].colorClass = 'selected';
          selectionsCopy[i].descriptionType = 'text';
        }

      }
    }
    this.setState({ selections: selectionsCopy });
  }

  getDBInfo() {
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'x-access-token': xaccesstoken
      }
    };
    fetch('/api/auth/profile-picture/', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'no info exists') {
          this.setState({ url: null, fileName: null });
        } else {
          const { fileName, url } = result;
          this.setState({ url, fileName });
        }
      });
  }

  componentDidMount() {
    const xaccesstoken = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };
    fetch('/api/auth/user-profile', req)
      .then(res => res.json())
      .then(result => {
        if (result !== 'no info exists') {
          const { selections, userInfo } = result;
          this.setState({ selections, userInfo, isLoading: false });
        } else {
          this.setState({ selections: result, userInfo: result });
        }

      });
  }

  render() {
    const { isLoading, selections, userInfo } = this.state;

    if (selections === 'no info exists') {
      return (
        <Redirect to='' />
      );
    }

    let gender;
    let birthday;
    let phone;
    let contact;
    let firstName;
    let email;
    let city;
    let zipCode;
    let friendAge;
    let friendGender;
    let mileRadius;
    let contactPreference;
    let url;
    let fileName;
    let age;
    const friendGenderPreference = [];

    let profilePicture = (
      <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
        <a><i className="fa-solid fa-camera fa-xl" style={{ color: '#6D6969' }} data-bs-toggle="modal" data-bs-target="#photo-modal" id='modal'></i></a>
      </div>);

    if (!isLoading) {
      if (userInfo !== undefined) {
        if (userInfo !== 'no info exists') {
          ({ gender, birthday, phone, contact, firstName, email, city, zipCode, friendAge, friendGender, mileRadius, url, fileName } = userInfo[0]);

          if (contact.includes('phone') && contact.includes('email')) {
            contactPreference = [phone, email];
          } else if (contact.includes('email') && (!contact.includes('phone'))) {
            contactPreference = [email];
          } else if (contact.includes('phone') && (!contact.includes('email'))) {
            contactPreference = [phone];
          }

          let friendGenderPreferenceArray = [];
          friendGenderPreferenceArray = friendGender.replace(/{|}|"|"/g, '').split(',');
          for (let i = 0; i < friendGenderPreferenceArray.length; i++) {
            if (i < friendGenderPreferenceArray.length - 1) {
              friendGenderPreference.push(friendGenderPreferenceArray[i][0].toUpperCase() + friendGenderPreferenceArray[i].substring(1) + ', ');
            } else {
              friendGenderPreference.push(friendGenderPreferenceArray[i][0].toUpperCase() + friendGenderPreferenceArray[i].substring(1));
            }
          }

          const today = new Date();
          const birthDate = new Date(birthday);
          age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }

          if (fileName !== null && url !== null) {
            profilePicture = (
          <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px' }}>
            <a><img data-bs-toggle="modal" data-bs-target="#photo-modal" className='profile-picture' id='modal' style={{ width: '120px', height: '120px' }} src={url} alt={fileName} /></a>
          </div>
            );
          }

        } else {
          return (<Redirect to='' />);
        }
      }
      if (this.state.url !== null && this.state.url !== undefined && this.state.fileName !== null && this.state.fileName !== undefined) {
        ({ fileName, url } = this.state);
        profilePicture = (
          <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px' }}>
            <a><img data-bs-toggle="modal" data-bs-target="#photo-modal" className='profile-picture' id='modal' style={{ width: '120px', height: '120px' }} src={url} alt={fileName} /></a>
          </div>
        );
      }
    }

    let inputs;
    if (this.state.Redirect && this.state.action) {
      const category = this.state.Redirect;
      const action = this.state.action;
      localStorage.setItem('action', action);
      window.location.hash = `hate-selections/${category}`;
    }

    if (selections !== undefined && selections !== 'no info exists') {
      selections.sort((a, b) => {
        return (a.categoryId - b.categoryId);
      });

      inputs = selections.map(selection => {
        let description;
        let descriptionType = selection.descriptionType;
        if (descriptionType === undefined) {
          descriptionType = 'text';
        }
        if (descriptionType === 'icon') {
          description = <i className='fa-solid fa-pen-to-square fa-xl edit-icon' category={selection.categoryId} onClick={this.handleClick}></i>;
        } else {
          const words = selection.selectionName.split(' ');
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          }
          const descriptionWords = words.join(' ');
          description = `${descriptionWords}`;
        }

        let colorClass = selection.colorClass;
        if (colorClass === undefined) {
          colorClass = 'selected';
        }

        return (
          <div className="col pt-2 px-0 d-flex justify-content-center"
          key={selection.selectionId}
          selection-id={selection.selectionId}>
            <div className="selections-container"
              onMouseEnter={this.handleMouseHover}
              onMouseLeave={this.handleMouseHover}
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

    return (<>
      {isLoading
        ? (
        <div className='vhminus text-center d-flex flex-column align-items-center justify-content-center'>
          <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
        </div>
          )
        : (
          <>
         <PhotoModal action='photo-modal' getDBInfo={this.getDBInfo}/>
           <div className="position-absolute behind dynamic-height shadow start-0" style={{ width: '100%', backgroundColor: '#F0F0F0' }}>
           </div>
           <div className="on-top position-relative">
             <div className="row pt-2 w-100 row-cols-md-1 d-flex justify-content-center align-items-center">
               <div className="col d-flex justify-content-center px-0">
                { profilePicture }
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
              <div className="col col-md-6 d-flex justify-content-center px-0">
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
              <div className="col col-md-2 d-flex justify-content-center px-0">
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
              <button onClick={this.handleClick} category='1' className='lt-red-btn retake-quiz-btn'>Retake Quiz</button>
            </div>
            : <></>
          }
        </>

          )
      }
    </>);
  }
}

Profile.contextType = AppContext;

import React from 'react';
import AppContext from '../lib/app-context';

export default class Matches extends React.Component {

  handleClick() {
    const action = 'retake';
    localStorage.setItem('action', action);
    window.location.hash = 'hate-selections/pets';
  }

  componentDidMount() {
    const { user } = this.context;
    // console.log('user', user);
    const potentialDemoMatches = [];
    const potentialLocationMatches = [];
    // const potentialMatches = [];
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };

    fetch('/api/auth/friend-preferences', req)
      .then(res => res.json())
      .then(result => {
        const { friendAge, friendGender, mileRadius } = result[0];
        const centerLat = result[0].lat;
        const centerLng = result[0].lng;
        if (result.error) {
          alert(result.error);
        }

        const body = {
          friendGender
        };
        req.body = JSON.stringify(body);
        req.method = 'POST';
        fetch('/api/user-info', req)
          .then(res => res.json())
          .then(result => {
            let userGender;
            let userAge;

            const getAge = birthday => {
              const today = new Date();
              const birthDate = new Date(birthday);
              let age = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              return age;
            };

            const isAgeMatch = (age, friendAge) => {
              const friendAgeArray = friendAge.split('-');
              const youngestFriend = parseInt(friendAgeArray[0]);
              const oldestFriend = parseInt(friendAgeArray[1]);

              if (age >= youngestFriend && age <= oldestFriend) {
                return true;
              } else {
                return false;
              }
            };

            result.forEach(result => {
              if (result.userId === user.userId) {
                result.gender === 'non-binary' ? userGender = 'nonBinary' : userGender = result.gender;
                userAge = getAge(result.birthday);
              } else if (isAgeMatch(getAge(result.birthday), friendAge)) {
                potentialDemoMatches.push(result);
              }
            });
            if (potentialDemoMatches.length !== 0) {
              req.method = 'GET';
              req.body = null;
              potentialDemoMatches.forEach((match, index) => {
                const { userId } = match;
                fetch(`/api/friend-preferences/${userId}`, req)
                  .then(res => res.json())
                  .then(result => {
                    const checkGender = result[0].friendGender;
                    const checkGenderArray = checkGender.replace(/{|}|"|"/g, '').split(',');
                    let genderMatch = false;
                    checkGenderArray.forEach(gender => {
                      if (userGender === gender) {
                        genderMatch = true;
                      }
                    });
                    const ageMatch = isAgeMatch(userAge, result[0].friendAge);

                    const kmCenterRadius = mileRadius * 1.60934;
                    const checkLat = result[0].lat;
                    const checkLng = result[0].lng;
                    const kmCheckRadius = result[0].mileRadius * 1.60934;

                    const arePointsNear = (centerLat, centerLng, checkLat, checkLng, kmRadius) => {
                      const ky = 40000 / 360;
                      const kx = Math.cos(Math.PI * centerLat / 180.0) * ky;
                      const dx = Math.abs(centerLng - checkLng) * kx;
                      const dy = Math.abs(centerLat - checkLat) * ky;
                      return Math.sqrt(dx * dx + dy * dy) <= kmRadius;
                    };
                    if (genderMatch && ageMatch && arePointsNear(centerLat, centerLng, checkLat, checkLng, kmCenterRadius) &&
                    arePointsNear(checkLat, checkLng, centerLat, centerLng, kmCheckRadius)) {
                      potentialLocationMatches.push(result[0]);
                    }
                    if (index === potentialDemoMatches.length - 1) {
                      // console.log('potentialLocationMatches', potentialLocationMatches);
                    }
                  });
              });

            }
          });
      });
  }

  render() {
    return (
      <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
        <div className='row mb-5'>
          <div className='col'>
            <h1>MATCHES</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className='px-3'>No Matches yet! &#128557; </p>
          </div>
        </div>
        <div className="row w-100 m-5">
          <div className="col d-flex justify-content-center">
            <button onClick={this.handleClick} className='lt-red-btn retake-quiz-btn px-1 mt-1 mx-0'>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Matches.contextType = AppContext;

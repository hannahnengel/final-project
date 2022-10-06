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
    const potentialGenderMatches = [];
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

        const friendGenderArray = friendGender.replace(/{|}|"|"/g, '').split(',');
        const bodyGenderArray = [];
        friendGenderArray.forEach((friendGender, i) => {
          if (friendGender === 'nonBinary') {
            friendGender = 'non-binary';
          }
          bodyGenderArray.push({ friendGender });

        });
        req.method = 'POST';
        const allGenderPromises = bodyGenderArray.map(body => {
          req.body = JSON.stringify(body);
          return fetch('/api/user-info', req)
            .then(res => res.json())
            .then(result => {
              return result;
            });
        });
        Promise.all(allGenderPromises).then(result => {
          result.forEach(array => {
            array.forEach(item => {
              potentialGenderMatches.push(item);
            });
          });

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

          potentialGenderMatches.forEach(potentialAgeMatch => {
            if (potentialAgeMatch.userId === user.userId) {
              userAge = getAge(potentialAgeMatch.birthday);
              potentialAgeMatch.gender === 'non-binary' ? userGender = 'nonBinary' : userGender = potentialAgeMatch.gender;
            }

            if (isAgeMatch(getAge(potentialAgeMatch.birthday), friendAge)) {
              potentialDemoMatches.push(potentialAgeMatch);
            }
          });
          req.method = 'GET';
          req.body = null;
          const allDemoPromises = potentialDemoMatches.map(potentialDemoMatch => {
            const { userId } = potentialDemoMatch;
            return fetch(`/api/friend-preferences/${userId}`, req)
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

                const locationMatch = !!((arePointsNear(centerLat, centerLng, checkLat, checkLng, kmCenterRadius) && arePointsNear(checkLat, checkLng, centerLat, centerLng, kmCheckRadius)));

                if (genderMatch && ageMatch && locationMatch && result[0].userId !== user.userId) {
                  return result[0];
                } else return null;
              });
          });
          Promise.all(allDemoPromises).then(result => {
            result.forEach(item => {
              if (item !== null) {
                potentialLocationMatches.push(item);
              }
            });
            // console.log('potentialLocationMatches', potentialLocationMatches, 'potentialLocationMatches.length', potentialLocationMatches.length);
            // fetch the selections and compare the selections //
          });
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

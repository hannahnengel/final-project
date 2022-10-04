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
    const potentialMatches = [];
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
        const { friendAge, friendGender } = result[0];
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
            // console.log(result);
            result.forEach(result => {
              const today = new Date();
              const birthDate = new Date(result.birthday);
              let age = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              const friendAgeArray = friendAge.split('-');
              const youngestFriend = parseInt(friendAgeArray[0]);
              const oldestFriend = parseInt(friendAgeArray[1]);

              if (age >= youngestFriend && age <= oldestFriend && result.userId !== user.userId) {
                potentialMatches.push(result);
              }
            });
            if (potentialMatches.length !== 0) {
              req.method = 'GET';
              req.body = null;
              potentialMatches.forEach(match => {
                const { userId } = match;
                fetch(`/api/friend-preferences/${userId}`, req)
                  .then(res => res.json())
                  .then(result => {
                    // console.log('result', result);
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

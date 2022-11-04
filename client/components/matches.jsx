import React from 'react';
import AppContext from '../lib/app-context';

export default class Matches extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.context;
    const status = event.target.getAttribute('action');
    const currentUserId = user.userId;
    const otherUserId = this.state.matchToDisplayUserId;
    let userId1;
    let userId2;
    let statusToUpdate;

    if (currentUserId < otherUserId) {
      userId1 = currentUserId;
      userId2 = otherUserId;
      statusToUpdate = 'user1Status';
    } else {
      userId1 = otherUserId;
      userId2 = currentUserId;
      statusToUpdate = 'user2Status';
    }
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };
    req.body = JSON.stringify({
      userId1, userId2, statusToUpdate, status
    });

    fetch('/api/match-status-update', req)
      .then(res => res.json())
      .then(result => {
        // console.log('result', result);
      });

  }

  handleClick() {
    window.location.hash = 'match-list';
  }

  componentDidMount() {
    const { user } = this.context;
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };
    fetch('/api/auth/find-matches/', req)
      .then(res => res.json())
      .then(result => {
        if (result === 'no potential matches exist') {
          // console.log('SUCKAAAA');
        } else {
          const { potentialMatches, matchSelections } = result;

          const otherUsers = [];
          matchSelections.forEach(matchSelection => {
            let otherUser;
            if (matchSelection.userId1 === user.userId) {
              otherUser = matchSelection.userId2;
            } else {
              otherUser = matchSelection.userId1;
            }
            otherUsers.push(otherUser);
          });

          const uniqueOtherUsers = otherUsers.filter((user, index) => {
            return otherUsers.indexOf(user) === index;
          });

          const allMatchTypes = [];
          uniqueOtherUsers.forEach(otherUser => {
            let count = 0;
            let matchType = '';
            otherUsers.forEach(occurance => {
              if (otherUser === occurance) {
                count++;
              }
            });
            if (count <= 4) {
              matchType = 'good';
            } else if (count <= 9) {
              matchType = 'great';
            } else if (count === 10) {
              matchType = 'perfect';
            }
            let userId1;
            let userId2;
            if (user.userId < otherUser) {
              userId1 = user.userId;
              userId2 = otherUser;
            } else {
              userId1 = otherUser;
              userId2 = user.userId;
            }
            allMatchTypes.push({
              userId1,
              userId2,
              matchType
            });

          });

          allMatchTypes.forEach(matchType => {
            potentialMatches.forEach((potentialMatch, i) => {
              if (potentialMatch.userId === matchType.userId1 || potentialMatch.userId === matchType.userId2) {
                potentialMatches[i].matchType = matchType.matchType;
              }
            });
          });

          this.setState({ potentialMatches, matchSelections });
          const currentUser = user.userId;
          const body = {
            matchSelections, allMatchTypes, currentUser
          };
          req.method = 'POST';
          req.body = JSON.stringify(body);

          fetch('/api/auth/post-matches/', req)
            .then(res => res.json())
            .then(result => {
              const matchStatuses = result;
              // console.log('matchStatuses', matchStatuses);

              const matchesToDisplay = [];

              potentialMatches.forEach(potentialMatch => {
                let currentUser;
                matchStatuses.forEach(matchStatus => {
                  if (potentialMatch.userId === matchStatus.userId1 || potentialMatch.userId === matchStatus.userId2) {
                    potentialMatch.userId1 = matchStatus.userId1;
                    potentialMatch.userId2 = matchStatus.userId2;
                    if (user.userId === matchStatus.userId1) {
                      currentUser = 'userId1';
                    } else {
                      currentUser = 'userId2';
                    }
                    potentialMatch.user1Status = matchStatus.user1Status;
                    potentialMatch.user2Status = matchStatus.user2Status;
                    potentialMatch.matchStatus = matchStatus.matchStatus;
                  }
                });
                if (currentUser === 'userId1') {
                  if (potentialMatch.matchStatus === 'pending' && potentialMatch.user1Status === 'pending' && potentialMatch.matchStatus === 'pending') {
                    matchesToDisplay.push(potentialMatch);
                  }
                } else if (currentUser === 'userId2') {
                  if (potentialMatch.matchStatus === 'pending' && potentialMatch.user2Status === 'pending' && potentialMatch.matchStatus === 'pending') {
                    matchesToDisplay.push(potentialMatch);
                  }
                }

              });
              // console.log('matchesToDisplay', matchesToDisplay);
              this.setState({ matchesToDisplay });
            });

        }

      });
  }

  render() {

    // const { matchesToDisplay } = this.state;

    const {
      matchToDisplayUserId,
      matchToDisplayFirstName,
      matchToDisplayGender,
      matchToDisplayAge,
      matchToDisplayMileage,
      matchToDisplayFileName,
      matchToDisplayUrl,
      matchToDisplayType,
      matchToDisplaySelections
    } = this.state;
    // const { matchToDisplayUserId, matchToDisplayMileage, matchToDisplayGender, matchToDisplayAge, matchToDisplayType, matchToDisplayUrl, matchToDisplayFileName } = this.state;
    // console.log('STATE', this.state);

    const formStyle = {
      width: '100%',
      maxWidth: '900px',
      backgroundColor: 'none'
    };

    const cardStyle = {
      width: '100%',
      height: '100%',
      minHeight: 'calc(100vh - 500px)',
      backgroundColor: '#F0F0F0'
    };

    let profilePicture = (
      <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
        <i className="fa-solid fa-user fa-xl" style={{ color: '#6D6969' }}></i>
      </div>);

    if (matchToDisplayUrl !== null) {
      profilePicture = (
      <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px' }}>
        <a><img className='profile-picture' style={{ width: '120px', height: '120px' }} src={matchToDisplayUrl} alt={matchToDisplayFileName} /></a>
      </div>
      );
    }

    let matchType;
    if (matchToDisplayType !== undefined) {
      matchType = `${matchToDisplayType[0].toUpperCase() + matchToDisplayType.substring(1)} Match!`;
    }

    let matchTypeClass;
    if (matchType === 'Perfect Match!') {
      matchTypeClass = 'yellow';
    } else if (matchType === 'Great Match!') {
      matchTypeClass = 'green';
    } else if (matchType === 'Good Match!') {
      matchTypeClass = 'danger';
    }

    let linkText;

    const $selection3 = document.getElementById('selection3');
    if ($selection3 !== null) {
      if ($selection3.classList.contains('show')) {
        linkText = 'show less';
      } else {
        linkText = 'view all';
      }
    }

    return (
      <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
        { matchToDisplayUserId
          ? (
        <div className="row">
          <form style={formStyle} className='px-2'>
            <div className="row card border-0 shadow p-2 m-0 text-start d-flex align-items-center justify-content-center box-sizing" style={cardStyle}>
              <div className="row row-cols-lg-1 row-cols-sm-2 m-0 p-0">
                <div className="col-4 d-flex justify-content-center pt-2 px-0">
                  {profilePicture}
                </div>
                <div className="col-8 d-flex justify-content-center pt-2 px-0 ">
                  <div className="row w-100 row-cols-1">
                    <div className="col d-flex justify-content-center px-0">
                      <h1>{matchToDisplayFirstName}</h1>
                    </div>
                    <div className="col d-flex justify-content-center px-0">
                          <p className='m-0 form-font'>{`${matchToDisplayGender[0].toUpperCase() + matchToDisplayGender.substring(1)}, ${matchToDisplayAge} years old`}</p>
                    </div>
                    <div className="col d-flex justify-content-center px-0">
                      <p className='m-0 form-font'><span className='ps-0 pe-1'><i className="fa-solid fa-location-dot"></i></span>{`${matchToDisplayMileage} miles away`}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className={`col d-flex justify-content-center ${matchTypeClass}`}>
                      <h5>{matchType}</h5>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col d-flex justify-content-center">
                  <ol className='m-0 p-0'>
                    {matchToDisplaySelections.map((selection, index) => {
                      let li;
                      if (index < 3) {
                        li = <li key={index}>{`hates ${selection}`}</li>;
                      } else if (index >= 3) {
                        li = (
                          <li className='collapse collapse-li' id={`selection${index}`} key={index}>{`hates ${selection}`}</li>
                        );
                      }
                      return li;
                    })}
                  </ol>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col d-flex justify-content-end me-lg-4">
                      <button className="btn-link red-link p-0 m-0 justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target=".collapse-li" aria-controls="selection3 selection4 selection5 selection6 selection7 selection8 selection9"><u>{linkText}</u></button>
                </div>
              </div>

              <div className="row d-flex justify-content-between mt-0 mb-3 p-0">
                <div className="col d-flex justify-content-center px-0">
                    <button type='submit' className="lt-red-btn px-2 m-0 confirm-cancel-btn" action='rejected' onClick={this.handleSubmit}>
                    Decline
                  </button>
                </div>
                <div className="col d-flex justify-content-center px-0">
                  <button type='submit' className='confirm-btn lt-red-btn px-2 m-0 confirm-cancel-btn' action='accepted' onClick={this.handleSubmit}>
                    Accept
                  </button>
                </div>

              </div>
            </div>
          </form>
        </div>
            )
          : (
        <>
            <div className='row mb-5'>
                <div className='col'>
                  <h1>PENDING MATCHES</h1>
                </div>
            </div>
            <div className="row">
              <div className="col">
                <p className='px-3'>No Pending Matches! &#128557; </p>
              </div>
            </div>
            <div className="row w-100 m-5">
              <div className="col d-flex justify-content-center">
                <button onClick={this.handleClick} className='lt-red-btn retake-quiz-btn px-1 mt-1 mx-0'>
                  View Matches
                </button>
              </div>
            </div>
        </>
            )}

      </div>
    );
  }
}

Matches.contextType = AppContext;

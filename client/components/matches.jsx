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
          // console.log('allMatchTypes', allMatchTypes);

          allMatchTypes.forEach(matchType => {
            potentialMatches.forEach((potentialMatch, i) => {
              if (potentialMatch.userId === matchType.userId1 || potentialMatch.userId === matchType.userId2) {
                potentialMatches[i].matchType = matchType.matchType;
              }
            });
          });
          // console.log('potentialMatches', potentialMatches);
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
              // const matchStatuses = result;
              // console.log('matchStatuses', matchStatuses);
            });

        }

        // POST match Selections and match types in body

      });

    //   fetch('/api/auth/friend-preferences', req)
    //     .then(res => res.json())
    //     .then(result => {
    //       const { friendAge, friendGender, mileRadius } = result[0];
    //       const centerLat = result[0].lat;
    //       const centerLng = result[0].lng;
    //       if (result.error) {
    //         alert(result.error);
    //       }

    //       const friendGenderArray = friendGender.replace(/{|}|"|"/g, '').split(',');
    //       const bodyGenderArray = [];
    //       friendGenderArray.forEach((friendGender, i) => {
    //         if (friendGender === 'nonBinary') {
    //           friendGender = 'non-binary';
    //         }
    //         bodyGenderArray.push({ friendGender });
    //       });
    //       req.method = 'POST';
    //       const allGenderPromises = bodyGenderArray.map(body => {
    //         req.body = JSON.stringify(body);
    //         return fetch('/api/user-info', req)
    //           .then(res => res.json())
    //           .then(result => {
    //             return result;
    //           });
    //       });
    //       Promise.all(allGenderPromises).then(result => {
    //         result.forEach(array => {
    //           if (array !== 'no users with that gender') {
    //             array.forEach(item => {
    //               potentialGenderMatches.push(item);
    //             });
    //           }
    //         });

    //         let userGender;
    //         let userAge;

    //         const getAge = birthday => {
    //           const today = new Date();
    //           const birthDate = new Date(birthday);
    //           let age = today.getFullYear() - birthDate.getFullYear();
    //           const m = today.getMonth() - birthDate.getMonth();
    //           if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //             age--;
    //           }
    //           return age;
    //         };

    //         const isAgeMatch = (age, friendAge) => {
    //           const friendAgeArray = friendAge.split('-');
    //           const youngestFriend = parseInt(friendAgeArray[0]);
    //           const oldestFriend = parseInt(friendAgeArray[1]);

    //           if (age >= youngestFriend && age <= oldestFriend) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         };

    //         const potentialMatchInfo = [];
    //         const potentialMatchMileage = [];
    //         potentialGenderMatches.forEach(potentialAgeMatch => {
    //           if (potentialAgeMatch.userId === user.userId) {
    //             userAge = getAge(potentialAgeMatch.birthday);
    //             potentialAgeMatch.gender === 'non-binary' ? userGender = 'nonBinary' : userGender = potentialAgeMatch.gender;
    //           }

    //           if (isAgeMatch(getAge(potentialAgeMatch.birthday), friendAge)) {
    //             potentialDemoMatches.push(potentialAgeMatch);
    //             const potentialMatchAge = getAge(potentialAgeMatch.birthday);
    //             const potentialMatch = {
    //               userId: potentialAgeMatch.userId,
    //               gender: potentialAgeMatch.gender,
    //               age: potentialMatchAge
    //             };
    //             potentialMatchInfo.push(potentialMatch);
    //           }
    //         });
    //         req.method = 'GET';
    //         req.body = null;
    //         const allDemoPromises = potentialDemoMatches.map(potentialDemoMatch => {
    //           const { userId } = potentialDemoMatch;
    //           return fetch(`/api/friend-preferences/${userId}`, req)
    //             .then(res => res.json())
    //             .then(result => {
    //               const checkGender = result[0].friendGender;
    //               const checkGenderArray = checkGender.replace(/{|}|"|"/g, '').split(',');
    //               let genderMatch = false;
    //               checkGenderArray.forEach(gender => {
    //                 if (userGender === gender) {
    //                   genderMatch = true;
    //                 }
    //               });
    //               const ageMatch = isAgeMatch(userAge, result[0].friendAge);

    //               const kmCenterRadius = mileRadius * 1.60934;
    //               const checkLat = result[0].lat;
    //               const checkLng = result[0].lng;
    //               const kmCheckRadius = result[0].mileRadius * 1.609344;

    //               const arePointsNear = (centerLatDeg, centerLngDeg, checkLatDeg, checkLngDeg) => {
    //                 const radiusEarth = 6378.1;
    //                 const centerLat = centerLatDeg * Math.PI / 180;
    //                 const centerLng = centerLngDeg * Math.PI / 180;
    //                 const checkLat = checkLatDeg * Math.PI / 180;
    //                 const checkLng = checkLngDeg * Math.PI / 180;

    //                 const deltaLng = Math.abs(centerLng - checkLng);
    //                 const distance = radiusEarth * Math.acos((Math.sin(centerLat) * Math.sin(checkLat)) + (Math.cos(centerLat) * Math.cos(checkLat) * Math.cos(deltaLng)));
    //                 const distanceMiles = Math.round(((distance / 1.609344) * 10), 1) / 10;
    //                 return distanceMiles;
    //               };

    //               let potentialMatchNear = false;
    //               const potentialMatchDistance = arePointsNear(centerLat, centerLng, checkLat, checkLng);
    //               if (potentialMatchDistance <= kmCenterRadius) {
    //                 potentialMatchNear = true;
    //               }

    //               let nearPotentialMatch = false;
    //               if (potentialMatchDistance <= kmCheckRadius) {
    //                 nearPotentialMatch = true;
    //               }

    //               const locationMatch = !!(potentialMatchNear && nearPotentialMatch);

    //               if (genderMatch && ageMatch && locationMatch && result[0].userId !== user.userId) {
    //                 potentialMatchMileage.push({
    //                   userId: result[0].userId,
    //                   distance: potentialMatchDistance
    //                 });
    //                 return result[0];
    //               } else return null;
    //             });
    //         });
    //         Promise.all(allDemoPromises).then(result => {
    //           const userIds = [user.userId];
    //           result.forEach(item => {
    //             if (item !== null) {
    //               userIds.push(item.userId);
    //             }
    //           });
    //           if (userIds.length > 1) {
    //             const selectionsPromises = userIds.map(id => {
    //               const userId = id;
    //               return fetch(`/api/user-selections/${userId}`, req)
    //                 .then(res => res.json())
    //                 .then(result => {
    //                   return result;
    //                 });
    //             });

    //             Promise.all(selectionsPromises).then(result => {
    //               const currentUserSelections = [];
    //               const otherUserSelections = [];
    //               result.forEach(array => {
    //                 if (array[0].userId === user.userId) {
    //                   array.forEach(selection => currentUserSelections.push(selection));
    //                 } else array.forEach(selection => otherUserSelections.push(selection));
    //               });

    //               const matchSelections = [];

    //               otherUserSelections.forEach(otherUserSelection => {
    //                 currentUserSelections.forEach(currentUserSelection => {
    //                   if (otherUserSelection.categoryId === currentUserSelection.categoryId) {
    //                     if (otherUserSelection.selectionId === currentUserSelection.selectionId) {
    //                       let userId1;
    //                       let userId2;
    //                       if (currentUserSelection.userId < otherUserSelection.userId) {
    //                         userId1 = currentUserSelection.userId;
    //                         userId2 = otherUserSelection.userId;
    //                       } else {
    //                         userId1 = otherUserSelection.userId;
    //                         userId2 = currentUserSelection.userId;
    //                       }
    //                       const match = {
    //                         userId1,
    //                         userId2,
    //                         categoryId: currentUserSelection.categoryId,
    //                         selectionId: currentUserSelection.selectionId
    //                       };
    //                       matchSelections.push(match);
    //                     }
    //                   }
    //                 });
    //               });
    //               req.method = 'POST';
    //               const allMatchSelections = matchSelections.map(matchSelection => {
    //                 req.body = JSON.stringify(matchSelection);
    //                 return fetch('/api/match-selections', req)
    //                   .then(res => res.json())
    //                   .then(result => {
    //                     return result;
    //                   });
    //               });

    //               Promise.all(allMatchSelections).then(result => {
    //                 const allMatches = [];
    //                 result.forEach(matchSelection => {
    //                   allMatches.push(matchSelection[0]);
    //                 });
    //                 const otherUsers = [];
    //                 allMatches.forEach(match => {
    //                   let otherUser;
    //                   if (match.userId1 === user.userId) {
    //                     otherUser = match.userId2;
    //                   } else {
    //                     otherUser = match.userId1;
    //                   }
    //                   otherUsers.push(otherUser);
    //                 });
    //                 const uniqueOtherUsers = otherUsers.filter((user, index) => {
    //                   return otherUsers.indexOf(user) === index;
    //                 });

    //                 const allMatchTypes = [];
    //                 uniqueOtherUsers.forEach(otherUser => {
    //                   let count = 0;
    //                   let matchType = '';
    //                   otherUsers.forEach(occurance => {
    //                     if (otherUser === occurance) {
    //                       count++;
    //                     }
    //                   });
    //                   if (count <= 4) {
    //                     matchType = 'good';
    //                   } else if (count <= 9) {
    //                     matchType = 'great';
    //                   } else if (count === 10) {
    //                     matchType = 'perfect';
    //                   }
    //                   let userId1;
    //                   let userId2;
    //                   if (user.userId < otherUser) {
    //                     userId1 = user.userId;
    //                     userId2 = otherUser;
    //                   } else {
    //                     userId1 = otherUser;
    //                     userId2 = user.userId;
    //                   }
    //                   allMatchTypes.push({
    //                     userId1,
    //                     userId2,
    //                     matchType
    //                   });
    //                 });
    //                 const userMatches = allMatchTypes.map(match => {
    //                   req.body = JSON.stringify(match);
    //                   return fetch('/api/matches', req)
    //                     .then(res => res.json())
    //                     .then(result => {
    //                       return result;
    //                     });
    //                 });
    //                 Promise.all(userMatches).then(result => {
    //                   const matchTypes = [];
    //                   result.forEach(match => {
    //                     matchTypes.push(match[0]);
    //                   });

    //                   const matchesToDisplay = [];

    //                   matchTypes.forEach(match => {
    //                     let currentUserStatus;
    //                     if (match.userId1 === user.userId) {
    //                       currentUserStatus = match.user1Status;
    //                     } else if (match.userId2 === user.userId) {
    //                       currentUserStatus = match.user2Status;
    //                     }

    //                     if (currentUserStatus === 'pending') {
    //                       matchesToDisplay.push(match);
    //                     }

    //                   });
    //                   if (matchesToDisplay.length > 0) {
    //                     const matchToDisplay = matchesToDisplay[0];
    //                     const matchToDisplayType = matchesToDisplay[0].matchType;
    //                     let matchToDisplayUserId;
    //                     if (matchToDisplay.userId1 === user.userId) {
    //                       matchToDisplayUserId = matchToDisplay.userId2;
    //                     }
    //                     if (matchToDisplay.userId2 === user.userId) {
    //                       matchToDisplayUserId = matchToDisplay.userId1;
    //                     }

    //                     let matchToDisplayMileage;
    //                     potentialMatchMileage.forEach(potentialMatch => {
    //                       if (potentialMatch.userId === matchToDisplayUserId) {
    //                         matchToDisplayMileage = potentialMatch.distance;
    //                       }
    //                     });

    //                     let matchToDisplayGender;
    //                     let matchToDisplayAge;
    //                     potentialMatchInfo.forEach(potentialMatch => {
    //                       if (potentialMatch.userId === matchToDisplayUserId) {
    //                         matchToDisplayGender = potentialMatch.gender;
    //                         matchToDisplayAge = potentialMatch.age;
    //                       }
    //                     });

    //                     req.method = 'GET';
    //                     req.body = null;
    //                     fetch(`/api/auth/user-info/${matchToDisplayUserId}`, req)
    //                       .then(res => res.json())
    //                       .then(result => {
    //                         const matchToDisplayFirstName = result[0].firstName;
    //                         const matchToDisplaySelections = [];
    //                         result.forEach(item => {
    //                           matchToDisplaySelections.push(item.selectionName);
    //                         });
    //                         let matchToDisplayUrl;
    //                         let matchToDisplayFileName;
    //                         if (result[0].url === 'no info exists') {
    //                           matchToDisplayUrl = 'none';
    //                           matchToDisplayFileName = 'none';
    //                         } else {
    //                           matchToDisplayUrl = result[0].url;
    //                           matchToDisplayFileName = result[0].fileName;
    //                         }
    //                         this.setState({
    //                           matchToDisplayUserId,
    //                           matchToDisplayFirstName,
    //                           matchToDisplaySelections,
    //                           matchToDisplayMileage,
    //                           matchToDisplayGender,
    //                           matchToDisplayAge,
    //                           matchToDisplayType,
    //                           matchToDisplayUrl,
    //                           matchToDisplayFileName
    //                         });
    //                       });
    //                   }

  //                 });
  //               });
  //             });
  //           }
  //         });
  //       });
  //     });
  }

  render() {

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

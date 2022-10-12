import React from 'react';
import AppContext from '../lib/app-context';

export default class Matches extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasMatches: false,
      matchSelections: [],
      matchSelectionDescriptions: [],
      matchTypes: [],
      potentialMatchInfo: [],
      potentialMatchMileage: []
    };
  }

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
            if (array !== 'no users with that gender') {
              array.forEach(item => {
                potentialGenderMatches.push(item);
              });
            }
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

          const potentialMatchInfo = [];
          const potentialMatchMileage = [];
          potentialGenderMatches.forEach(potentialAgeMatch => {
            if (potentialAgeMatch.userId === user.userId) {
              userAge = getAge(potentialAgeMatch.birthday);
              potentialAgeMatch.gender === 'non-binary' ? userGender = 'nonBinary' : userGender = potentialAgeMatch.gender;
            }

            if (isAgeMatch(getAge(potentialAgeMatch.birthday), friendAge)) {
              potentialDemoMatches.push(potentialAgeMatch);
              const potentialMatchAge = getAge(potentialAgeMatch.birthday);
              const potentialMatch = {
                userId: potentialAgeMatch.userId,
                gender: potentialAgeMatch.gender,
                age: potentialMatchAge
              };
              potentialMatchInfo.push(potentialMatch);
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
                const kmCheckRadius = result[0].mileRadius * 1.609344;

                const arePointsNear = (centerLatDeg, centerLngDeg, checkLatDeg, checkLngDeg) => {
                  const radiusEarth = 6378.1;
                  const centerLat = centerLatDeg * Math.PI / 180;
                  const centerLng = centerLngDeg * Math.PI / 180;
                  const checkLat = checkLatDeg * Math.PI / 180;
                  const checkLng = checkLngDeg * Math.PI / 180;

                  const deltaLng = Math.abs(centerLng - checkLng);
                  const distance = radiusEarth * Math.acos((Math.sin(centerLat) * Math.sin(checkLat)) + (Math.cos(centerLat) * Math.cos(checkLat) * Math.cos(deltaLng)));
                  const distanceMiles = Math.round(((distance / 1.609344) * 10), 1) / 10;
                  return distanceMiles;
                };

                let potentialMatchNear = false;
                const potentialMatchDistance = arePointsNear(centerLat, centerLng, checkLat, checkLng);
                if (potentialMatchDistance <= kmCenterRadius) {
                  potentialMatchNear = true;
                }

                let nearPotentialMatch = false;
                if (potentialMatchDistance <= kmCheckRadius) {
                  nearPotentialMatch = true;
                }

                const locationMatch = !!(potentialMatchNear && nearPotentialMatch);

                if (genderMatch && ageMatch && locationMatch && result[0].userId !== user.userId) {
                  potentialMatchMileage.push({
                    userId: result[0].userId,
                    distance: potentialMatchDistance
                  });
                  return result[0];
                } else return null;
              });
          });
          Promise.all(allDemoPromises).then(result => {
            const userIds = [user.userId];
            result.forEach(item => {
              if (item !== null) {
                userIds.push(item.userId);
              }
            });
            if (userIds.length > 1) {
              const selectionsPromises = userIds.map(id => {
                const userId = id;
                return fetch(`/api/user-selections/${userId}`, req)
                  .then(res => res.json())
                  .then(result => {
                    return result;
                  });
              });

              Promise.all(selectionsPromises).then(result => {
                const currentUserSelections = [];
                const otherUserSelections = [];
                result.forEach(array => {
                  if (array[0].userId === user.userId) {
                    array.forEach(selection => currentUserSelections.push(selection));
                  } else array.forEach(selection => otherUserSelections.push(selection));
                });

                const matchSelections = [];

                otherUserSelections.forEach(otherUserSelection => {
                  currentUserSelections.forEach(currentUserSelection => {
                    if (otherUserSelection.categoryId === currentUserSelection.categoryId) {
                      if (otherUserSelection.selectionId === currentUserSelection.selectionId) {
                        let userId1;
                        let userId2;
                        if (currentUserSelection.userId < otherUserSelection.userId) {
                          userId1 = currentUserSelection.userId;
                          userId2 = otherUserSelection.userId;
                        } else {
                          userId1 = otherUserSelection.userId;
                          userId2 = currentUserSelection.userId;
                        }
                        const match = {
                          userId1,
                          userId2,
                          categoryId: currentUserSelection.categoryId,
                          selectionId: currentUserSelection.selectionId
                        };
                        matchSelections.push(match);
                      }
                    }
                  });
                });
                req.method = 'POST';
                const allMatchSelections = matchSelections.map(matchSelection => {
                  req.body = JSON.stringify(matchSelection);
                  return fetch('/api/match-selections', req)
                    .then(res => res.json())
                    .then(result => {
                      return result;
                    });
                });

                Promise.all(allMatchSelections).then(result => {
                  const allMatches = [];
                  result.forEach(matchSelection => {
                    allMatches.push(matchSelection[0]);
                  });
                  const otherUsers = [];
                  allMatches.forEach(match => {
                    let otherUser;
                    if (match.userId1 === user.userId) {
                      otherUser = match.userId2;
                    } else {
                      otherUser = match.userId1;
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
                      user1Status: 'pending',
                      userId2,
                      user2Status: 'pending',
                      matchType
                    });
                  });
                  const userMatches = allMatchTypes.map(match => {
                    req.body = JSON.stringify(match);
                    return fetch('/api/new-user-matches', req)
                      .then(res => res.json())
                      .then(result => {
                        return result;
                      });
                  });
                  Promise.all(userMatches).then(result => {
                    const matchTypes = [];
                    result.forEach(match => {
                      matchTypes.push(match[0]);
                    });
                    // need to pull profile pic & matchSelection descriptions
                    this.setState({ hasMatches: true, matchTypes, potentialMatchMileage, potentialMatchInfo, matchSelections: allMatches });
                  });
                });
              });
            }
          });
        });
      });
  }

  render() {

    // const { matchTypes, potentialMatchInfo, potentialMatchMileage, matchSelections } = this.state;
    // console.log('STATE', this.state);
    // IF has matches, return carousel
    // map through matchTypes, pull the gender, age, location and match type to display in the box and display in the box
    // if currentUserStatus is pending, SHOW, else do NOT show.
    // ELSE return no match message

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

import React from 'react';
import AppContext from '../lib/app-context';

export default class HateSelectionsInputs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hashroute: this.props.route.path,
      inputSelections: [],
      isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.getSelections = this.getSelections.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const category = this.state.hashroute.slice(16);
    const preValue = this.state[category];
    const value = preValue.replaceAll('-', ' ');
    let selection = {};
    const xaccesstoken = window.localStorage.getItem('react-context-jwt');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': xaccesstoken
      }
    };

    for (let i = 0; i < this.state.inputSelections.length; i++) {
      if (this.state.inputSelections[i].selectionName.toLowerCase() === value) {
        selection = this.state.inputSelections[i];
      }
    }

    const edit = event.target.querySelector('button[action=edit]');
    if (edit !== null) {
      const selectionEdits = [];
      req.method = 'GET';
      fetch('/api/auth/user-selections', req)
        .then(res => res.json())
        .then(result => {
          for (let i = 0; i < result.length; i++) {
            if (selection.categoryId !== result[i].categoryId) {
              selectionEdits.push(result[i]);
            }
          }
          selectionEdits.push(selection);
          for (let j = 0; j < selectionEdits.length; j++) {
            const selectionId = selectionEdits[j].selectionId;
            const categoryId = selectionEdits[j].categoryId;
            let body = {
              categoryId,
              selectionId
            };
            req.method = 'POST';
            req.body = JSON.stringify(body);
            fetch('/api/auth/user-selections', req)
              .then(res => res.json())
              .then(result => {
                if (result.error) {
                  alert(result.error);
                } else {
                  body = {};
                }
              });
            window.location.hash = 'my-profile';
          }
          // find matches, determine type and repost type
          const { user } = this.context;
          req.method = 'GET';
          req.body = null;
          fetch('/api/auth/find-matches/', req)
            .then(res => res.json())
            .then(result => {
              if (result !== 'no potential matches exist') {
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
                const currentUser = user.userId;
                const body = {
                  matchSelections, allMatchTypes, currentUser
                };
                req.method = 'POST';
                req.body = JSON.stringify(body);

                fetch('/api/auth/post-matches/', req)
                  .then(res => res.json())
                  .then(result => {
                  });

              }
            });

        });
      return;
    }

    const allUserSelections = localStorage.getItem('selections');
    if (allUserSelections !== null) {
      const parsedAllSelections = JSON.parse(allUserSelections);
      for (let i = 0; i < parsedAllSelections.length; i++) {
        if (parsedAllSelections[i].categoryId === selection.categoryId) {
          parsedAllSelections.splice(i, 1);
        }
      }
      parsedAllSelections.push(selection);
      localStorage.setItem('selections', JSON.stringify(parsedAllSelections));
    } else {
      localStorage.setItem('selections', JSON.stringify([selection]));
    }

    const { categories } = this.props;

    for (let i = 0; i < categories.length; i++) {
      const currentCategoryArray = categories[i].split(' ');
      const currentCategory = currentCategoryArray.join('-').toLowerCase();

      if (category === currentCategory) {
        if (categories[i] === categories[categories.length - 1]) {
          const data = localStorage.getItem('selections');
          const dataParsed = JSON.parse(data);
          let body = {};
          for (let j = 0; j < dataParsed.length; j++) {
            const { categoryId, selectionId } = dataParsed[j];
            body = {
              categoryId,
              selectionId
            };
            req.body = JSON.stringify(body);
            fetch('/api/auth/user-selections', req)
              .then(res => res.json())
              .then(result => {
                if (result.error) {
                  alert(result.error);
                } else {
                  body = {};
                }
              });
            if (j === dataParsed.length - 1) {
              localStorage.removeItem('selections');
              localStorage.removeItem('action');
              window.location.hash = 'my-profile';

              // find matches, determine type and repost type
              const { user } = this.context;
              req.method = 'GET';
              req.body = null;
              fetch('/api/auth/find-matches/', req)
                .then(res => res.json())
                .then(result => {
                  if (result !== 'no potential matches exist') {
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
                    const currentUser = user.userId;
                    const body = {
                      matchSelections, allMatchTypes, currentUser
                    };
                    req.method = 'POST';
                    req.body = JSON.stringify(body);

                    fetch('/api/auth/post-matches/', req)
                      .then(res => res.json())
                      .then(result => {
                      });

                  }
                });

              return;
            }
          }
        }
        const words = categories[i + 1].split(' ');
        const hash = words.join('-').toLowerCase();
        window.location.hash = `hate-selections/${hash}`;
        this.setState({ hashroute: `hate-selections/${hash}`, isLoading: true }, () => {
          this.getSelections();
        });
      }

    }

  }

  handlePrevious() {
    const { categories } = this.props;
    const category = this.state.hashroute.slice(16);
    for (let i = 0; i < categories.length; i++) {
      const currentCategoryArray = categories[i].split(' ');
      const currentCategory = currentCategoryArray.join('-').toLowerCase();
      if (category === currentCategory) {
        const words = categories[i - 1].split(' ');
        const hash = words.join('-').toLowerCase();
        window.location.hash = `hate-selections/${hash}`;
        this.setState({ hashroute: `hate-selections/${hash}`, isLoading: true }, () => {
          this.getSelections();
        });
      }
    }
  }

  handleCancel() {
    localStorage.removeItem('action');
    window.location.hash = 'my-profile';
  }

  getSelections() {
    const { hashroute } = this.state;
    const { categories } = this.props;
    let categoryId = null;
    for (let i = 0; i < categories.length; i++) {
      const words = categories[i].split(' ');
      const currentCategory = words.join('-').toLowerCase();
      if (hashroute.slice(16) === currentCategory) {
        categoryId = i + 1;
      }
    }
    if (categoryId !== null) {
      fetch(`/api/selections/${categoryId}`)
        .then(res => res.json())
        .then(result => {
          this.setState({ inputSelections: result, isLoading: false });
        });
    }
  }

  componentDidMount() {
    const { hashroute } = this.state;
    if (hashroute.slice(16) === 'pets') {
      fetch('/api/selections/1')
        .then(res => res.json())
        .then(result => {
          this.setState({ inputSelections: result, isLoading: false });
        });
    }
  }

  render() {
    const { inputSelections, isLoading } = this.state;
    const { categories } = this.props;
    if (inputSelections.length === 0) {
      this.getSelections();
    }

    const { route } = this.props;
    let rowNumberClass = '';
    let category = '';
    for (let i = 0; i < categories.length; i++) {
      if (inputSelections.length > 0 && inputSelections[0].categoryId === i + 1) {
        const words = categories[i].split(' ');
        category = words.join('-').toLowerCase();
      }
    }

    let inputs = '';
    if (inputSelections.length > 0) {
      if (inputSelections.length === 6) {
        rowNumberClass = 'row-cols-lg-3';
      }
      if (inputSelections.length === 8) {
        rowNumberClass = 'row-cols-lg-4';
      }
      if (inputSelections.length === 10) {
        rowNumberClass = 'row-cols-lg-5';
      }

      inputs = inputSelections.map(selection => {
        const words = selection.selectionName.split(' ');
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const selectionValue = words.join('-').toLowerCase();
        const description = words.join(' ');

        return (
          <div className="col pt-2 px-0 selection" key={selection.selectionId}>
            <label htmlFor={`${selectionValue}`}>
              <input
                required
                type='radio'
                id={`${selectionValue}`}
                className='hate-input'
                name={category}
                value={`${selectionValue}`}
                onChange={this.handleChange}
              />
              <div className="selections-container">
                <img className='hate-selection-img' src={`${selection.src}`} alt={`${selection.selectionName}`}></img>
                <div className="middle">
                  <div className="selected p-0 d-flex justify-content-center align-items-center">
                    {`${description}`}
                  </div>
                </div>
              </div>
            </label>
          </div>
        );
      });
    }

    let hidePreviousBtnClass = '';
    if (route.path === ('hate-selections/pets')) {
      hidePreviousBtnClass = 'invisible';
    }

    let buttons;
    const action = localStorage.getItem('action');
    if (action === 'edit') {
      buttons = (
        <>
          <button type='button' className='confirm-cancel-btn lt-red-btn px-2 mt-1 me-4' onClick={this.handleCancel}>Cancel</button>
          <button type='submit' className='confirm-cancel-btn lt-red-btn px-2 mt-1 me-4 confirm-btn' action='edit' >Confirm</button>
        </>
      );
    } else {
      buttons = (
         <>
          <button type='button' onClick={this.handlePrevious} className={`lt-red-btn next-back-btn px-2 mt-1 me-4 ${hidePreviousBtnClass}`} >
              <span><i className="fa-solid fa-arrow-left"></i></span>
              Previous
          </button>
          <button type='submit' action='submit' className='lt-red-btn next-back-btn px-2 mt-1 ms-4'>
              Next
              <span><i className="fa-solid fa-arrow-right"></i></span>
          </button>
        </>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        {
          (inputSelections.length === 0 || isLoading)
            ? <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
            : <div className={`row ${rowNumberClass} row-cols-sm-2`}>
                { inputs }
              </div>
        }
        <div className="row mt-3">
          <div className="d-flex justify-content-center p-0">
            {buttons}
          </div>
        </div>
      </form>
    );
  }

}

HateSelectionsInputs.contextType = AppContext;

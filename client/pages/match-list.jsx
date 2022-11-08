import React from 'react';

export default class MatchList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  handleClick(event) {
    const action = event.target.getAttribute('action');

    if (action === 'retake') {
      localStorage.setItem('action', action);
      window.location.hash = 'hate-selections/pets';
    }

    if (action === 'view-pending') {
      window.location.hash = '';
    }

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
    fetch('/api/auth/get-matches', req)
      .then(res => res.json())
      .then(result => {
        const matches = result;
        this.setState({ matches, isLoading: false });
      });
  }

  render() {
    const { matches, isLoading } = this.state;

    const noMatches = (
        <div className="row">
          <div className="col">
            <p className='px-3'>No Matches yet! &#128557; </p>
          </div>
        </div>
    );

    const cardStyle = {
      width: '400px',
      height: '100%',
      minHeight: '350px',
      backgroundColor: '#F0F0F0'
    };

    let matchList;
    if (matches !== undefined && matches !== 'no matches yet') {
      matchList = matches.map((match, index) => {

        let matchTypeDescription;
        if (match.matchType !== undefined) {
          matchTypeDescription = `${match.matchType[0].toUpperCase() + match.matchType.substring(1)} Match!`;
        }

        let matchTypeClass;
        if (matchTypeDescription === 'Perfect Match!') {
          matchTypeClass = 'yellow';
        } else if (matchTypeDescription === 'Great Match!') {
          matchTypeClass = 'green';
        } else if (matchTypeDescription === 'Good Match!') {
          matchTypeClass = 'danger';
        }

        let profilePicture = (
        <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
          <i className="fa-solid fa-user fa-xl" style={{ color: '#6D6969' }}></i>
        </div>);

        if (match.url !== null) {
          profilePicture = (
        <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px' }}>
          <a><img className='profile-picture' style={{ width: '120px', height: '120px' }} src={match.url} alt={match.fileName} /></a>
        </div>
          );
        }

        return (
          <div className="col mb-3" key={index}>
            <div className="row card border-0 shadow p-2 m-0 text-start d-flex align-items-center justify-content-center box-sizing" style={cardStyle}>
              <div className="row mt-0 mb-1">
                <div className={`col d-flex justify-content-center ${matchTypeClass}`}>
                  <h5>{matchTypeDescription}</h5>
                </div>
              </div>
              <div className="row row-cols-2 m-0 p-0">
                <div className="col-4 d-flex justify-content-center pt-2 px-0">
                  {profilePicture}
                </div>
                <div className="col-8 d-flex justify-content-center pt-2 px-0 ">
                  <div className="row w-100 row-cols-1">
                    <div className="col d-flex justify-content-center px-0">
                      <h1>{match.firstName}</h1>
                    </div>
                    <div className="col d-flex justify-content-center px-0">
                      <p className='m-0 form-font'>{`${match.gender[0].toUpperCase() + match.gender.substring(1)}, ${match.age} years old`}</p>
                    </div>
                    <div className="col d-flex justify-content-center px-0">
                      <p className='m-0 form-font'><span className='ps-0 pe-1'><i className="fa-solid fa-location-dot"></i></span>{`${match.mileage} miles away`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                <a className='text-center mb-0 mt-4' href=""><u>view profile</u></a>
              </div>
            </div>
          </div>

        );
      });
    }

    const matchBlock = (
      <div className="row row-cols-md-3 row-cols-sm-1">
        {matchList}
      </div>
    );

    return (
      <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
        {isLoading
          ? (
          <div className="row">
            <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
          </div>
            )
          : (
            <>
              <div className='row mb-5 mt-5'>
                <div className='col mt-5'>
                  <h1>MATCHES</h1>
                </div>
              </div>
              {matches === undefined || matches === 'no matches yet'
                ? noMatches
                : matchBlock
              }
              <div className="row row-cols-1 w-100 m-5">
                <div className="col d-flex justify-content-center">
                  <button onClick={this.handleClick} action='retake' className='lt-red-btn retake-quiz-btn px-1 mt-1 mx-0 mb-3'>
                    Retake Quiz
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button onClick={this.handleClick} action='view-pending' className='lt-red-btn  px-1 mt-1 mx-0'>
                    Pending Matches
                  </button>
                </div>
              </div>
            </>
            )}
      </div>
    );
  }
}

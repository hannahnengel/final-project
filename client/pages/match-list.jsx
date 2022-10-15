import React from 'react';

export default class MatchList extends React.Component {

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
    </div>);

  }

}

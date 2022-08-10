import React from 'react';
import Redirect from './redirect';
import AppContext from '../lib/app-context';

export default class IncompleteProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    const { profileInfoComplete, friendPreferencesComplete } = this.context;
    if (profileInfoComplete && friendPreferencesComplete) {
      this.setState({ redirectTo: '#hate-selections/pets' });
    } else if (!profileInfoComplete) {
      this.setState({ redirectTo: '#profile-info' });
    } else if (profileInfoComplete && !friendPreferencesComplete) {
      this.setState({ redirectTo: '#friend-preferences' });
    }
  }

  render() {

    const { redirectTo } = this.state;
    if (redirectTo !== null) {
      return <Redirect to={redirectTo} />;
    }
    return (
        <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
          <div className='row mb-5'>
            <div className='col'>
              <h1>HELLO</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className='px-3'>Finish your profile to get started!</p>
            </div>
          </div>
          <div className="row m-5">
            <div className="col d-flex justify-content-center">
              <button onClick={this.handleClick} className='lt-red-btn next-back-btn px-2 mt-1 mx-0'>
                Next
                <span><i className="fa-solid fa-arrow-right"></i></span>
              </button>
            </div>
          </div>
        </div>
    );
  }

}

IncompleteProfile.contextType = AppContext;

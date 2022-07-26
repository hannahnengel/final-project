import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import ProfileInfoForm from '../components/profile-info-form';

export default class ProfileInfo extends React.Component {
  render() {
    const { user, route } = this.context;
    // console.log('user', user);
    if (user === null) { return <Redirect to="#sign-in" />; }
    const header = route.path === 'profile-info' ? 'PROFILE INFO' : 'What type of friend are you looking for?';
    const headerStyle = route.path === 'profile-info' ? '' : 'small-header';

    return (
      <div className="vh-100 text-center d-flex flex-column align-items-center justify-content-center">
        <div className='row'>
          <div className="col">
            <h1 className={headerStyle}>{header}</h1>
          </div>
        </div>
        <div className="row m-1" style={{ maxHeight: '700px' }}>
          <div className="col p-0">
            <ProfileInfoForm
              key={route.path}
              action={route.path}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProfileInfo.contextType = AppContext;

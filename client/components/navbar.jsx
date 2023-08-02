import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    const { user, handleSignOut } = this.context;
    const xaccesstoken = localStorage.getItem('react-context-jwt');
    const req = {
      method: 'DELETE',
      headers: {
        'x-access-token': xaccesstoken
      }
    };
    if (user.demoUser === true) {
      fetch('api/auth/delete-demo-user', req)
        .then(result => {
        });
    }
    handleSignOut();
  }

  render() {
    const { user } = this.context;

    const navStyle = {
      color: 'white',
      backgroundColor: '#ab1716'
    };

    const brandLogoStyle = {
      color: 'white',
      fontFamily: 'Berkshire Swash',
      fontSize: 30
    };

    return (
      <nav className="navbar navbar-expand-lg sticky-top" style={navStyle}>
        <div className="container">
          <a className="navbar-brand" href="#" style={brandLogoStyle}>
            HateMate
          </a>

          <button className="navbar-toggler nav-menu" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-lg fa-solid fa-bars" style={navStyle}></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#" className="a-nav">Home</a>
              </li>
              {(user === null) &&
              <>
              <li className="nav-item">
                <a href="#sign-in" className="a-nav">
                  <i className="fa-solid fa-arrow-right-to-bracket pe-2" />
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a href="#register" className="a-nav">
                  <i className="fa-solid fa-user pe-2" />
                  Register
                </a>
              </li>
              </>
              }

              {user !== null &&
              <>
                <li className="navitem">
                  <a href="#my-profile" className="a-nav">My Profile</a>
                </li>
                <li className="navitem">
                  <a href="#match-list" className="a-nav">Matches</a>
                </li>
                <li className="navitem">
                  <a href="#match-map" className="a-nav">
                    <i className="fa-solid fa-location-dot pe-2"/>
                    Map
                  </a>
                </li>
                <li className="navitem">
                  <a href="" className="a-nav" onClick={this.signOut}>
                    <i className="fa-solid fa-arrow-right-from-bracket pe-2"/>
                    Sign Out
                  </a>
                </li>
              </>
              }

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.contextType = AppContext;

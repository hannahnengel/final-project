import React from 'react';

export default class Navbar extends React.Component {

  handleSignInClick() {
    window.location.href = '#sign-in';
  }

  handleRegisterClick() {
    window.location.href = '#register';
  }

  render() {
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
      <nav className="navbar navbar-expand-md" style={navStyle}>
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
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

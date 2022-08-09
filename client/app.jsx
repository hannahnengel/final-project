import React from 'react';
import jwtDecode from 'jwt-decode';
import { parseRoute } from './lib';
import AppContext from './lib/app-context';
import Home from './pages/home';
import PageContainer from './components/page-container';
import Auth from './pages/auth';
import Navbar from './components/navbar';
import NotFound from './pages/not-found';
import ProfileInfo from './pages/profile-info';
import HateSelections from './pages/hate-selections';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      profileInfoComplete: false,
      friendPreferencesComplete: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  componentDidMount() {
    onhashchange = event => {
      this.setState({ route: parseRoute(window.location.hash) });
    };
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
    if (user !== null) {
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      };
      fetch('api/auth/profile-info', req)
        .then(result => {
          if (result.status === 200) {
            const profileInfoComplete = true;
            this.setState({ profileInfoComplete });
            fetch('api/auth/friend-preferences', req)
              .then(result => {
                if (result.status === 200) {
                  const friendPreferencesComplete = true;
                  this.setState({ friendPreferencesComplete });
                }
              });
          }
        });
    }
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'register' || route.path === 'sign-in') {
      return <Auth />;
    }
    if (route.path === 'profile-info' || route.path === 'friend-preferences') {
      return <ProfileInfo />;
    }
    if (route.path === 'hate-selections/pets' ||
        route.path === 'hate-selections/foods' ||
        route.path === 'hate-selections/desserts' ||
        route.path === 'hate-selections/vacation-activities' ||
        route.path === 'hate-selections/tv-shows' ||
        route.path === 'hate-selections/hobbies' ||
        route.path === 'hate-selections/pet-peeves' ||
        route.path === 'hate-selections/drinks' ||
        route.path === 'hate-selections/fandoms' ||
        route.path === 'hate-selections/music-genres') {
      return <HateSelections />;
    }
    return <NotFound />;
  }

  render() {
    const { user, route, profileInfoComplete, friendPreferencesComplete } = this.state;
    const { handleSignIn, handleSignOut, handleFormComplete } = this;
    const contextValue = { user, route, profileInfoComplete, friendPreferencesComplete, handleSignIn, handleSignOut, handleFormComplete };
    return (
      <AppContext.Provider value={contextValue}>
        <>
        <Navbar />
       <PageContainer>
          { this.renderPage() }
        </PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}

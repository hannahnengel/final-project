import React from 'react';
import { parseRoute } from './lib';
import AppContext from './lib/app-context';
import Home from './pages/home';
import PageContainer from './components/page-container';
import Auth from './pages/auth';
import Navbar from './components/navbar';
import NotFound from './pages/not-found';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
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
    window.localStorage.getItem('react-context-jwt');
    this.setState({ user: null });
  }

  componentDidMount() {
    onhashchange = event => {
      this.setState({ route: parseRoute(window.location.hash) });
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'register' || route.path === 'sign-in') {
      return <Auth />;
    }
    return <NotFound />;
  }

  render() {
    // console.log('STATE', this.state);
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
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

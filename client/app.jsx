import React from 'react';
import { parseRoute } from './lib';
import Home from './pages/home';
import AuthForm from './components/auth-form';
import Navbar from './components/navbar';
import NotFound from './pages/not-found';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
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
      return <AuthForm />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
      <Navbar />
      <div className='container'>
        { this.renderPage() }
      </div>
      </>
    );
  }
}

import React from 'react';
import { parseRoute } from './lib';
import Home from './pages/home';
import AuthForm from './components/auth-form';

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
    if (route.path === 'auth-form') {
      return <AuthForm />;
    }
  }

  render() {
    return (
    <div>
      { this.renderPage() }
    </div>
    );
  }
}

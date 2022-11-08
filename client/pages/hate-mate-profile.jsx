import React from 'react';
import Redirect from '../components/redirect';

export default class HateMateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      redirect: null
    };
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
    const hateMateUserId = 2;
    fetch(`/api/auth/hate-mate-profile-info/${hateMateUserId}`, req)
      .then(res => {
        if (res.status === 200) {
          this.setState({ redirect: 'not-found' });
        }
        return res.json();
      })
      .then(result => {
        const { userInfo, userSelections, matchSelections } = result;
        this.setState({ isLoading: false, userInfo, userSelections, matchSelections });
      });
  }

  render() {
    const { isLoading, redirect } = this.state;
    if (redirect === 'not-found') {
      return <Redirect to='not-found' />;
    }
    return (
      <>
      {isLoading
        ? (
        <div className='vhminus text-center d-flex flex-column align-items-center justify-content-center'>
          <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
        </div>
          )
        : (<h1>Hello World!</h1>)
      }
      </>

    );

  }

}

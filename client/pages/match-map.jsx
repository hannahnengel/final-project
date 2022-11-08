import React from 'react';
// import Map from '../components/map';

export default class MatchMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

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

    fetch('/api/auth/match-map-info', req)
      .then(res => {
        if (res.status === 200) {
          //
        }
        res.json();
      })
      .then(result => {
        // console.log(result);
      });

  }

  render() {

    return (
      <div className='vh-100 text-center d-flex flex-column align-items-center justify-content-center'>
        <div className='row mb-5'>
          <div className='col'>
            <h1>MATCH MAP</h1>
          </div >
        </div >
        <div className="row">
          <div className="col">
            {/* <Map action='match-map' /> */}
          </div>
        </div>
      </div>
    );

  }

}

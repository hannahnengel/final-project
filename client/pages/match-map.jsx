import React from 'react';
import Map from '../components/map';

export default class MatchMap extends React.Component {

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
            <Map action='match-map' />
          </div>
        </div>
      </div>
    );

  }

}

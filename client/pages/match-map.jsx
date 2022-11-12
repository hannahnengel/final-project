import React from 'react';
import Map from '../components/map';

export default class MatchMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      noMatches: false
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
          this.setState({ noMatches: true });
        }
        return res.json();

      })
      .then(result => {
        const { currentUserLocation, matchList } = result;
        this.setState({ currentUserLocation, matchList, isLoaded: true });
      });

  }

  render() {
    const { currentUserLocation, matchList, isLoaded, noMatches } = this.state;

    let mileRadius;
    let lat;
    let lng;

    if (currentUserLocation !== undefined) {
      ({ lat, lng, mileRadius } = currentUserLocation);
      lat = Number(lat);
      lng = Number(lng);
      mileRadius = Number(mileRadius);
    }

    return (
      <div className='pt-5 text-center d-flex flex-column align-items-center justify-content-center'>
        <div className='row pt-5 mb-4'>
          <div className='col'>
            <h1>MATCH MAP</h1>
          </div >
        </div >
        <div className="row w-100">
          <div className="col">
            {!noMatches
              ? (<>
                {isLoaded
                  ? (
                    <Map lat={lat} lng={lng} radius={mileRadius} action='match-map' matchList={matchList} />
                    )
                  : (
                    <div className="ro vh-100 d-flex justify-content-center align-items-center">
                      <h1><i className="fa-solid fa-spinner fa-lg danger spin spinner"></i></h1>
                    </div>
                    )}
              </>)
              : (<div className="row">
                <div className="col mt-4">
                  <p className='px-3'>No Matches yet! &#128557; </p>
                </div>
              </div>)
          }
          </div>
        </div>
      </div>
    );

  }

}

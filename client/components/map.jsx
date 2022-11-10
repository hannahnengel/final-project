import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle, InfoWindow } from '@react-google-maps/api';

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY
  });

  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedMatch(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const { action } = props;
  const options = {
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry.fill',
        stylers: [
          {
            weight: '2.00'
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#9c9c9c'
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.text',
        stylers: [
          {
            visibility: 'on'
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
          {
            color: '#f2f2f2'
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: [
          {
            saturation: -100
          },
          {
            lightness: 45
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#7b7b7b'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [
          {
            color: '#46bcec'
          },
          {
            visibility: 'on'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#c8d7d4'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#070707'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true

  };
  let { lat, lng, radius } = props;

  if (lat === null) {
    lat = 33.6652;
    lng = -117.7491;
  }

  const center = {
    lat,
    lng
  };

  radius = radius * 1609.34;
  let zoom;
  if (radius < 10000) {
    zoom = 11;
  } else if (radius < 20000) {
    zoom = 10;
  } else if (radius < 40000) {
    zoom = 9;
  } else if (radius < 72000) {
    zoom = 8;
  } else if (radius < 320200) {
    zoom = 7;
  } else if (radius < 480000) {
    zoom = 5;
  } else if (radius < 600000) {
    zoom = 4;
  } else if (radius < 5000000) {
    zoom = 3;
  }

  let mapContainerStyle;
  let circleOptions;
  let markers;

  if (action === 'profile-info-form') {
    mapContainerStyle = {
      width: '100%',
      height: '300px'
    };

    circleOptions = {
      strokeColor: '#d68785',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#d68785',
      fillOpacity: 0.35
    };

    markers = (
      <>
    <Marker position={{ lat, lng }} icon={{
      url: '/face-smile-solid.svg',
      scaledSize: new window.google.maps.Size(30, 30),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(15, 15)
    }}/>
    <Circle
      center={center}
      radius={radius}
      options={circleOptions} />
      </>
    );

  }

  const { matchList } = props;

  if (action === 'match-map') {
    mapContainerStyle = {
      width: '100%',
      height: '700px'
    };

    zoom *= 1.4;

    markers = matchList.map(match => {

      const markerLat = Number(match.lat);
      const markerLng = Number(match.lng);

      return (
        <Marker key={match.id} position={{ lat: markerLat, lng: markerLng }} icon={{
          url: '/face-smile-solid.svg',
          scaledSize: new window.google.maps.Size(30, 30),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15)
        }} title='click me for match info!'
            onClick={() => {
              setSelectedMatch(match);
            }}
        />
      );

    });
  }

  let selectedMatchLat;
  let selectedMatchLng;
  let matchTypeDescription;
  let matchTypeClass;
  let firstName;
  let url;
  let matchType;
  let gender;
  let age;
  let distance;
  let fileName;
  let id;
  const handleClick = () => { window.location.hash = `hate-mate-profile/${id}`; };

  let profilePicture = (
    <div className="rounded-circle text-center d-flex justify-content-center align-items-center " style={{ width: '120px', height: '120px', backgroundColor: '#D9D9D9' }}>
      <i className="fa-solid fa-user fa-xl" style={{ color: '#6D6969' }}></i>
    </div>);

  if (selectedMatch) {
    selectedMatchLat = Number(selectedMatch.lat);
    selectedMatchLng = Number(selectedMatch.lng);
    ({ id, firstName, gender, age, distance, fileName, url, matchType } = selectedMatch);

    if (url !== null) {
      profilePicture = (
        <div className="rounded-circle text-center d-flex justify-content-center align-items-center" style={{ width: '120px', height: '120px' }}>
          <a><img className='profile-picture' style={{ width: '120px', height: '120px' }} src={url} alt={fileName} /></a>
        </div>
      );
    }

    if (matchType !== 'no longer a match') {
      matchTypeDescription = `${matchType[0].toUpperCase() + matchType.substring(1)} Match!`;
    } else {
      matchTypeDescription = `${matchType[0].toUpperCase() + matchType.slice(1, -5) + matchType.slice(12, -4).toUpperCase() + (matchType.slice(-4))}.`;
    }

    if (matchTypeDescription === 'Perfect Match!') {
      matchTypeClass = 'yellow';
    } else if (matchTypeDescription === 'Great Match!') {
      matchTypeClass = 'green';
    } else if (matchTypeDescription === 'Good Match!') {
      matchTypeClass = 'danger';
    } else {
      matchTypeClass = 'grey';
    }

  }
  const cardStyle = {
    width: '400px',
    height: '100%',
    minHeight: '350px',
    backgroundColor: '#F0F0F0',
    margin: '1rem'
  };

  return (
    <>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={options}
        >
        {markers}
        {selectedMatch && (
          <InfoWindow
          onCloseClick={() => {
            setSelectedMatch(null);
          }}
          position={{ lat: selectedMatchLat, lng: selectedMatchLng }}
          >
            <div className="row card border-0 shadow p-1 m-0 text-start d-flex align-items-center justify-content-center box-sizing" style={cardStyle}>
              <div className="row m-0">
                <div className={`col d-flex justify-content-center ${matchTypeClass}`}>
                  <h5>{matchTypeDescription}</h5>
                </div>
              </div>
              <div className="row row-cols-2 m-0 p-0">
                <div className="col-4 d-flex justify-content-center pt-2 px-0">
                  {profilePicture}
                </div>
                <div className="col-8 d-flex justify-content-center pt-2 px-0 ">
                  <div className="row w-100 row-cols-1">
                    <div className="col d-flex justify-content-center px-0">
                      <h1>{firstName}</h1>
                    </div>
                    <div className="col d-flex justify-content-center px-0">
                      <p className='m-0 form-font'>{`${gender[0].toUpperCase() + gender.substring(1)}, ${age} years old`}</p>
                    </div>
                    <div className="col d-flex justify-content-center px-0">
                      <p className='m-0 form-font'><span className='ps-0 pe-1'><i className="fa-solid fa-location-dot"></i></span>{`${distance} miles away`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center align-items-center">
                <button className='text-center btn-link red-link mb-0 mt-3' type='button'><u onClick={handleClick}>view profile</u></button>
              </div>
            </div>
          </InfoWindow>
        )}
        </GoogleMap>
      </>

  );

}

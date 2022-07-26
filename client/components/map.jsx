import React from 'react';
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';

export default function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  const lat = 33.6652;
  const lng = -117.7491;

  const center = {
    lat,
    lng
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };

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

  const circleOptions = {
    strokeColor: '#d68785',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#d68785',
    fillOpacity: 0.35
  };

  let { radius } = props;
  radius = radius * 1609.34;

  return (
    <>
       <GoogleMap
       mapContainerStyle={mapContainerStyle}
       center={center}
       zoom={6}
       options={options}
       >
       <Marker position={{ lat, lng }} icon={{
         url: '/face-smile-solid.svg',
         scaledSize: new window.google.maps.Size(30, 30),
         origin: new window.google.maps.Point(0, 0),
         anchor: new window.google.maps.Point(15, 15)
       }}/>
        <Circle
        center={center}
        radius={radius}
        options={circleOptions}/>
       </GoogleMap>
    </>
  );

}

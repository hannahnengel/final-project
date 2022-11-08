import React from 'react';

export default function Locate(props) {
  const { geoLocate } = props;
  return (
    <button
    type='button'
    title='Locate Me!'
    className='locate d-flex justify-content-end m-0 p-0'
    onClick={geoLocate}>
      <i className="fa-solid fa-location-crosshairs danger locate-icon"></i>
    </button>

  );

}

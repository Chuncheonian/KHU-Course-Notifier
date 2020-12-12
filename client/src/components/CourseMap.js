import React, { useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, KmlLayer } from '@react-google-maps/api';

const CourseMap = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,    // .env
  });

  const mapContainerStyle = {
    width: '400px',
    height: '400px',
  };

  const mapRef = useRef();

  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        onLoad={onMapLoad}
      >
      <KmlLayer url= {props.kmlURL} />
      </GoogleMap>
    </div>
  );
};

export default React.memo(CourseMap);
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import React, { useMemo } from 'react'

const Map = () => {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), [])
  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{ height: '100%', width: '100%' }}
    >
      <MarkerF position={center} />
    </GoogleMap>
  )
}

export default Map
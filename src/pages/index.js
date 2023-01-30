import { Box } from '@mui/material'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'
import InputField from '../components/InputField'
import Map from './Map'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const MainPage = () => {
  const [autoComplete, setAutoComplete] = useState(null)
  const [coordinates, setCoordinates] = useState({})
  // TO IMPROVISE!---------------------------------------------------------------------------------------
  const { isLoaded } = useLoadScript({
    libraries: ['places'],
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })
  if (!isLoaded) {
    return
  }

  const onLoad = (data) => {
    setAutoComplete(data)
  }

  const onPlaceChanged = () => {
    // TUW-----------------------------------------------------------------------------------------------
    const lat = autoComplete.getPlace().geometry.location.lat()
    const lng = autoComplete.getPlace().geometry.location.lng()
    setCoordinates({ lat, lng })
  }
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Box sx={{ width: '30%', minHeight: '100%', backgroundColor: 'white', p: 3, boxSizing: 'border-box' }}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputField />
        </Autocomplete>
      </Box>
      <Box sx={{ width: '70%', height: '100%' }}>
        <Map />
      </Box>
    </Box>
  )
}

export default MainPage
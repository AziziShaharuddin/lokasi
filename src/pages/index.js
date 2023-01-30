import { Box, Divider, Typography } from '@mui/material'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import React, { useState } from 'react'
import InputField from '../components/InputField'
import Map from './Map'
import LokasiLogo from '../assets/Lokasi-logo.png'

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={LokasiLogo} alt='logo' style={{ height: '50px', marginBottom: '20px' }} />
        </Box>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputField />
        </Autocomplete>
        <Divider sx={{ my: 3 }} />
        <Typography>
          History
        </Typography>
      </Box>
      <Box sx={{ width: '70%', height: '100%' }}>
        <Map />
      </Box>
    </Box>
  )
}

export default MainPage
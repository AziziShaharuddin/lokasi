import { Box } from '@mui/material'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
import React from 'react'
import InputField from '../components/InputField'
import Map from './Map'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const MainPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })
  if (!isLoaded) {
    return
  }
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Box sx={{ width: '30%', minHeight: '100%', backgroundColor: 'white', p: 3, boxSizing: 'border-box' }}>
        {/* <Autocomplete> */}
        <InputField />
        {/* </Autocomplete> */}
      </Box>
      <Box sx={{ width: '70%', height: '100%' }}>
        <Map />
      </Box>
    </Box>
  )
}

export default MainPage
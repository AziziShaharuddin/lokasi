import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import Map from "./Map";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MainPage = () => {
  const { isLoaded } = useLoadScript({
    libraries: ["places"],
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return;
  }

  return <Map />;
};

export default MainPage;

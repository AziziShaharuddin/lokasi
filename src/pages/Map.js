import {
  Box,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievedDataFail,
  retrievedDataSuccess,
  retrievingData,
} from "../slices";
import InputField from "../components/InputField";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { LocationOn } from "@mui/icons-material";

const Map = () => {
  const theme = useTheme();
  const laptop = useMediaQuery(theme.breakpoints.up("lg"));
  const phone = useMediaQuery(theme.breakpoints.down("sm"));
  const [center, setCenter] = useState({ lat: 3.16, lng: 101.71 });
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const {
    value,
    setValue,
    suggestions: { status, loading, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // Function to handle selection of autocomplete recommendations
  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();
    const results = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(results[0]);
    mapRef.current?.panTo({ lat, lng });
    setCenter({ lat, lng });
  };

  // redux to dispatch action and retrieve data from the store
  const suggestions = useSelector((state) => state.autoComplete?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading) {
      dispatch(retrievingData());
    }
    try {
      dispatch(retrievedDataSuccess(data));
    } catch (error) {
      dispatch(retrievedDataFail(error));
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <InputField
        sx={{
          width: phone ? "90%" : "500px",
          borderRadius: phone ? "5px" : "30px",
        }}
        value={value}
        setValue={setValue}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translate(-50%,0)",
          zIndex: 999,
          backgroundColor: "white.main",
          marginTop: "5px",
          width: phone ? "90%" : "450px",
          borderRadius: "5px",
        }}
      >
        {status === "OK" &&
          suggestions?.map((item, index) => (
            <MenuItem
              onClick={() => handleSelect(item?.description)}
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderBottom: index !== suggestions?.length ? 1 : 0,
                borderColor: "gray.main",
              }}
            >
              <LocationOn sx={{ color: "light-gray-text.main" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "start",
                  width: "100%",
                }}
              >
                <Typography sx={{ color: "dark-text.main", fontWeight: 500 }}>
                  {item?.structured_formatting?.main_text}
                </Typography>
                <Typography
                  noWrap
                  variant="body2"
                  sx={{
                    color: "light-gray-text.main",
                    width: "calc(100% - 50px)",
                  }}
                >
                  {item?.structured_formatting?.secondary_text}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        {status === "ZERO_RESULTS" && (
          <MenuItem disabled sx={{ py: 2 }}>
            Location not found
          </MenuItem>
        )}
      </Box>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ height: "100%", width: "100%" }}
        onLoad={onLoad}
        options={
          !laptop && {
            disableDefaultUI: true,
          }
        }
      >
        <MarkerF position={center} />
      </GoogleMap>
    </Box>
  );
};

export default Map;

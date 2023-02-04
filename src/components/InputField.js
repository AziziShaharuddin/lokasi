import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { Close, Search } from "@mui/icons-material";
import LokasiLogo from "../assets/Lokasi-logo.png";
import { Box, useTheme } from "@mui/material";

const InputField = ({ sx, value, setValue, ...rest }) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = useTheme()
  const defaultProps = () => {
    return {
      px: 2,
      display: "flex",
      alignItems: "center",
      gap: 2,
      boxSizing: "border-box",
      outline: 0
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        width: "500px",
        backgroundColor: "white.main",
        position: "absolute",
        zIndex: "99999",
        top: 10,
        left: "50%",
        transform: "translate(-50%,0)",
        outline: isFocus ? '2px solid' : "1px solid",
        outlineColor: isFocus ? theme.palette.primary.main : theme.palette['light-gray-text'].main,
        borderRadius: "30px",
        ...sx,
      }}
    >
      <img src={LokasiLogo} alt="logo" style={{ height: "30px", marginRight: '20px', marginLeft: '20px' }} />
      <Box sx={{ height: '30px', width: '2px', backgroundColor: theme.palette['gray'].main }} />
      <InputBase
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        startAdornment={
          <Search color={isFocus ? "primary" : "light-gray-text"} />
        }
        endAdornment={
          value !== "" && (
            <Close
              sx={{ cursor: "pointer" }}
              color="primary"
              onClick={() => setValue('')}
            />
          )
        }
        fullWidth
        {...rest}
        sx={{ ...defaultProps() }}
      />
    </Box>
  );
};

export default InputField;

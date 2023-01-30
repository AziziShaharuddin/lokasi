import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import { Search } from "@mui/icons-material";

const InputField = ({ sx, ...rest }) => {
  const [isFocus, setIsFocus] = useState(false)
  const defaultProps = () => {
    return {
      px: 2,
      borderRadius: "5px",
      display: "flex",
      alignItems: "center",
      py: 1,
      gap: 2,
      boxSizing: "border-box",
      border: 0,
      ...sx,
    };
  };

  return (
    <InputBase
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      startAdornment={<Search color={isFocus ? 'primary' : 'light-gray-text'} />}
      fullWidth
      {...rest}
      sx={{ ...defaultProps() }}
    />
  );
};

export default InputField;

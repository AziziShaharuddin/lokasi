import palette from "./palette"

const components = {
  MuiInputBase: {
    defaultProps: {
      placeholder: "Search for places",
    },
    styleOverrides: {
      root: {
        outline: '1px solid',
        outlineColor: `${palette['light-gray-text'].main}`,
        '&.Mui-focused': {
          outline: '2px  solid',
          outlineColor: `${palette.primary.main}`,
        },
      },
      input: {
        color: palette['dark-text'].main,
        '&::placeholder': {
          color: `${palette['light-gray-text'].main}`,
          opacity: 1,
        },
      },
    },
  },
}
export default components
import { createTheme } from '@mui/material/styles'

const customTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(','),
    button: {
      fontSize: "1.125rem",
      textTransform: "none"
    },
  },
  palette: {
    primary: {
      50: "#f4e5e7",
      100: "#e3bdc3",
      200: "#d0919b",
      300: "#bd6573",
      400: "#ae4455",
      500: "#a02337",
      600: "#981f31",
      700: "#8e1a2a",
      800: "#841523",
      900: "#730c16",
      A100: "#ffa5ab",
      A200: "#ff727c",
      A400: "#ff3f4d",
      A700: "#ff2535",
    }
  }
})

export default customTheme;
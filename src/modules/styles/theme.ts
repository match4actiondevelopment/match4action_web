'use client';

import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { lato, sourceSerifPro } from './fonts';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#2C3235',
    },
  },
  typography: {
    h1: {
      fontFamily: sourceSerifPro.style.fontFamily,
      fontWeight: 700,
    },
    h2: {
      fontFamily: sourceSerifPro.style.fontFamily,
      fontWeight: 700,
    },
    h3: {
      fontFamily: sourceSerifPro.style.fontFamily,
    },
    h4: {
      fontFamily: lato.style.fontFamily,
    },
    h5: {
      fontFamily: lato.style.fontFamily,
    },
    h6: {
      fontFamily: lato.style.fontFamily,
    },
    body1: {
      fontFamily: lato.style.fontFamily,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;

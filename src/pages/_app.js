import React from 'react';
import AuthProvider from '../contexts/Auth/AuthProvider';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {

  var localStorage = null;
  React.useEffect(() => {
    localStorage = window.localStorage;
    console.log(localStorage);
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider localStorage>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

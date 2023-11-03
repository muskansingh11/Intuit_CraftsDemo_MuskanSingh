import './App.css';
import { Container } from './container';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/styles';

function App() {
  const theme = createTheme({
    palette: {
      customPrimary: {
        main: "#ffffff",
        dark: "#f2f2f2"
      },
      customSecondary: {
        dark: "#7079b7",
        // main: "#959bc9",
        light: "#a2a8d3",
        main: "#8990c8"
      }
    }
  })
  
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Container />
      </MuiThemeProvider>
    </div>
  );
}

export default App;

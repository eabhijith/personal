import * as React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from "react-router-dom";
import Resume from './Components/Resume/Resume';

function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
        },
      }),
    [],
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Resume />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

export default App;

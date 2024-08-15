import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ThemeSettings } from './theme/Theme';

import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import MainPage from './pages/MainPage';
import theme from './theme';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

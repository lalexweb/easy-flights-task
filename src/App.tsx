import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import {Provider} from 'react-redux';
import MainLayout from './layouts/main/MainLayout';
import MainPage from './pages/main/MainPage';
import {store} from './store/store';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <MainLayout>
          <MainPage />
        </MainLayout>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;

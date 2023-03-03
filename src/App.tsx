import { ToastContainer } from 'react-toastify';
import { HomeProvider } from './providers/HomeContext';
import { UserProvider } from './providers/UserContext';
import { AppRoutes } from './routes/routes';
import { GlobalStyles } from './styles/global';

export const App = () => (
  <>
    <ToastContainer
      position='bottom-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
    <GlobalStyles />
    <UserProvider>
      <HomeProvider>
        <AppRoutes />
      </HomeProvider>
    </UserProvider>
  </>
);

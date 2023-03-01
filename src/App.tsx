import { UserProvider } from './providers/UserContext';
import { AppRoutes } from './routes/routes';
import { GlobalStyles } from './styles/global';

export const App = () => (
  <>
    <GlobalStyles />

    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </>
);


import { HomeProvider } from './providers/HomeContext';
import { UserProvider } from './providers/UserContext';
import { AppRoutes } from './routes/routes';
import { GlobalStyles } from './styles/global';

export const App = () => (
  <>
    <GlobalStyles />
    <HomeProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </HomeProvider>
  </>
);

import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ShopPage from '../pages/ShopPage';
import { ProtectedRoutes } from '../ProtectedRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      
      <Route path='/dashboard' element={<ProtectedRoutes />}>
        <Route index element={<ShopPage />} />
      </Route>
    </Routes>
  );
};

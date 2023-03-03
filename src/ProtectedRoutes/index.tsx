import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/UserContext';

export const ProtectedRoutes = () => {
  const { user, loading } = useContext(UserContext);

  const navigate = useNavigate();

  
  // useEffect(() => {
  //   if(!loading){
  //     if (!user) {
  //       navigate('/');
  //     }
  //   }
  // }, [loading]);

  return user ? <Outlet /> : null;
};

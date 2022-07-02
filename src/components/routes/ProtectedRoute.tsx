// React Router
import { Outlet, Navigate } from 'react-router-dom';

// Redux
import { useReduxSelector } from '../../services/redux/hooks';

// Force redirect to /login if not logged in
const ProtectedRoute = () => {
  const loggedIn = useReduxSelector((state) => state.auth.loggedIn);

  return loggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;

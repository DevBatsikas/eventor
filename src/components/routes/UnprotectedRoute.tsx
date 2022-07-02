// React Router
import { Outlet, Navigate } from 'react-router-dom';

// Redux
import { useReduxSelector } from '../../services/redux/hooks';

// Force redirect to /events if logged in
const UnprotectedRoute = () => {
  const loggedIn = useReduxSelector((state) => state.auth.loggedIn);

  return loggedIn ? <Navigate to='/events' /> : <Outlet />;
};

export default UnprotectedRoute;

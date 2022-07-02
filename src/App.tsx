// React Router
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UnprotectedRoute from './components/routes/UnprotectedRoute';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';

// Redux
import { useReduxDispatch } from './services/redux/hooks';
import { storeLogin, storeLogout } from './services/redux/slices/auth.slice';

// Layouts
import HomeLayout from './components/layouts/HomeLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Pages
import Events from './pages/Events';
import Categories from './pages/Categories';
import EventDetails from './pages/EventDetails';

import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const dispatch = useReduxDispatch();

  // Firebase Authentication Listener
  onAuthStateChanged(auth, (user) => {
    dispatch(user ? storeLogin(user.uid) : storeLogout());
  });

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<HomeLayout />}>
          <Route path='/events' element={<Events />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/event/:eventid' element={<EventDetails />} />
        </Route>
      </Route>

      <Route element={<UnprotectedRoute />}>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/events' />} />
    </Routes>
  );
};

export default App;

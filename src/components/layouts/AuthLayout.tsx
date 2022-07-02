// React Router
import { Outlet } from 'react-router-dom';

// Chakra UI
import { Center } from '@chakra-ui/react';

const AuthLayout = () => {
  return (
    <Center minH='100vh'>
      <Outlet />
    </Center>
  );
};

export default AuthLayout;

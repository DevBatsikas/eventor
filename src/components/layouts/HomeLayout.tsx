// React Router
import { Outlet } from 'react-router-dom';

// Chakra UI
import { Container } from '@chakra-ui/react';

// Components
import Header from './Header';

const HomeLayout = () => {
  return (
    <Container maxW='800px' py='8px'>
      <Header />
      <Outlet />
    </Container>
  );
};

export default HomeLayout;

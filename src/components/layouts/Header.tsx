// Chakra UI
import { HStack, IconButton, useColorMode } from '@chakra-ui/react';

// Icons
import {
  FaCalendar,
  FaTags,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from 'react-icons/fa';

// React Router
import { useLocation, Link as RouterLink } from 'react-router-dom';

// Firebase
import { logout } from '../../services/firebase/auth';

const Header = () => {
  // Color Mode
  const { colorMode, toggleColorMode } = useColorMode();

  // Location
  const location = useLocation();

  // Button Handlers
  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <HStack justify='space-between'>
      <HStack>
        <IconButton
          aria-label='events'
          colorScheme='orange'
          fontSize='18px'
          icon={<FaCalendar />}
          variant={location.pathname === '/events' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/events'
        />
        <IconButton
          aria-label='categories'
          colorScheme='orange'
          fontSize='18px'
          icon={<FaTags />}
          variant={location.pathname === '/categories' ? 'solid' : 'ghost'}
          as={RouterLink}
          to='/categories'
        />
      </HStack>

      <HStack>
        <IconButton
          aria-label='light/dark mode'
          colorScheme='orange'
          fontSize='18px'
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          variant='ghost'
          onClick={toggleColorMode}
        />
        <IconButton
          aria-label='logout'
          colorScheme='orange'
          fontSize='18px'
          icon={<FaSignOutAlt />}
          variant='ghost'
          onClick={handleLogoutClick}
        />
      </HStack>
    </HStack>
  );
};

export default Header;

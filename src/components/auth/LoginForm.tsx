import { useState, type ChangeEvent } from 'react';

// Chakra UI
import {
  // General
  VStack,
  IconButton,
  Button,
  Text,
  Link,
  // Forms
  FormControl,
  FormHelperText,
  FormErrorMessage,
  // Inputs
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from '@chakra-ui/react';

// Icons
import {
  FaEnvelope,
  FaUnlockAlt,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaGoogle,
} from 'react-icons/fa';

// React Router
import { Link as RouterLink } from 'react-router-dom';

// Firebase
import { emailLogin, googleLogin } from '../../services/firebase/auth';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Input State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // Input Handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Button Handlers
  const handleLoginClick = async () => {
    let errorFlag = true;

    //#region Error Checking before Server

    // Error Checking email
    if (!email) {
      setEmailErrorMessage('E-mail is required');
      setEmailError(true);
      errorFlag = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailErrorMessage('Please enter a valid e-mail');
      setEmailError(true);
      errorFlag = false;
    } else {
      setEmailError(false);
    }

    // Error Checking password
    if (!password) {
      setPasswordErrorMessage('Password is required');
      setPasswordError(true);
      errorFlag = false;
    } else if (!/(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordErrorMessage('Please enter a valid password');
      setPasswordError(true);
      errorFlag = false;
    } else {
      setPasswordError(false);
    }

    //#endregion

    // If there is an error return
    if (!errorFlag) return;

    setIsLoading(true);

    const loginRequest = await emailLogin(email, password);

    setIsLoading(false);

    //#region Error Checking Server Respones

    // If there was an error during login display
    // message to the user
    if (!loginRequest.success) {
      switch (loginRequest.error) {
        case 'auth/user-not-found':
          setEmailErrorMessage('E-mail not found');
          setEmailError(true);
          break;

        case 'auth/wrong-password':
          setPasswordErrorMessage('Wrong password');
          setPasswordError(true);
          break;

        default:
          setPasswordErrorMessage('Internal Server Error');
          setPasswordError(true);
          break;
      }
    }

    //#endregion
  };

  const handleGoogleLoginClick = async () => {
    setIsLoading(true);

    await googleLogin();

    setIsLoading(false);
  };

  return (
    <VStack spacing={4} textAlign='center'>
      {/* E-mail */}
      <FormControl isInvalid={emailError}>
        <InputGroup>
          <InputLeftElement color='orange.200' children={<FaEnvelope />} />
          <Input
            aria-label='email'
            placeholder='E-mail'
            variant='filled'
            focusBorderColor='orange.200'
            disabled={isLoading}
            value={email}
            onChange={handleEmailChange}
          />
        </InputGroup>

        <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
      </FormControl>

      {/* Password */}
      <FormControl isInvalid={passwordError}>
        <InputGroup>
          <InputLeftElement color='orange.200' children={<FaUnlockAlt />} />

          <Input
            aria-label='password'
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Password'
            variant='filled'
            focusBorderColor='orange.200'
            disabled={isLoading}
            value={password}
            onChange={handlePasswordChange}
          />

          <InputRightElement>
            <IconButton
              aria-label='show/hide password'
              size='sm'
              variant='ghost'
              colorScheme='orange'
              icon={passwordVisible ? <FaEye /> : <FaEyeSlash />}
              onClick={() => setPasswordVisible((prevState) => !prevState)}
            />
          </InputRightElement>
        </InputGroup>

        {passwordError ? (
          <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
        ) : (
          <FormHelperText>We'll never share your credentials</FormHelperText>
        )}
      </FormControl>

      {/* Buttons */}
      <FormControl>
        <Button
          mr='10px'
          leftIcon={<FaSignInAlt />}
          colorScheme='orange'
          isLoading={isLoading}
          onClick={handleLoginClick}
        >
          Login
        </Button>

        <Button
          ml='10px'
          leftIcon={<FaGoogle />}
          colorScheme='red'
          isLoading={isLoading}
          onClick={handleGoogleLoginClick}
        >
          Google
        </Button>

        <FormHelperText>Powered by Firebase</FormHelperText>
      </FormControl>

      {/* Register Link */}
      <VStack spacing={0}>
        <Text>No account? Log In with Google or</Text>
        <Link as={RouterLink} to='/register' color='orange'>
          Register Now
        </Link>
      </VStack>
    </VStack>
  );
};

export default LoginForm;

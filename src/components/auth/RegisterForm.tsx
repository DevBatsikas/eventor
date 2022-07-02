import { useState, type ChangeEvent } from 'react';

// Chakra UI
import {
  // General
  VStack,
  IconButton,
  Button,
  Text,
  Link,
  useToast,
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
} from 'react-icons/fa';

// React Router
import { Link as RouterLink } from 'react-router-dom';

// Firebase
import { emailRegister } from '../../services/firebase/auth';

const RegisterForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
  const handleRegisterClick = async () => {
    let errorFlag = true;

    //#region Error Checking

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

    const registerRequest = await emailRegister(email, password);

    setIsLoading(false);

    //#region Error Checking Server Respones

    // If there was an error during registration
    // display message to the user
    if (!registerRequest.success) {
      switch (registerRequest.error) {
        case 'auth/email-already-in-use':
          setEmailErrorMessage('E-mail already in use');
          setEmailError(true);
          break;

        default:
          setPasswordErrorMessage('Internal Server Error');
          setPasswordError(true);
          break;
      }
    } else {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }

    //#endregion
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

        {/* Password requirements info */}
        {passwordError && (
          <FormHelperText lineHeight={1.2} fontSize='15px'>
            A valid password must be at least 8
            <br />
            characters long and contain at
            <br />
            least one number, one uppercase
            <br />
            and one lowercase letter.
          </FormHelperText>
        )}
      </FormControl>

      {/* Buttons */}
      <FormControl>
        <Button
          leftIcon={<FaSignInAlt />}
          colorScheme='orange'
          isLoading={isLoading}
          onClick={handleRegisterClick}
        >
          Register
        </Button>

        <FormHelperText>Powered by Firebase</FormHelperText>
      </FormControl>

      {/* Login Link */}
      <VStack spacing={0}>
        <Text>Already have an account?</Text>
        <Link as={RouterLink} to='/login' color='orange'>
          Login Now
        </Link>
      </VStack>
    </VStack>
  );
};

export default RegisterForm;

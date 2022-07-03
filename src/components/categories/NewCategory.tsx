import { useState, type ChangeEvent } from 'react';

// Redux
import { useReduxSelector } from '../../services/redux/hooks';

// Firebase
import { createCategory } from '../../services/firebase/firestore/categories';

// Chakra UI
import {
  IconButton,
  // Category Selector
  HStack,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react';

// Icons
import { FaPlus, FaTag, FaTint } from 'react-icons/fa';

const NewCategory = () => {
  // UI State
  const bgColor = useColorModeValue('gray.200', 'gray.900');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uid = useReduxSelector((state) => state.auth.uid);

  // Error State
  const [nameError, setNameError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [colorErrorMessage, setColorErrorMessage] = useState('');

  // Input State
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // Input Handlers
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  // Button Handlers
  const handleNewCategoryClick = () => {
    setVisible((prevState) => !prevState);
    setNameError(false);
    setColorError(false);
  };

  const handleCreateCategoryClick = async () => {
    // Error Checking Name
    if (name === '') {
      setNameErrorMessage("Name body can't be empty");
      setNameError(true);
      return;
    }

    setNameError(false);

    // Error Checking Color
    if (color === '') {
      setColorErrorMessage("Color body can't be empty");
      setColorError(true);
      return;
    }

    if (color.length !== 7) {
      setColorErrorMessage('Color needs to be 7 characters long');
      setColorError(true);
      return;
    }

    setColorError(false);

    setIsLoading(true);

    // Request
    const categoryRequest = await createCategory(name, color, uid);

    setIsLoading(false);

    // Error Checking Request
    if (!categoryRequest.success) {
      setNameErrorMessage('An issue occured while creating your category');
      setNameError(true);
      return;
    }

    setNameError(false);
    setName('');
    setColor('');
  };

  return (
    <>
      <IconButton
        aria-label='add new category'
        colorScheme='orange'
        variant='ghost'
        icon={<FaPlus />}
        onClick={handleNewCategoryClick}
      />

      {/* Category Selector */}
      {visible && (
        <HStack
          spacing={10}
          justify='space-between'
          align='flex-start'
          bgColor={bgColor}
          p={3}
          rounded='md'
        >
          {/* Name */}
          <FormControl isInvalid={nameError}>
            <InputGroup>
              <InputLeftElement color='orange.200' children={<FaTag />} />
              <Input
                aria-label='category name'
                placeholder='Category Name'
                variant='filled'
                focusBorderColor='orange.200'
                disabled={isLoading}
                value={name}
                onChange={handleNameChange}
              />
            </InputGroup>

            <FormErrorMessage>{nameErrorMessage}</FormErrorMessage>
          </FormControl>

          {/* Color */}
          <FormControl isInvalid={colorError}>
            <InputGroup>
              <InputLeftElement color='orange.200' children={<FaTint />} />
              <Input
                aria-label='category color hex'
                placeholder='Category Color Hex'
                variant='filled'
                focusBorderColor='orange.200'
                disabled={isLoading}
                value={color}
                onChange={handleColorChange}
              />
            </InputGroup>

            <FormErrorMessage>{colorErrorMessage}</FormErrorMessage>
          </FormControl>

          <IconButton
            aria-label='create category'
            colorScheme='orange'
            variant='ghost'
            icon={<FaPlus />}
            isLoading={isLoading}
            onClick={handleCreateCategoryClick}
          />
        </HStack>
      )}
    </>
  );
};

export default NewCategory;

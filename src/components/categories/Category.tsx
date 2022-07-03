import { useState, type ChangeEvent } from 'react';

// Firebase
import {
  updateCategory,
  deleteCategory,
} from '../../services/firebase/firestore/categories';

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
  useToast,
} from '@chakra-ui/react';

// Icons
import { FaEdit, FaSave, FaTrash, FaTag, FaTint } from 'react-icons/fa';

const Category = ({
  id,
  defaultName,
  defaultColor,
}: {
  id: string;
  defaultName: string;
  defaultColor: string;
}) => {
  // UI State
  const bgColor = useColorModeValue('gray.200', 'gray.900');
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Error State
  const [nameError, setNameError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [colorErrorMessage, setColorErrorMessage] = useState('');

  // Input State
  const [name, setName] = useState(defaultName);
  const [color, setColor] = useState(defaultColor);

  // Input Handlers
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  // Button Handlers
  const handleEditCategoryClick = () => {
    setIsEditing(true);
  };

  const handleSaveCategoryClick = async () => {
    // Error Checking Name
    if (name === '') {
      setNameErrorMessage("Name can't be empty");
      setNameError(true);
      return;
    }

    setNameError(false);

    // Error Checking Color
    if (color === '') {
      setColorErrorMessage("Color can't be empty");
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
    const categoryRequest = await updateCategory(id, name, color);

    setIsLoading(false);

    // Error Checking Request
    if (!categoryRequest.success) {
      setNameErrorMessage('An issue occured while updating your category');
      setNameError(true);
      return;
    }

    setNameError(false);
    setIsEditing(false);
  };

  const handleDeleteCategoryClick = async () => {
    setIsLoading(true);

    const categoryRequest = await deleteCategory(id);

    setIsLoading(false);

    if (!categoryRequest.success) {
      toast({
        title: 'Internal Server Error',
        description: 'An issue occured while deleting your category.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
            value={color}
            onChange={handleColorChange}
          />
        </InputGroup>

        <FormErrorMessage>{colorErrorMessage}</FormErrorMessage>
      </FormControl>

      <HStack>
        {isEditing ? (
          <IconButton
            aria-label='save category'
            colorScheme='orange'
            variant='ghost'
            icon={<FaSave />}
            isLoading={isLoading}
            onClick={handleSaveCategoryClick}
          />
        ) : (
          <IconButton
            aria-label='edit category'
            colorScheme='orange'
            variant='ghost'
            icon={<FaEdit />}
            isLoading={isLoading}
            onClick={handleEditCategoryClick}
          />
        )}

        <IconButton
          aria-label='delete category'
          colorScheme='red'
          variant='ghost'
          icon={<FaTrash />}
          isLoading={isLoading}
          onClick={handleDeleteCategoryClick}
        />
      </HStack>
    </HStack>
  );
};

export default Category;

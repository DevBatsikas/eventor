import { useEffect, useState } from 'react';

// Chakra UI
import { Progress, Stack } from '@chakra-ui/react';

// Redux
import { useReduxDispatch, useReduxSelector } from '../services/redux/hooks';
import {
  storeUpdate,
  storeReset,
} from '../services/redux/slices/categories.slice';

// Firebase
import { query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { colRef } from '../services/firebase/firestore/categories';

import NewCategory from '../components/categories/NewCategory';
import Category from '../components/categories/Category';

const Categories = () => {
  // Redux
  const uid = useReduxSelector((state) => state.auth.uid);
  const categories = useReduxSelector((state) => state.categories);
  const dispatch = useReduxDispatch();

  const [isLoading, setIsLoading] = useState(false);

  // Firestore Listener
  useEffect(() => {
    setIsLoading(true);

    const q = query(
      colRef,
      where('author', '==', uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      dispatch(storeReset());

      querySnapshot.forEach((doc) => {
        dispatch(
          storeUpdate({
            id: doc.id,
            name: doc.data().name,
            color: doc.data().color,
          })
        );
      });

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [uid, dispatch]);

  return (
    <Stack my='8px'>
      {isLoading && <Progress size='xs' colorScheme='orange' isIndeterminate />}
      <NewCategory />
      {categories.map((category) => (
        <Category
          key={category.id}
          id={category.id}
          defaultName={category.name}
          defaultColor={category.color}
        />
      ))}
    </Stack>
  );
};

export default Categories;

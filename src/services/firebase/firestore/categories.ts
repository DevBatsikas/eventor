import { db } from '..';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const collectionName = 'categories';
export const colRef = collection(db, collectionName);

export const createCategory = async (
  name: string,
  color: string,
  uid: string
) => {
  try {
    await addDoc(colRef, {
      name: name,
      color: color,
      author: uid,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.code };
  }
};

export const updateCategory = async (
  id: string,
  name: string,
  color: string
) => {
  try {
    await updateDoc(doc(db, collectionName, id), {
      name: name,
      color: color,
      lastUpdated: serverTimestamp(),
    });

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.code };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id));

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.code };
  }
};

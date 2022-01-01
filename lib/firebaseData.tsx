import React from 'react';
import { db } from '../firebase/config';

//Firebase hooks
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';

//Component
import NotFoundPage from '../components/pages/not-found';

interface Data {
  name: string;
  price: number;
  src: string[];
  id: string;
  category: string;
  description: string;
  sizes: Number[] | string[];
  composition: string[];
  sizeGuide: string | string[];
}

export const getAllDataFromCollection = async (collectionName: string) => {
  const itemsCollection = collection(db, collectionName);
  const data = await getDocs(itemsCollection);
  if (!data) throw new Error('Could not get the data from the db');
  const items: Data[] | {}[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  if (!items) throw new Error('Could not get the items from the db');
  return items;
};

export const getSingleCategoryData = async (
  collectionName: string,
  categoryName: string
) => {
  try {
    const q = query(
      collection(db, collectionName),
      where('category', '==', categoryName)
    );
    const qS = await getDocs(q);
    if (!qS) throw new Error('Couldnt find the specific category');
    const data = qS.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (!data) throw new Error('Could find the specific category');
    return data;
  } catch (error) {
    return <NotFoundPage />;
  }
};

export const getSingleItemData = async (
  collectionName: string,
  itemName: string
) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, itemName));
    if (!docSnap) throw new Error('Couldnt find item of the specific category');
    const item = { ...docSnap.data(), id: docSnap.id };
    if (!item)
      throw new Error('Couldnt find the item of the specific category');
    return item;
  } catch (error) {
    return <NotFoundPage />;
  }
};

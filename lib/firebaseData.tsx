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

interface MobileData {
  name: string;
  id: string;
  order: number;
  categories?: string[];
}

interface HomeData {
  name: string;
  href: string;
  id: string;
  src: string;
  order: number;
  alt: string;
}

interface StandartData {
  name: string;
  price: number;
  src: string[];
  id: string;
  category: string;
  quantity: number;
  description: string;
  sizes?: Number[] | string[];
  composition?: string[];
  sizeGuide?: string;
}

type AllDataTypes = StandartData | HomeData | MobileData;

export async function getDataForMobileMenu() {
  const itemsCollection = collection(db, 'mobile-menu');
  const data = await getDocs(itemsCollection);

  const items: MobileData[] = data.docs.map((doc) => {
    const data = doc.data();
    return {
      name: data.name,
      order: data.order,
      categories: data.categories ? data.categories : null,
      id: doc.id,
    };
  });
  return items;
}

export async function getDataForHomePage() {
  const itemsCollection = collection(db, 'home');
  const data = await getDocs(itemsCollection);

  const items: HomeData[] = data.docs.map((doc) => {
    const data = doc.data();

    return {
      href: data.href,
      alt: data.alt,
      name: data.name,
      order: data.order,
      src: data.src,
      id: doc.id,
    };
  });
  return items;
}

export const getAllDataForCategory = async (categoryName: string) => {
  const itemsCollection = collection(db, categoryName);
  const data = await getDocs(itemsCollection);
  if (!data) throw new Error('Couldnt get the docs ');
  const items: StandartData[] = data.docs.map((doc) => {
    const data = doc.data();
    return {
      category: data.category,
      id: doc.id,
      name: data.name,
      price: data.price,
      src: data.src,
      composition: data.composition,
      quantity: data.quantity,
      description: data.description ? data.description : null,
      sizeGuide: data.sizeGuide ? data.sizeGuide : null,
      sizes: data.sizes ? data.sizes : null,
    };
  });
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

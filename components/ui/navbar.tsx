import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

//Redux
import type { RootState } from '../../store/store';

//Components
import MobileMenu from '../menu/mobile-menu';
import Apparel from '../menu/apparel';
import Accessories from '../menu/accessories';
import Shoes from '../menu/shoes';
import Wishlist from '../menu/wishlist';
import Checkout from '../menu/checkout';
import Contactus from '../menu/contactus';
import PrivateTailor from '../menu/private-tailor';
import Loading from '../ui/loading';

//MUI
import CircularProgress from '@mui/material/CircularProgress';

//Icon
import { SearchIcon } from '@heroicons/react/outline';
import { getAllDataFromCollection } from '../../lib/firebaseData';

type DataState = {
  src: string[];
  name: string;
  price: number;
  composition: string[];
  quantity: number;
  id: string;
  category: string;
  sizeGuide?: string | string[];
  sizes?: string[];
  description?: string;
}[];

const Navbar: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchingValue, setSearchingValue] = useState('');
  const [data, setData] = useState<[] | DataState>([]);
  const router = useRouter();
  const path = router.pathname;

  const itemsInCart = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const itemsInWishlist = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const accessories = await getAllDataFromCollection('accessories');
      const apparel = await getAllDataFromCollection('apparel');
      const shoes = await getAllDataFromCollection('shoes');
      const combinedData = [...accessories, ...apparel, ...shoes];
      const filteredData: DataState = combinedData.filter((item, i) => {
        if (searchingValue.trim().length < 2) return;
        if (item.name.toLowerCase().includes(searchingValue.toLowerCase()))
          return item;
      });

      setData(filteredData);
      setIsLoading(false);
    };
    const timer = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchingValue]);

  const onItemClickHandler = (
    category: string,
    subcategory: string,
    itemId: string
  ) => {
    router.push(`/${category}/${subcategory}/${itemId}`);
    setIsSearching(false);
    setSearchingValue('');
  };

  return (
    <nav
      className={`shadow-sm ${
        path === '/checkout' && 'hidden'
      } sticky z-50 top-0 bg-white`}
    >
      <div className='flex items-center px-8 lg:px-12 py-4 lg:border-b lg:py-4 '>
        <div onClick={() => setIsSearching((prevState) => !prevState)}>
          <SearchIcon className='icon-6 hidden lg:flex  ' />
        </div>

        {isSearching && (
          <div>
            <div className='z-70 absolute top-16'>
              <input
                placeholder='Search for...'
                className='border py-2 px-4 w-72 z-10'
                value={searchingValue}
                onBlur={() => setIsSearching(false)}
                onChange={(e) => setSearchingValue(e.target.value)}
              />
              <div className='bg-black absolute z-20 left-60 top-0 py-2 pb-2 px-3  '>
                {isLoading ? (
                  <CircularProgress
                    size={20}
                    className='text-white w-full mr-1 text-center'
                    thickness={6}
                  />
                ) : (
                  <SearchIcon className=' text-white icon-6' />
                )}
              </div>
            </div>
            <div className='relative'>
              {searchingValue.trim().length >= 2 && (
                <ul
                  className={`w-72 overflow-y-auto ${
                    data.length === 0 || isLoading
                      ? 'h-11 flex items-center justify-center font-bold '
                      : 'h-40 '
                  } mt-20 -top-2 absolute bg-white border`}
                >
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : data.length === 0 ? (
                    <p>No results were found.</p>
                  ) : (
                    data.map((el, i) => {
                      return (
                        <li
                          key={el.id}
                          className='grid grid-cols-3 w-full h-20 hover:bg-gray-100 cursor-pointer'
                          onClick={onItemClickHandler.bind(
                            null,
                            el.src[0].split('/')[2],
                            el.category,
                            el.id
                          )}
                        >
                          <div className='flex items-center ml-4 col-span-1'>
                            <Image
                              src={el.src[0]}
                              alt={el.description}
                              height={60}
                              width={60}
                            />
                          </div>
                          <div className='flex flex-col justify-between py-3 col-span-2'>
                            <h1 className='text-xs font-fb'>
                              {el.name.toUpperCase()}
                            </h1>
                            <p className='text-gray-400'>{el.price}.00€</p>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        <MobileMenu />
        <Link href='/'>
          <a className='ml-auto '>
            <h1 className='font-logo text-3xl'>Stanley</h1>
          </a>
        </Link>
        <div className='flex space-x-4 ml-auto'>
          <button className='relative'>
            <Wishlist />
            {itemsInWishlist > 0 && (
              <a className='absolute -top-2 left-5 bg-blue-500 rounded-full h-4 w-4 text-xs flex items-center justify-center text-white'>
                {itemsInWishlist}
              </a>
            )}
          </button>
          <button className='relative'>
            <Checkout />
            {itemsInCart > 0 && (
              <a className='absolute -top-2 left-5 bg-yellow-500 rounded-full h-4 w-4 text-xs flex items-center justify-center'>
                {itemsInCart}
              </a>
            )}
          </button>
        </div>
      </div>
      <div className='hidden lg:flex space-x-8 justify-center p-2 '>
        <Apparel />
        <Accessories />
        <Shoes />
        <PrivateTailor />
        <Contactus />
      </div>
    </nav>
  );
};

export default Navbar;

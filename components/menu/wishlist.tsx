import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

//MUI Components
import Drawer from '@mui/material/Drawer';
import Box from '@mui/system/Box';

//Icons
import { HeartIcon, XIcon } from '@heroicons/react/outline';

// Hook & Components
import useMediaQuery from '../../hooks/useMediaQuery';
import ItemPreviewCheckout from '../ui/item/item-preview-checkout';
import EmptyCart from '../pages/empty-cart';

const Wishlist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isBreakpoint = useMediaQuery(1023);
  const items = useSelector((state: RootState) => state.wishlist.items);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <Fragment>
      {!isBreakpoint && (
        <Link href='/wishlist'>
          <a>
            <HeartIcon className='icon-6' />
          </a>
        </Link>
      )}

      {isBreakpoint && (
        <Fragment>
          <HeartIcon className='icon-6' onClick={() => setIsOpen(true)} />
          <Drawer
            anchor='right'
            open={isOpen}
            onClose={toggleDrawer(false)}
            className='hidden lg:flex'
          >
            <Box
              sx={{ width: 450, height: '100%', position: 'relative' }}
              role='presentation'
            >
              <XIcon
                className='icon-6 absolute top-11 left-2'
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              />
              <div className='flex border-b-2 p-4 justify-center items-center'>
                <div className='flex flex-col items-center relative py-3 text-lg'>
                  <HeartIcon className='h-8 w-8 ' />
                  {items.length > 0 && (
                    <a className='absolute top-2 left-16 bg-blue-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center'>
                      {items.length}
                    </a>
                  )}
                  <p className='mt-1 font-medium'>MY WISHLIST</p>
                </div>
              </div>
              {items.length === 0 && (
                <EmptyCart
                  identifier='wishlist'
                  onAutoCloseMenu={() => setIsOpen(false)}
                />
              )}
              {items.length >= 1 && (
                <div className='h-5/6 items-center flex flex-col overflow-x-hidden'>
                  <ul
                    className={`${
                      items.length > 3 && 'overflow-y-scroll'
                    } mb-4 w-xl `}
                  >
                    {items.map((item, index) => (
                      <ItemPreviewCheckout
                        key={index}
                        item={item}
                        identifier='wishlist'
                        onPress={() => setIsOpen(false)}
                      />
                    ))}
                  </ul>
                  <Link href='/wishlist'>
                    <a className='mt-auto mb-6'>
                      <button
                        className='bg-black text-white py-2 px-32 rounded-sm '
                        onClick={() => setIsOpen(false)}
                      >
                        VIEW WISHLIST
                      </button>
                    </a>
                  </Link>
                </div>
              )}
            </Box>
          </Drawer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Wishlist;

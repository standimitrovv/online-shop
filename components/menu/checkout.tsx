import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import Link from 'next/link';

// Hook & Components
import useMediaQuery from '../../hooks/useMediaQuery';
import ItemPreviewCheckout from '../ui/item/item-preview-checkout';
import EmptyCart from '../pages/empty-cart';

//MUI components
import Drawer from '@mui/material/Drawer';
import Box from '@mui/system/Box';

//Icons
import { ShoppingCartIcon, XIcon } from '@heroicons/react/outline';

const Checkout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isBreakpoint = useMediaQuery(1023);

  const itemsInCart = useSelector(
    (state: RootState) => state.cart.items.length
  );
  const items = useSelector((state: RootState) => state.cart.items);

  const priceOfItems = items
    .map((item) => [item.price, item.quantity])
    .reduce((a, e) => a + e.reduce((a, e) => a * e, 1), 0);

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

  const autoCloseMenuHandler = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      {!isBreakpoint && (
        <Link href='/checkout'>
          <a>
            <ShoppingCartIcon className='icon-6' />
          </a>
        </Link>
      )}
      {isBreakpoint && (
        <Fragment>
          <ShoppingCartIcon
            className='icon-6'
            onClick={() => setIsOpen(true)}
          />
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
                  <ShoppingCartIcon className='h-8 w-8 ' />
                  {itemsInCart > 0 && (
                    <a className='absolute top-2 left-20 bg-yellow-500 rounded-full h-5 w-5 text-xs flex items-center justify-center'>
                      {itemsInCart}
                    </a>
                  )}
                  <p className='mt-1 font-medium'>SHOPPING CART</p>
                </div>
              </div>
              {items.length === 0 && (
                <EmptyCart
                  identifier='cart'
                  onAutoCloseMenu={autoCloseMenuHandler}
                />
              )}
              {items.length >= 1 && (
                <div className='h-4/6'>
                  <div className='h-full items-center flex flex-col overflow-x-hidden'>
                    <ul
                      className={`${
                        items.length > 3 && 'overflow-y-scroll'
                      } mb-4 w-xl `}
                    >
                      {items.map((item, i) => (
                        <ItemPreviewCheckout
                          key={i}
                          item={item}
                          identifier='checkout'
                          onPress={autoCloseMenuHandler}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className='items-center flex flex-col mt-9'>
                    <div className='flex justify-between w-96 mt-auto mb-4 font-mont'>
                      <p className='font-bold'>TOTAL:</p>
                      <p className='text-lg font-bold'>{priceOfItems}€</p>
                    </div>
                    <Link href='/checkout'>
                      <a className='mb-6'>
                        <button
                          className='bg-black text-white py-2 px-36 w-96 rounded-sm'
                          onClick={() => setIsOpen(false)}
                        >
                          CHECKOUT
                        </button>
                      </a>
                    </Link>
                    <div className='bg-gray-100 py-4 text-center w-full text-base'>
                      <p>Free shipping over 200€</p>
                    </div>
                  </div>
                </div>
              )}
            </Box>
          </Drawer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Checkout;

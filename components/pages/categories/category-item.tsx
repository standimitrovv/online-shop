import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

//Redux Slices
import { cartActions } from '../../../store/cartSlice';
import { wishlistActions } from '../../../store/wishlistSlice';

//MUI Components
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import Carousel from 'react-material-ui-carousel';

//Icons
import {
  ShoppingCartIcon,
  HeartIcon,
  ScissorsIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  PlusIcon,
  XIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

interface Props {
  item: {
    category: string;
    composition: string[];
    price: number;
    src: string[];
    name: string;
    id: string;
    quantity: number;
    description?: string;
    sizes?: string[] | number[];
    sizeGuide?: string[] | string;
  };
}

const CategoryItemPage: React.FC<Props> = ({ item }) => {
  const [descriptionIsOpen, setDescriptionIsOpen] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [shippingIsOpen, setShippingIsOpen] = useState(false);
  const [sizeIsSelected, setSizeIsSelected] = useState('default');

  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.wishlist.items);
  const itemId = item.id;
  const itemIsInWishlist = items.find((item) => item.id === itemId);

  const handleDialogOpen = () => {
    setDialogIsOpen(true);
  };
  const handleDialogClose = () => {
    setDialogIsOpen(false);
  };

  const addToCartHandler = () => {
    if (sizeIsSelected === 'default' && !item.sizes) {
      dispatch(cartActions.addToCart(item));
    }
    if (sizeIsSelected !== 'default') {
      const newItem = {
        ...item,
        size: +sizeIsSelected,
      };
      dispatch(cartActions.addToCart(newItem));
    }
  };

  const addToWishlistHandler = () => {
    dispatch(wishlistActions.addToWishlist(item));
  };

  return (
    <div className='grid grid-cols-1 px-7 lg:grid-cols-2 lg:gap-x-6 lg:px-8 xl:gap-x-20 xl:px-32 2xl:px-44 font-mont mb-12'>
      <div className='lg:mb-4'>
        <Carousel
          navButtonsWrapperProps={{
            style: {
              marginRight: '1.5rem',
              marginLeft: '1.5rem',
            },
          }}
        >
          {item.src.map((image, index) => (
            <Image
              src={image}
              key={index}
              alt={item.description}
              objectFit='contain'
              height={720}
              width={750}
              layout='responsive'
            />
          ))}
        </Carousel>
      </div>
      <div className='py-4 px-2 md:px-4 lg:px-6 xl:mr-0 lg:w-full xl:w-full '>
        <h1 className='text-xl font-semibold mt-4 lg:mt-0 mb-2 font-fb'>
          {item.name.toUpperCase()}
        </h1>
        <h2 className='mb-2 text-lg font-fb'>{item.price},00€</h2>
        <p className='font-fb mb-8 mt-6'>{item.description}</p>

        <form>
          {item.sizes && (
            <div>
              <label className='font-bold'>Size:</label>
              <select
                required
                onChange={(e) => setSizeIsSelected(e.target.value)}
                className='w-44 xl:w-40 py-2 px-2 ml-2 mb-2 text-sm'
              >
                <option value='default'>Choose an option</option>
                {item.sizes?.map((size, i) => (
                  <option value={size} key={i}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            className='flex text-black py-4 px-6 border-2 border-gray-100 cursor-pointer justify-center w-6/12 mb-4 lg:px-4'
            type='button'
            onClick={addToWishlistHandler}
          >
            {!itemIsInWishlist && <HeartIcon className='icon-6 mr-2' />}
            {itemIsInWishlist && <HeartIconSolid className='icon-6 mr-2' />}
            <p>{!itemIsInWishlist ? 'Add to wishlist' : 'Browse wishlist'}</p>
          </button>
          <button
            className='flex btn bg-black text-white px-0 py-4 xl:px-6 cursor-pointer justify-center w-full '
            type='button'
            onClick={addToCartHandler}
          >
            <ShoppingCartIcon className='icon-6 mr-2' />
            <p className='text-base font-bold text-white'>
              {sizeIsSelected !== 'default'
                ? 'ADD TO CART'
                : sizeIsSelected === 'default' && !item.sizes
                ? 'ADD TO CART'
                : 'SELECT SIZE'}
            </p>
          </button>
        </form>
        <div className='flex justify-center mt-2 mb-10 px-4 xl:px-8'>
          <div className='flex lg:flex-col xl:flex-row items-center mr-4'>
            <ScissorsIcon className='icon-6 mr-1 lg:mb-1 xl:mb-0' />
            {item.sizes && (
              <div>
                <button
                  className='text-xs font-bold'
                  onClick={handleDialogOpen}
                >
                  SIZING GUIDE
                </button>
                <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
                  <div className='py-2 px-4'>
                    <div className='flex mt-4'>
                      <h1 className='font-mont font-extrabold ml-auto'>
                        SIZE GUIDE
                      </h1>
                      <XIcon
                        className='icon-6 ml-auto'
                        onClick={handleDialogClose}
                      />
                    </div>
                    {typeof item.sizeGuide === 'string' ? (
                      <div>
                        <Image
                          src={item.sizeGuide}
                          alt='Size guide of the current product'
                          height={500}
                          width={500}
                          objectFit='contain'
                        />
                      </div>
                    ) : (
                      item.sizeGuide?.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt='Size guide of the current product'
                          height={500}
                          width={500}
                          objectFit='contain'
                        />
                      ))
                    )}
                  </div>
                </Dialog>
              </div>
            )}
            {!item.sizes && (
              <p className='text-xs font-bold text-center'>MADE IN ITALY</p>
            )}
          </div>
          <div className='flex lg:flex-col xl:flex-row items-center mr-4'>
            <ShoppingBagIcon className='icon-6 mr-1 lg:mb-1 xl:mb-0' />
            <div className='text-center'>
              <button
                className='text-xs font-bold '
                onClick={() => setShippingIsOpen(true)}
              >
                SHIPPING & RETURNS
              </button>
              <Dialog
                open={shippingIsOpen}
                onClose={() => setShippingIsOpen(false)}
              >
                <div className='py-4 my-4 mx-8'>
                  <div className='mb-3'>
                    <div className='flex mb-3'>
                      <h1 className='text-xl font-playfair font-bold'>
                        SHIPPING
                      </h1>
                      <XIcon
                        className='icon-6 ml-auto'
                        onClick={() => setShippingIsOpen(false)}
                      />
                    </div>
                    <p className='font-mont'>
                      If your order total is over 200€ the shipping will be for
                      our cost.
                    </p>
                  </div>
                  <div>
                    <h1 className='text-xl font-playfair font-bold'>RETURNS</h1>

                    <p className='font-mont'>
                      Our policy lasts 60 days. If 60 days have gone by since
                      your purchase, unfortunately we can’t offer you a refund
                      or exchange. To be eligible for a return, your item must
                      be unused and in the same condition that you received it.
                      It must also be in the original packaging.
                    </p>
                  </div>
                  <div>
                    <h1 className='text-xl font-playfair font-bold my-3'>
                      REFUNDS
                    </h1>
                    <p className='font-mont'>
                      Once your return is received and inspected, we will send
                      you an email to notify you that we have received your
                      returned item. We will also notify you of the approval or
                      rejection of your refund. If you are approved, then your
                      refund will be processed, and a credit will automatically
                      be applied to your credit card or original method of
                      payment, within 5 working days.
                    </p>
                  </div>
                  <div>
                    <h1 className='text-xl font-playfair font-bold my-3'>
                      LATE OR MISSING REFUNDS
                    </h1>
                    <p className='font-mont'>
                      If you were due a refund and you haven’t received the
                      money yet, first check your bank account again. Then
                      contact your credit card company, it may take some time
                      before your refund is officially posted. Next contact your
                      bank. There is often some processing time before a refund
                      is posted. If you’ve done all of this and you still have
                      not received your refund yet, please contact us at
                      care@stanley.com.
                    </p>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
          <div className='flex lg:flex-col lg:items-center xl:flex-row items-center'>
            <CreditCardIcon className='icon-6 mr-1 lg:mb-1 xl:mb-0' />
            <p className='text-xs font-bold text-center'>SECURE PAYMENTS</p>
          </div>
        </div>
        <div className='font-mont grid border-b cursor-pointer'>
          <div className='flex items-center mb-3 mt-4 lg:mt-0'>
            {!descriptionIsOpen ? (
              <PlusIcon className='h-4 w-4 mr-4' />
            ) : (
              <XIcon className='h-4 w-4 mr-4' />
            )}
            <button
              className='font-bold'
              onClick={() => setDescriptionIsOpen((prevState) => !prevState)}
            >
              DESCRIPTION
            </button>
          </div>
          <Collapse in={descriptionIsOpen}>
            <div className='mb-4 lg:mb-0 pl-2'>
              {item.composition?.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default CategoryItemPage;

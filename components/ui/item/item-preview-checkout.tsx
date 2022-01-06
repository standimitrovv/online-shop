import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

//Redux Slices
import { cartActions } from '../../../store/cartSlice';
import { wishlistActions } from '../../../store/wishlistSlice';

//Icons
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';

interface Props {
  item: {
    category: string;
    composition: string[];
    price: number;
    src: string[];
    name: string;
    id: string;
    quantity: number;
    size?: string | number;
    description?: string;
    sizes?: string[] | number[];
    sizeGuide?: string[] | string;
  };
  identifier: string;
  onPress: () => void;
}

const ItemPreviewCheckout: React.FC<Props> = ({
  item,
  identifier,
  onPress,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const section = item.src[0].split('/')[2];
  const path = `/${section}/${item.category}/${item.id}`;

  const priceOfItem = item.price * item.quantity;

  const increaseQuantity = () => {
    if (identifier === 'checkout') {
      setQuantity((prevState) => prevState + 1);
      dispatch(
        cartActions.increaseQuantity({
          itemName: item.name,
          itemSize: item.size,
        })
      );
    }
    if (identifier === 'wishlist') {
      setQuantity((prevState) => prevState + 1);
      dispatch(
        wishlistActions.increaseQuantity({
          itemName: item.name,
          itemSize: item.size,
        })
      );
    }
  };

  const decreaseQuantity = () => {
    if (identifier === 'checkout') {
      setQuantity((prevState) => prevState - 1);
      dispatch(
        cartActions.decreaseQuantity({
          itemName: item.name,
          itemSize: item.size,
        })
      );
    }
    if (identifier === 'wishlist') {
      setQuantity((prevState) => prevState - 1);
      dispatch(
        wishlistActions.decreaseQuantity({
          itemName: item.name,
          itemSize: item.size,
        })
      );
    }
  };

  const removeItemHandler = () => {
    if (identifier === 'checkout') {
      dispatch(cartActions.removeFromCart(item));
    }
    if (identifier === 'wishlist') {
      dispatch(wishlistActions.removeFromWishlist(item));
    }
  };

  const autoCloseMenuHandler = () => {
    onPress();
  };

  return (
    <div className='grid grid-cols-2 w-full py-2 font-mont border-b group hover:bg-gray-50 '>
      <Link href={path}>
        <a className='ml-7' onClick={autoCloseMenuHandler}>
          <Image
            src={item.src[0]}
            alt={item.description}
            height={180}
            width={150}
          />
        </a>
      </Link>
      <div
        className={`-ml-8 pr-8 ${
          identifier === 'wishlist' && 'flex flex-col justify-between'
        }`}
      >
        <div className='relative flex items-center'>
          <Link href={path}>
            <a
              className='font-bold mb-4 text-lg w-10/12'
              onClick={autoCloseMenuHandler}
            >
              {item.name}{' '}
            </a>
          </Link>
          <TrashIcon
            className='xl:hidden xl:group-hover:block icon-6 mb-4 ml-2'
            onClick={removeItemHandler}
          />
        </div>
        <div className='mt-3'>
          {identifier === 'checkout' && (
            <div className='flex mb-2'>
              <p className='font-bold text-gray-400 text-sm'>QUANTITY</p>

              <div className='ml-auto flex items-center'>
                {quantity === 1 && (
                  <MinusIcon className='h-4 w-4 cursor-pointer mr-1' />
                )}
                {quantity > 1 && (
                  <MinusIcon
                    className='h-4 w-4 cursor-pointer mr-1'
                    onClick={decreaseQuantity}
                  />
                )}
                <p className=' font-semibold'>{quantity}</p>
                <PlusIcon
                  className='h-4 w-4 cursor-pointer ml-1'
                  onClick={increaseQuantity}
                />
              </div>
            </div>
          )}
          {item.size && identifier === 'checkout' && (
            <div className='flex mb-2 mr-1'>
              <p className='font-bold text-gray-400 text-sm'>SIZE</p>
              <p className='ml-auto font-semibold'>{item.size}</p>
            </div>
          )}
          <div className='flex mb-2 mr-1 '>
            <p className='font-bold text-gray-400 text-sm'>PRICE</p>
            <p className='ml-auto font-semibold'>{priceOfItem}€</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPreviewCheckout;

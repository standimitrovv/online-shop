import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

//Redux Slices
import { wishlistActions } from '../../../store/wishlistSlice';
import { cartActions } from '../../../store/cartSlice';

//Icons
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline';

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
}

const WishlistItem: React.FC<Props> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [itemSize, setItemSize] = useState('default');

  const dispatch = useDispatch();
  const itemPrice = quantity * item.price;
  const itemPath = `/${item.src[0].split('/')[2]}/${item.category}/${item.id}`;
  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
    dispatch(
      wishlistActions.increaseQuantity({
        itemName: item.name,
        itemSize: item.size,
      })
    );
  };
  const decreaseQuantity = () => {
    setQuantity((prevState) => prevState - 1);
    dispatch(
      wishlistActions.decreaseQuantity({
        itemName: item.name,
        itemSize: item.size,
      })
    );
  };

  const removeFromWishlist = () => {
    dispatch(wishlistActions.removeFromWishlist(item));
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (item.sizes && itemSize !== 'default') {
      const newItem = {
        ...item,
        size: itemSize,
      };
      dispatch(cartActions.addToCart(newItem));
      dispatch(wishlistActions.removeFromWishlist(item));
    }
    if (!item.sizes && itemSize === 'default') {
      dispatch(cartActions.addToCart(item));
      dispatch(wishlistActions.removeFromWishlist(item));
    }
  };

  return (
    <li key={item.id} className='flex flex-col w-72 font-mont mb-8 '>
      <div className='flex'>
        <Image
          src={item.src[0]}
          height={400}
          width={350}
          alt={item.description}
        />
        <div className='relative flex items-end justify-end'>
          <TrashIcon
            className='w-7 h-7 cursor-pointer absolute mr-5 mb-5 border-2 rounded-full bg-white '
            onClick={removeFromWishlist}
          />
        </div>
      </div>
      <div
        className={!item.sizes ? 'flex flex-col h-[208px] justify-between' : ''}
      >
        <div>
          <Link href={itemPath}>
            <a className='font-bold text-lg mt-2'> {item.name}</a>
          </Link>
          <div className='flex mb-1 mt-3'>
            <p className='font-bold text-gray-400 text-sm'>QUANTITY</p>

            <div className='ml-auto flex items-center'>
              {item.quantity === 1 && (
                <MinusIcon className='h-4 w-4 cursor-pointer mr-1' />
              )}
              {item.quantity > 1 && (
                <MinusIcon
                  className='h-4 w-4 cursor-pointer mr-1'
                  onClick={decreaseQuantity}
                />
              )}
              <p className=' font-semibold'>{item.quantity}</p>
              <PlusIcon
                className='h-4 w-4 cursor-pointer ml-1'
                onClick={increaseQuantity}
              />
            </div>
          </div>
          <div className='flex mt-1'>
            <p className='text-gray-400 font-bold text-sm'>PRICE</p>
            <p className='ml-auto font-bold'>{itemPrice},00€</p>
          </div>
          <div>
            {item.sizes && (
              <select
                className='w-full py-3 px-2 border mt-2'
                required
                onChange={(e) => setItemSize(e.target.value)}
              >
                <option value='default'>Select size</option>
                {item.sizes?.map((size) => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <button
          className={
            item.sizes
              ? 'flex mt-3 bg-black text-white w-full py-3 px-2 justify-center'
              : 'flex bg-black text-white w-full py-3 px-2 justify-center'
          }
          type='button'
          onClick={submitFormHandler}
        >
          <ShoppingBagIcon className='icon-6 mr-3' />
          <p>Add to Cart</p>
        </button>
      </div>
    </li>
  );
};

export default WishlistItem;

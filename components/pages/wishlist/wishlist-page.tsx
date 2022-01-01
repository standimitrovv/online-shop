import React from 'react';
import { useSelector } from 'react-redux';

//Redux
import type { RootState } from '../../../store/store';

//Components
import WishlistItem from './wishlist-item';
import EmptyCart from '../empty-cart';

const WishlistPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className='md:px-24 2xl:px-36'>
      {items.length === 0 && <EmptyCart identifier='wishlist' />}
      {items.length >= 1 && (
        <div>
          <h1 className='text-center text-5xl font-bold font-playfair mt-8 mb-10'>
            Wishlist
          </h1>
          <div>
            <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-8 xl:gap-6 justify-items-center'>
              {items.map((item) => (
                <WishlistItem item={item} key={item.id} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

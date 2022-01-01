import React from 'react';
import Image from 'next/image';

interface Props {
  img: string;
  description?: string;
  name: string;
  size?: string | number;
  price: number;
  quantity: number;
}

const ItemCheckout: React.FC<Props> = ({
  img,
  description,
  name,
  size,
  price,
  quantity,
}) => {
  const itemTotal = price * quantity;
  return (
    <li className='grid grid-cols-4 mt-4 items-center justify-center'>
      <div>
        <Image
          src={img}
          alt={description}
          height={130}
          width={100}
          objectFit='contain'
        />
      </div>

      <div className='mt-2 flex flex-col col-span-2 justify-center ml-4 2xl:ml-8'>
        <div className='flex'>
          <p className='mb-3 text-base'>
            {name}{' '}
            {quantity > 1 && (
              <span className='text-sm font-light'>x {quantity}</span>
            )}
          </p>
        </div>
        <p className='font-light text-sm'>
          {!size ? '' : 'SIZE:'} {size}
        </p>
      </div>
      <div className='mt-2 flex items-center ml-auto text-sm'>{itemTotal}€</div>
    </li>
  );
};

export default ItemCheckout;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  shoeData: {
    name: string;
    price: number;
    src: string[];
    id: string;
    category: string;
    description?: string;
    sizes?: Number[] | string[];
    composition?: string[];
  };
}

const ItemShowcase: React.FC<Props> = ({ shoeData }) => {
  const router = useRouter();
  const path = router.pathname.slice(1);
  return (
    <div className='flex flex-col items-center mb-8 group'>
      <div>
        <Link
          href={
            path.includes('/')
              ? `/${path.split('/')[0]}/${shoeData.category}/${shoeData.id}`
              : `/${path}/${shoeData.category}/${shoeData.id}`
          }
        >
          <a className='relative inline-block'>
            <Image
              src={shoeData.src[0]}
              alt={shoeData.description}
              height={500}
              width={500}
              className='inline group-hover:hidden'
              objectFit='contain'
            />
            <div className='hidden absolute h-full w-full top-0 left-0 z-20 group-hover:inline object-contain'>
              <Image
                src={
                  shoeData.src.length >= 2 ? shoeData.src[1] : shoeData.src[0]
                }
                alt={shoeData.description}
                height={500}
                width={500}
                objectFit='contain'
              />
            </div>
          </a>
        </Link>
      </div>
      <div className='text-center mt-2'>
        <h1 className='font-playfair text-base'>{shoeData.name}</h1>
        <h1 className='text-lg xl:text-white text-gray-400 xl:group-hover:text-gray-400'>
          {shoeData.price},00€
        </h1>
      </div>
    </div>
  );
};

export default ItemShowcase;

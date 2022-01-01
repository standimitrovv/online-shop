import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  piece: {
    name: string;
    id: string;
    src: string;
    alt: string;
    href: string;
    order: number;
  };
}

const Item: React.FC<Props> = ({ piece }) => {
  return (
    <div className='relative group'>
      <Link href={piece.href}>
        <a className='flex items-center justify-center'>
          <p className='z-20 absolute text-white ring-2 ring-white py-4 px-8 text-4xl lg:text-3xl xl:text-4xl lg:hidden lg:group-hover:block '>
            {piece.name}
          </p>
          <div className='md:w-80 md:h-80 lg:w-full lg:h-full'>
            <Image
              src={piece.src}
              alt={piece.alt}
              height={450}
              width={400}
              className='z-10 filter group-hover:blur'
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Item;

import React from 'react';
import Link from 'next/link';

const PrivateTailor = () => {
  return (
    <Link href='/private-tailor'>
      <a className='cursor-pointer border-b-2 border-white hover:border-black font-fb font-medium'>
        PRIVATE TAILOR
      </a>
    </Link>
  );
};

export default PrivateTailor;

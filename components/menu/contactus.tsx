import Link from 'next/link';
import React from 'react';

const Contactus: React.FC = () => {
  return (
    <Link href='/contact'>
      <a className='cursor-pointer border-b-2 border-white hover:border-black font-fb font-medium'>
        CONTACT US
      </a>
    </Link>
  );
};

export default Contactus;

import React from 'react';
import Image from 'next/image';

//Image
import paypal from '../../public/images/icons/paypal.jpg';

const PaypalButton: React.FC = () => {
  return (
    <button className='bg-yellow-400 flex py-2 px-6 md:px-16 rounded-md text-xl items-center mr-4'>
      <Image src={paypal} alt='PayPal icon' width={25} height={25} />
      <p className='text-blue-800 font-extrabold'>Pay</p>
      <p className='text-blue-400 font-extrabold'>Pal</p>
    </button>
  );
};

export default PaypalButton;

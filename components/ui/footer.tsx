import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Components
import TermsAndConditions from '../pages/terms-conditions';
import PrivacyPolicy from '../pages/privacy-policy';

const Footer: React.FC = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <footer
      className={`bg-gray-50 ${
        path === '/checkout' && 'hidden'
      } px-2 md:px-4 lg:px-16 xl:px-32 2xl:px-48 py-16  `}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 justify-center justify-items-center text-center border-b border-black '>
        <div className='w-80 md:w-44 lg:w-64 xl:w-80'>
          <h1 className='border-b border-black py-2 font-medium text-sm'>
            CONTACTS
          </h1>
          <div className='my-8 font-nunito'>
            <p>Jeko Georgiev, n. 3</p>
            <p className='mb-6'>Sofia - Bulgaria</p>
            <p>T. +359 XX XXX XXXX</p>
            <p>info@stanley.com</p>
          </div>
        </div>
        <div className='font-logo text-5xl self-center mb-6'>
          <Link href='/'>STANLEY</Link>
        </div>
        <div className='w-80 md:w-44 lg:w-64 xl:w-80'>
          <h1 className='border-b border-black py-2 font-medium text-sm'>
            MENU
          </h1>
          <div className='flex flex-col my-6 font-nunito'>
            <Link href='/checkout'>
              <a className='py-2'>Checkout</a>
            </Link>
            <TermsAndConditions bold={false} />
            <PrivacyPolicy bold={false} />
          </div>
        </div>
      </div>
      <h1 className='text-center mt-8 font-nunito'>
        &copy; 2021 Stanley EOOD | All rights reserved - Design by Stanimir
        Dimitrov
      </h1>
    </footer>
  );
};

export default Footer;

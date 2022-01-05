import React from 'react';
import Link from 'next/link';

//Icon
import { ArrowRightIcon } from '@heroicons/react/outline';

interface Props {
  children: React.ReactNode;
  href?: string;
  ari: boolean;
  bg: string;
  onAutoCloseMenu?: () => void;
  onNavigateAway?: () => void;
}

const Button: React.FC<Props> = ({
  children,
  href,
  ari,
  bg = 'black',
  onAutoCloseMenu,
  onNavigateAway,
}) => {
  const handleButtonClick = () => {
    if (onAutoCloseMenu) onAutoCloseMenu();
    if (onNavigateAway) onNavigateAway();
  };

  return (
    <div
      className={` ${
        bg === 'black'
          ? 'lg:bg-gray-700 hover:bg-black text-white'
          : 'bg-white text-black border-2 '
      } bg-black mt-10 lg:w-96 w-64 rounded-sm cursor-pointer text-center py-4 lg:py-4 lg:px-8 group`}
      onClick={handleButtonClick}
    >
      {href && (
        <Link href={href}>
          <a className='flex justify-center items-center'>
            <button className='font-semibold'>{children}</button>
            {ari && (
              <ArrowRightIcon className='icon-6 ml-4 lg:ml-4 transform group-hover:translate-x-1' />
            )}
          </a>
        </Link>
      )}
      {!href && (
        <div className='flex justify-center items-center'>
          <button className='font-semibold' onClick={handleButtonClick}>
            {children}
          </button>
          {ari && (
            <ArrowRightIcon className='icon-6 ml-4 lg:ml-4 transform group-hover:translate-x-1' />
          )}
        </div>
      )}
    </div>
  );
};

export default Button;

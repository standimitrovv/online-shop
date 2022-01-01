import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className='px-12 text-center'>
      <p className='flex flex-col justify-center items-center my-16 text-xl font-nunito'>
        <span>404</span>
        <span className='font-bold text-2xl lg:text-3xl'>
          This Page Can NOT Be Found
        </span>
        <span>
          This is either a wrong categorie or we have not stocked it yet.
        </span>
        <span>Please try again.</span>
      </p>
    </div>
  );
};

export default NotFoundPage;

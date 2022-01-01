import React from 'react';
import Button from '../button';

const BookAnAppointment: React.FC = () => {
  return (
    <div className='mt-36 py-20 px-12 md:px-20 lg:px-32 xl:px-40  bg-gray-100 flex flex-col items-center justify-center'>
      <h1 className='text-center'>
        <p className='text-2xl mb-2 font-nunito'>
          You like our style, but you want something unique, something that you
          cannot find here?
        </p>
        <p className='text-xl font-bold font-fb'>WE GOT YOU COVERED!</p>
      </h1>
      <div className='border-b-2 px-10 '>&nbsp;</div>
      <Button href='/private-tailor' ari={true} bg='black'>
        BOOK AN APPOINTMENT
      </Button>
    </div>
  );
};

export default BookAnAppointment;

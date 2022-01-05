import React from 'react';
import Image from 'next/image';

//Image
import img from '../../public/images/home/heading-img.jpg';

//Components
import Item from '../ui/for-home/collection-item';
import BookAnAppointment from '../ui/for-home/book-appointment';
import Button from '../ui/button';

interface Props {
  items: {
    href: string;
    src: string;
    name: string;
    alt: string;
    id: string;
    order: number;
  }[];
}

const Home: React.FC<Props> = ({ items }) => {
  const sortedItems = items.sort((a, b) => a.order - b.order);

  return (
    <div className='relative bg-bgPrimary'>
      <div className='grid md:grid-cols-2 items-center justify-center'>
        <div className='w-full rounded-sm'>
          <Image src={img} alt='Heading image' />
        </div>
        <div className='text-black flex flex-col items-center  '>
          <p className='font-bold font-logo mb-1 lg:mb-2 lg:text-5xl text-4xl mt-12'>
            STANLEY
          </p>
          <p className='font-medium lg:text-3xl xl:text-4xl text-2xl font-fb'>
            Everything a gentleman needs!
          </p>

          <Button href='/apparel' ari={true} bg='black'>
            See more
          </Button>
        </div>
      </div>
      <div className='mt-36 md:px-36 lg:px-12 xl:px-24 2xl:px-64'>
        <h1 className='font-satisfy lg:text-4xl text-3xl text-center'>
          Our Collection Includes
        </h1>
        <div className='mt-16 grid px-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-y-8 md:gap-x-60 md:gap-y-24 lg:gap-x-12 lg:gap-y-10 '>
          {sortedItems &&
            sortedItems.map((item) => <Item key={item.id} piece={item} />)}
        </div>
      </div>
      <BookAnAppointment />
    </div>
  );
};

export default Home;

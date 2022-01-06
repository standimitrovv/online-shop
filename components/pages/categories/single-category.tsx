import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//Components
import ItemShowcase from '../../ui/item/item-showcase';
import Loading from '../../ui/loading';

interface Props {
  categoryData: {
    name: string;
    price: number;
    src: string[];
    id: string;
    category: string;
    description?: string;
    sizes?: Number[] | string[];
    composition?: string[];
  }[];
}

type sortData = {
  name: string;
  price: number;
  src: string[];
  id: string;
  category: string;
  description?: string;
  sizes?: Number[] | string[];
  composition?: string[];
};

interface sortingObject {
  [x: string]: string;
}

const SingleCategoryPage: React.FC<Props> = ({ categoryData }) => {
  const [sortedData, setSortedData] = useState<sortData[] | []>([]);
  const [sortType, setSortType] = useState<string>('price');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const path = router.asPath;
  const [category, individualCategory] = path
    .split('/')
    .filter((el) => el.length > 2);
  const formattedIndividualCategory = individualCategory.includes('%20')
    ? individualCategory.split('%20').join(' ').toUpperCase()
    : individualCategory.includes('-') && individualCategory.indexOf('-') > 3
    ? individualCategory.replace(/\-/g, ' ').toUpperCase()
    : individualCategory.toUpperCase();

  const individualCategoryPath = individualCategory.includes('%20')
    ? individualCategory.split('%20').join('-')
    : individualCategory;

  useEffect(() => {
    const sortByHandler = (type: keyof sortingObject) => {
      setIsLoading(true);
      const types: sortingObject = {
        priceLow: 'priceL',
        priceHigh: 'price',
        nameA: 'nameA',
        nameZ: 'name',
      };
      const sortProperty = types[type];
      const sorted: sortData[] =
        categoryData &&
        [...categoryData].sort((a, b) => {
          const x = a.name?.toLowerCase();
          const y = b.name?.toLowerCase();
          if (sortProperty === 'priceL') return a.price - b.price;
          if (sortProperty === 'price') return b.price - a.price;
          if (sortProperty === 'nameA') {
            return x < y ? -1 : 1;
          } else return x > y ? -1 : 1;
        });
      setSortedData(sorted);
      setIsLoading(false);
    };
    sortByHandler(sortType);
  }, [sortType, categoryData]);

  return (
    <div className='flex flex-col xl:flex-row justify-between'>
      <div className='flex flex-col'>
        <div className='text-md font-bold font-fb py-4 px-6 flex'>
          <button
            onClick={() => router.push(`/${category}`)}
            className='font-bold mr-2'
          >
            {category.toUpperCase()}
          </button>
          <p>/</p>
          <button
            onClick={() =>
              router.push(`/${category}/${individualCategoryPath}`)
            }
            className='font-bold ml-2'
          >
            {formattedIndividualCategory}
          </button>
        </div>
        <div className=' font-fb py-4 px-6 '>
          <h1 className='border-b border-black text-lg md:text-xl'>SORT BY</h1>
          <select
            className='py-2 px-2 mt-2'
            onChange={(e) => setSortType(e.target.value)}
          >
            <option>Select</option>
            <option value='priceLow'>Price - Low to High</option>
            <option value='priceHigh'>Price - High to Low</option>
            <option value='nameA'>Name - A - Z</option>
            <option value='nameZ'>Name - Z - A</option>
          </select>
        </div>
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className='grid grid-cols-1 px-4 py-4 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3'>
          {sortedData &&
            sortedData.map((item) => (
              <ItemShowcase key={item.id} shoeData={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SingleCategoryPage;

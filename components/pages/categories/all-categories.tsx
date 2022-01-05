import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Component
import ItemShowcase from '../../ui/item/item-showcase';

//MUI Components
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import Pagination from '@mui/material/Pagination';

//Icons
import { MinusIcon, ChevronDownIcon } from '@heroicons/react/outline';

interface Props {
  items: {
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

const AllCategoriesPage: React.FC<Props> = ({ items }) => {
  const router = useRouter();
  const route = router.route.replace('/', '');
  const sectionName = route.toUpperCase()[0] + route.slice(1);

  const [openCategorie, setOpenCategorie] = useState<boolean>(false);
  const [categorieIsOpened, setCategorieIsOpened] = useState<boolean>(true);

  const [sortedData, setSortedData] = useState<sortData[] | []>([]);
  const [sortType, setSortType] = useState<string>('price');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);

  const categories: string[] = [];

  items.map((item) => categories.push(item.category));
  const setOfCategories = [...new Set(categories)];

  const handleClick = (): void => {
    setOpenCategorie((prevState) => !prevState);
    setCategorieIsOpened((prevState) => !prevState);
  };

  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;

  useEffect(() => {
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const sortByHandler = (type: keyof sortingObject) => {
      const types: sortingObject = {
        priceLow: 'priceL',
        priceHigh: 'price',
        nameA: 'nameA',
        nameZ: 'name',
      };
      const sortProperty = types[type];
      const sorted: sortData[] =
        currentItems &&
        [...currentItems].sort((a, b) => {
          const x = a.name?.toLowerCase();
          const y = b.name?.toLowerCase();
          if (sortProperty === 'priceL') return a.price - b.price;
          if (sortProperty === 'price') return b.price - a.price;
          if (sortProperty === 'nameA') {
            return x < y ? -1 : 1;
          } else return x > y ? -1 : 1;
        });
      setSortedData(sorted);
    };
    sortByHandler(sortType);
  }, [sortType, indexOfFirstItem, indexOfLastItem, items]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className='text-3xl flex flex-col xl:flex-row justify-between '>
      <div className='text-xl font-fb py-4 px-6 xl:px-8 grid grid-cols-2 gap-x-6 xl:flex xl:flex-col'>
        <div>
          <h1 className='text-base md:text-xl border-b border-black'>
            SHOP BY CATEGORY
          </h1>
          <List>
            <ListItemButton onClick={handleClick}>
              <li className='mr-auto font-medium text-lg'>{sectionName}</li>
              {categorieIsOpened ? (
                <ChevronDownIcon className='icon-6' />
              ) : (
                <MinusIcon className='icon-6' />
              )}
            </ListItemButton>
            <Collapse in={openCategorie} timeout='auto' unmountOnExit>
              <ul className='ml-8 pl-4 border-l-2 text-lg border-gray-100'>
                {setOfCategories.map((category, index) => {
                  const formattedCategory = category.includes('-')
                    ? category
                        .split('-')
                        .map((el) => el[0].toUpperCase() + el.slice(1))
                        .join(' ')
                    : category
                        .split(' ')
                        .map((el) => el[0].toUpperCase() + el.slice(1))
                        .join(' ');

                  return (
                    <li key={category} className='py-4 cursor-pointer'>
                      <Link href={`/${route}/${category}`}>
                        {formattedCategory}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Collapse>
          </List>
        </div>
        <div className='xl:mt-4'>
          <h1 className='border-b border-black text-base'>SORT BY</h1>
          <select
            className='py-2 px-2 mt-2 xl:mt-4'
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
      <div className='flex flex-col'>
        <div className='grid grid-cols-1 px-4 py-4 md:grid-cols-2 md:gap-x-4 xl:grid-cols-3'>
          {sortedData &&
            sortedData.map((shoe) => (
              <ItemShowcase key={shoe.id} shoeData={shoe} />
            ))}
        </div>
        {items.length >= 10 && (
          <Pagination
            count={Math.ceil(items.length / postsPerPage)}
            sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default AllCategoriesPage;

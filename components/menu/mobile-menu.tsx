import React, { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';

// MUI
import Drawer from '@mui/material/Drawer';
import Box from '@mui/system/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';

//Data extracting function
import { getDataForMobileMenu } from '../../lib/firebaseData';

// Icons
import {
  MenuIcon,
  ChevronDownIcon,
  MinusIcon,
  XIcon,
} from '@heroicons/react/outline';

interface MobileData {
  name: string;
  id: string;
  order: number;
  categories?: string[];
}

interface State {
  [x: string]: boolean;
}

const MobileMenu: React.FC = () => {
  const [openCategorie, setOpenCategorie] = useState<State>({
    apparel: false,
    accessories: false,
    shoes: false,
  });
  const [categorieIsOpened, setCategorieIsOpened] = useState<State>({
    apparel: false,
    accessories: false,
    shoes: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<MobileData[] | []>([]);

  useEffect(() => {
    const getData = async () => {
      const categoriesData: MobileData[] = await getDataForMobileMenu();
      setData(categoriesData);
    };

    getData();
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsOpen(open);
    };

  const handleClick = (section: string): void => {
    setOpenCategorie((prevState) => ({
      ...openCategorie,
      [section]: !prevState[section],
    }));
    setCategorieIsOpened((prevState) => ({
      ...categorieIsOpened,
      [section]: !prevState[section],
    }));
  };

  return (
    <Fragment>
      <MenuIcon
        className='icon-6 mr-4 lg:hidden'
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
        className='lg:hidden'
      >
        <Box sx={{ width: 300 }} role='presentation'>
          <div className='flex border-b-2 p-4 justify-between items-center'>
            <Link href='/'>
              <a
                className='font-logo text-3xl'
                onClick={() => setIsOpen(false)}
              >
                {' '}
                Stanley
              </a>
            </Link>

            <XIcon
              className='icon-6'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            />
          </div>
          <List>
            {data &&
              data
                .sort((a, b) => a.order - b.order)
                .map((category, i) => (
                  <Fragment key={category.id}>
                    <ListItemButton
                      onClick={handleClick.bind(this, category.name)}
                    >
                      {category.categories && (
                        <li className='mr-auto font-medium text-lg'>
                          {category.name.toUpperCase()}
                        </li>
                      )}
                      {!category.categories && (
                        <Link href={`/${category.id}`}>
                          <a
                            className='mr-auto font-medium text-lg'
                            onClick={() => setIsOpen(false)}
                          >
                            {category.name.toUpperCase()}
                          </a>
                        </Link>
                      )}
                      {!category.categories ? (
                        ''
                      ) : categorieIsOpened[category.name] ? (
                        <MinusIcon className='icon-6' />
                      ) : (
                        <ChevronDownIcon className='icon-6' />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openCategorie[category.name]}
                      timeout='auto'
                      unmountOnExit
                    >
                      <ul className='ml-8 pl-4 border-l-2 border-gray-100'>
                        {category.categories?.map((piece, index) => (
                          <Link
                            href={
                              index === 0
                                ? `/${[category.name]}`
                                : `/${[category.name]}/${piece.toLowerCase()}`
                            }
                            key={index}
                          >
                            <a>
                              <li
                                className='py-4 cursor-pointer'
                                onClick={() => setIsOpen(false)}
                              >
                                {piece}
                              </li>
                            </a>
                          </Link>
                        ))}
                      </ul>
                    </Collapse>
                  </Fragment>
                ))}
          </List>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default MobileMenu;

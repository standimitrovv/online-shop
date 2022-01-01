import React, { useState, useEffect } from 'react';
import Link from 'next/link';

//Firebase hooks
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

//MUI Components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

//Icon
import { MinusIcon, ChevronDownIcon } from '@heroicons/react/outline';

const Apparel: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [apparel, setApparel] = useState<[] | string[]>([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'navigation/apparel');
      const docSnapshot = await getDoc(docRef);
      const { items } = docSnapshot.data()!;
      setApparel(items);
    };
    getData();
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className='flex space-x-2' onClick={handleClick}>
        <button className='border-b-2 border-white hover:border-black'>
          <p className='font-fb font-medium'>APPAREL</p>
        </button>

        {anchorEl ? (
          <MinusIcon className='icon-6' />
        ) : (
          <ChevronDownIcon className='icon-6' />
        )}
      </div>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        className='mt-4 w-2/3'
      >
        <Link href='/apparel'>
          <a>
            <MenuItem onClick={handleClose} disableRipple>
              View All
            </MenuItem>
          </a>
        </Link>
        <Divider />
        {apparel &&
          apparel.map((piece, i) => (
            <Link key={i} href={`/apparel/${piece.toLowerCase()}`}>
              <a>
                <MenuItem onClick={handleClose} key={i} disableRipple>
                  {piece}
                </MenuItem>
              </a>
            </Link>
          ))}
      </Menu>
    </div>
  );
};

export default Apparel;

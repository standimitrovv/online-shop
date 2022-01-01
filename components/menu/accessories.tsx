import React, { useState, useEffect } from 'react';
import Link from 'next/link';

//Firebase hoooks
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

//MUI Components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

// Icons
import { MinusIcon, ChevronDownIcon } from '@heroicons/react/outline';

const Accessories: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accessories, setAccessories] = useState<[] | string[]>([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'navigation/accessories');
      const docSnapshot = await getDoc(docRef);
      const { items } = docSnapshot.data()!;
      setAccessories(items);
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
        <button className='border-b-2 border-white  hover:border-black'>
          <p className='font-fb font-medium'>ACCESSORIES</p>
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
        <Link href='/accessories'>
          <a>
            <MenuItem onClick={handleClose} disableRipple>
              View All
            </MenuItem>
          </a>
        </Link>
        <Divider />
        {accessories &&
          accessories.map((piece, i) => (
            <Link
              href={`/accessories/${
                piece.length > 7
                  ? piece.split(' ').join('-').toLowerCase()
                  : piece.toLowerCase()
              }`}
              key={i}
            >
              <a>
                <MenuItem onClick={handleClose} disableRipple>
                  {piece}
                </MenuItem>
              </a>
            </Link>
          ))}
      </Menu>
    </div>
  );
};

export default Accessories;

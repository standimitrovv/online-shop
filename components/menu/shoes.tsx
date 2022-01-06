import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// MUI Components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

//Icons
import { MinusIcon, ChevronDownIcon } from '@heroicons/react/outline';

//Firebase hooks
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';

const Shoes: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [shoes, setShoes] = useState<[] | string[]>([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'navigation/shoes');
      const data = await getDoc(docRef);
      const { items } = data.data()!;
      if (!items) return;
      else setShoes(items);
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
          <p className='font-fb font-medium'>SHOES</p>
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
        <Link href='/shoes'>
          <a>
            <MenuItem onClick={handleClose} disableRipple>
              View All
            </MenuItem>
          </a>
        </Link>
        <Divider />
        {shoes &&
          shoes.map((piece, i) => {
            const formattedPiece = piece.includes(' ')
              ? piece.toLowerCase().split(' ').join('-')
              : piece.toLowerCase();
            return (
              <Link key={i} href={`/shoes/${formattedPiece}`}>
                <a>
                  <MenuItem onClick={handleClose} key={i} disableRipple>
                    {piece}
                  </MenuItem>
                </a>
              </Link>
            );
          })}
      </Menu>
    </div>
  );
};

export default Shoes;

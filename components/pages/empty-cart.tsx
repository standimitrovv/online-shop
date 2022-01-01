import React from 'react';
import Button from '../ui/button';

interface Props {
  onAutoCloseMenu?: () => void;
  identifier: string;
}

const EmptyCart: React.FC<Props> = ({ onAutoCloseMenu, identifier }) => {
  return (
    <div className='text-center font-playfair mt-8  font-bold mb-10 flex flex-col items-center'>
      <h1 className='text-3xl'>Your {identifier} is empty.</h1>
      <Button
        href='/apparel/blazers'
        ari={true}
        bg='white'
        onAutoCloseMenu={() => onAutoCloseMenu && onAutoCloseMenu()}
      >
        SHOP BLAZERS
      </Button>
      <Button
        href='/apparel/coats'
        ari={true}
        bg='white'
        onAutoCloseMenu={() => onAutoCloseMenu && onAutoCloseMenu()}
      >
        SHOP COATS
      </Button>
      <Button
        href='/apparel/trousers'
        ari={true}
        bg='white'
        onAutoCloseMenu={() => onAutoCloseMenu && onAutoCloseMenu()}
      >
        SHOP TROUSERS
      </Button>
      <Button
        href='/shoes'
        ari={true}
        bg='white'
        onAutoCloseMenu={() => onAutoCloseMenu && onAutoCloseMenu()}
      >
        SHOP SHOES
      </Button>
      <Button
        href='/accessories'
        ari={true}
        bg='white'
        onAutoCloseMenu={() => onAutoCloseMenu && onAutoCloseMenu()}
      >
        SHOP ACCESSORIES
      </Button>
    </div>
  );
};

export default EmptyCart;

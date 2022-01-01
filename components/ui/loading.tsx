import React from 'react';

//MUI Components
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7rem',
        marginBottom: '7rem',
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loading;

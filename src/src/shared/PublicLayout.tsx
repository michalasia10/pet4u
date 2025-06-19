import { Box } from '@mui/material';
import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) =>
          `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
      }}
    >
      {children}
    </Box>
  );
}; 
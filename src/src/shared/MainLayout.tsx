import React from 'react';
import { Box } from '@mui/material';
import { Header } from './components/Header';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        margin: 0,
        padding: 0,
        width: '100%',
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1, margin: 0, padding: 0, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}; 
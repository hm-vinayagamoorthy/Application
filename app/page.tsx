import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import FileUpload from '../app/components/FileUpload';

export default function Page() {
  return (
   <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #fdfbfb, #ebedee)', // subtle festive gradient
        paddingY: 8,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // warm festive colors
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
          🎅 Secret Santa Game 🎄
        </Typography>
        <Typography variant="subtitle1">
          Upload your employee and previous year files to get started
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <FileUpload />
      </Box>
    </Container>
  );
}
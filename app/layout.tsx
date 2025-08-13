import React from 'react';
import { CssBaseline, Box } from '@mui/material';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body style={{ margin: 0, padding: 0 }}>
        {/* Reset and global styles */}
        <CssBaseline />

        {/* Background wrapper */}
        <Box
          sx={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // festive gradient
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {/* Main content */}
          {children}

          {/* Optional footer */}
          <Box
            component="footer"
            sx={{
              mt: 6,
              py: 2,
              textAlign: 'center',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.875rem',
            }}
          >
            &copy; {new Date().getFullYear()} Secret Santa Game. All rights reserved.
          </Box>
        </Box>
      </body>
    </html>
  );
}

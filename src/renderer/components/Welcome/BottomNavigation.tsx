import { Box, Typography } from '@mui/joy';
import React from 'react';

const BottomNavigation: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)',
        borderTop: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 100,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 -2px 15px rgba(0,0,0,0.3)'
            : '0 -2px 15px rgba(0,0,0,0.1)',
      }}
    >
      {/* Left side */}
      <Typography
        level="body-xs"
        sx={{
          color: 'text.secondary',
          fontSize: '11px', // Reduced from 12px
          fontWeight: 500,
        }}
      >
        Polaris AI Studio
      </Typography>

      {/* Center - Social Links */}
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <Typography
          component="a"
          href="https://twitter.com/polaris"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.primary',
            fontSize: '12px', // Reduced from 13px
            fontWeight: 500,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              color: 'primary.500',
            },
          }}
        >
          𝕏 Twitter
        </Typography>
        <Typography
          component="a"
          href="https://discord.gg/polaris"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.primary',
            fontSize: '12px', // Reduced from 13px
            fontWeight: 500,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': {
              color: 'primary.500',
            },
          }}
        >
          🎮 Discord
        </Typography>
      </Box>

      {/* Right side - Copyright only */}
      <Typography
        level="body-xs"
        sx={{
          color: 'text.tertiary',
          fontSize: '10px', // Reduced from 11px
        }}
      >
        © 2025 PolarisLLM Inc. • All rights reserved
      </Typography>
    </Box>
  );
};

export default BottomNavigation;

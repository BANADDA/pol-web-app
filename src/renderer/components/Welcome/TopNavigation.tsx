import { Box, Typography } from '@mui/joy';
import { Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ColorSchemeToggle from '../Nav/ColorSchemeToggle';

interface TopNavigationProps {
  themeSetter?: (theme: string) => void;
}

function TopNavigation({ themeSetter = () => {} }: TopNavigationProps) {
  const navigate = useNavigate();

  const handlePolarisClick = () => {
    navigate('/welcome');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
          transition: 'opacity 0.2s ease',
        }}
        onClick={handlePolarisClick}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            backgroundColor: '#7c4dff',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
            border: '1px solid #000',
          }}
        >
          P
        </Box>
        <Typography
          level="body-sm"
          sx={{ fontWeight: 600, color: 'text.primary', fontSize: '12px' }}
        >
          Polaris AI Studio
        </Typography>
      </Box>

      {/* Right side - Links and Theme Toggle */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography
          component="a"
          href="https://www.polariscloud.ai/#Home"
          target="_blank"
          rel="noopener noreferrer"
          level="body-xs"
          sx={{
            color: 'text.secondary',
            cursor: 'pointer',
            fontSize: '11px',
            textDecoration: 'none',
            '&:hover': { color: 'primary.500' },
          }}
        >
          Cloud Platform
        </Typography>
        <Box
          component="a"
          href="https://github.com/transformerlab/transformerlab-app"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.secondary',
            cursor: 'pointer',
            fontSize: '11px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&:hover': { color: 'primary.500' },
          }}
        >
          <Github size={12} />
          <Typography level="body-xs" sx={{ fontSize: '11px' }}>
            Documentation
          </Typography>
        </Box>

        {/* Small Theme Toggle */}
        <Box
          sx={{
            '& button': {
              width: '28px',
              height: '28px',
              minHeight: '28px',
              '& svg': {
                width: '16px',
                height: '16px',
              },
            },
          }}
        >
          <ColorSchemeToggle themeSetter={themeSetter} />
        </Box>
      </Box>
    </Box>
  );
}

export default TopNavigation;

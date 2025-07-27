import { Box, Button, IconButton, Sheet } from '@mui/joy';
import { HardDrive, Maximize2, Minimize2 } from 'lucide-react';
import React, { useState } from 'react';
import HardwareTab from './tabs/HardwareTab';
import RuntimesTab from './tabs/RuntimesTab';

interface SystemInfoProps {
  darkMode: boolean;
}

const SystemInfo: React.FC<SystemInfoProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<string>('hardware');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top Navigation Bar */}
      <Sheet
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 0.75,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.8)'
              : 'rgba(248, 250, 252, 0.8)',
          minHeight: '36px',
          flexShrink: 0,
        }}
      >
        {/* Left side - Hardware and Runtime tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button
            variant={activeTab === 'hardware' ? 'soft' : 'plain'}
            color={activeTab === 'hardware' ? 'primary' : 'neutral'}
            size="sm"
            onClick={() => setActiveTab('hardware')}
            startDecorator={<HardDrive size={12} />}
            sx={{
              fontSize: '10px',
              fontWeight: activeTab === 'hardware' ? 600 : 500,
              px: 1.5,
              py: 0.5,
              minHeight: '26px',
            }}
          >
            Hardware
          </Button>

          <Button
            variant={activeTab === 'runtimes' ? 'soft' : 'plain'}
            color={activeTab === 'runtimes' ? 'primary' : 'neutral'}
            size="sm"
            onClick={() => setActiveTab('runtimes')}
            startDecorator={
              <Box
                component="svg"
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 2v6.5" />
                <path d="M19.07 4.93l-4.6 4.6" />
                <path d="M22 12h-6.5" />
                <path d="M19.07 19.07l-4.6-4.6" />
                <path d="M12 22v-6.5" />
                <path d="M4.93 19.07l4.6-4.6" />
                <path d="M2 12h6.5" />
                <path d="M4.93 4.93l4.6 4.6" />
                <circle cx="12" cy="12" r="3" />
              </Box>
            }
            sx={{
              fontSize: '10px',
              fontWeight: activeTab === 'runtimes' ? 600 : 500,
              px: 1.5,
              py: 0.5,
              minHeight: '26px',
            }}
          >
            Runtime
          </Button>
        </Box>

        {/* Right side - Window controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            size="sm"
            variant="plain"
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{
              color: 'text.tertiary',
              '&:hover': { color: 'text.secondary' },
              width: '24px',
              height: '24px',
              minWidth: '24px',
              minHeight: '24px',
            }}
          >
            {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </IconButton>
        </Box>
      </Sheet>

      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          height: 'calc(100% - 36px)', // Account for header height
          minHeight: 0, // Allow flex shrinking
        }}
      >
        {/* Tab Content with proper scrolling */}
        <Box
          sx={{
            height: '100%',
            overflow: activeTab === 'runtimes' ? 'hidden' : 'auto', // Runtime tab manages its own overflow
            ...(activeTab === 'hardware' && {
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.3)'
                    : 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.5)'
                    : 'rgba(0,0,0,0.5)',
              },
            }),
          }}
        >
          {activeTab === 'hardware' && <HardwareTab darkMode={darkMode} />}
          {activeTab === 'runtimes' && <RuntimesTab />}
        </Box>
      </Box>
    </Box>
  );
};

export default SystemInfo;

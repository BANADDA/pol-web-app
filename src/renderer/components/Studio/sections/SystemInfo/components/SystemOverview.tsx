import { Box, Card, CardContent, Chip, Typography } from '@mui/joy';
import { Monitor } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';

interface SystemOverviewProps {
  specs: SystemSpecs;
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ specs }) => {
  const { os, cpu, gpu, memory } = specs;

  // Get OS icon based on OS name
  const getOSIcon = (osName: string): string => {
    if (osName.includes('Windows')) return '🪟';
    if (osName.includes('macOS')) return '🍎';
    if (osName.includes('Linux')) return '🐧';
    if (osName.includes('Android')) return '🤖';
    if (osName.includes('iOS') || osName.includes('iPadOS')) return '📱';
    return '💻';
  };

  // Get system type color
  const getSystemTypeColor = (systemType?: string) => {
    if (systemType === 'GPU-Focused') return 'success';
    if (systemType === 'CPU-Focused') return 'primary';
    return 'neutral';
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Monitor size={18} color="#2563eb" />
          <Typography
            level="title-sm"
            sx={{ fontWeight: 700, fontSize: '14px' }}
          >
            System Overview
          </Typography>
        </Box>

        <Box
          sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}
        >
          {/* Operating System */}
          <Box>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', color: 'text.tertiary', mb: 0.5 }}
            >
              OPERATING SYSTEM
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
            >
              <Typography sx={{ fontSize: '18px' }}>
                {getOSIcon(os.name)}
              </Typography>
              <Box>
                <Typography
                  level="title-sm"
                  sx={{ fontSize: '13px', fontWeight: 600 }}
                >
                  {os.name}
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '11px', color: 'text.secondary' }}
                >
                  {os.version}
                </Typography>
              </Box>
            </Box>
            <Chip
              size="sm"
              variant="soft"
              sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
            >
              {os.architecture}
            </Chip>
          </Box>

          {/* System Classification */}
          <Box>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', color: 'text.tertiary', mb: 0.5 }}
            >
              SYSTEM TYPE
            </Typography>
            <Box sx={{ mb: 0.5 }}>
              <Chip
                size="sm"
                variant="soft"
                color={getSystemTypeColor(gpu.systemType)}
                sx={{ fontSize: '11px', px: 1, py: 0.5, mb: 0.5 }}
              >
                🖥️ {gpu.systemType || 'Balanced'} System
              </Chip>
            </Box>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', color: 'text.secondary' }}
            >
              {cpu.performanceTier}
            </Typography>
          </Box>

          {/* Key Specs */}
          <Box>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', color: 'text.tertiary', mb: 0.5 }}
            >
              KEY SPECIFICATIONS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              <Typography level="body-xs" sx={{ fontSize: '11px' }}>
                🧠 {cpu.cores} cores •{' '}
                {(memory.total / (1024 * 1024 * 1024)).toFixed(0)} GB RAM
              </Typography>
              <Typography level="body-xs" sx={{ fontSize: '11px' }}>
                🎮 {gpu.vendor} •{' '}
                {(gpu.memory / (1024 * 1024 * 1024)).toFixed(1)} GB VRAM
              </Typography>
              <Typography
                level="body-xs"
                sx={{ fontSize: '11px', color: 'text.secondary' }}
              >
                📊 {specs.display.resolution} display
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Real System Data Indicator */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mt: 1.5,
            pt: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'success.500',
              animation: 'pulse 2s infinite',
            }}
          />
          <Typography
            level="body-xs"
            sx={{ fontSize: '10px', color: 'text.secondary' }}
          >
            ✅ Real System Data Detected • {os.name} {os.version} • {cpu.brand}{' '}
            CPU • {gpu.vendor} GPU
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SystemOverview;

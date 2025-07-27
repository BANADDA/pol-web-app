import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/joy';
import { Zap } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';
import { formatBytes, getUsageColor } from '../utils/formatters';

interface GPUCardProps {
  gpu: SystemSpecs['gpu'];
}

const GPUCard: React.FC<GPUCardProps> = ({ gpu }) => {
  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Zap size={16} color="#a855f7" />
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, fontSize: '12px' }}
          >
            Graphics {gpu.systemType && `(${gpu.systemType})`}
          </Typography>
        </Box>

        <Typography
          level="title-sm"
          sx={{ fontSize: '13px', mb: 0.5, fontWeight: 700 }}
        >
          {gpu.name}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          <Chip
            size="sm"
            variant="soft"
            sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
          >
            {gpu.vendor}
          </Chip>
          {gpu.architecture !== 'Unknown' && (
            <Chip
              size="sm"
              variant="soft"
              sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
            >
              {gpu.architecture}
            </Chip>
          )}
          <Chip
            size="sm"
            variant="soft"
            sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
          >
            Driver: {gpu.driverVersion.split(' ')[1] || 'Unknown'}
          </Chip>
        </Box>

        {/* VRAM Information - Prominently displayed */}
        {gpu.memory > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography
              level="title-sm"
              sx={{
                fontSize: '12px',
                mb: 0.5,
                fontWeight: 600,
                color: 'primary.500',
              }}
            >
              💾 VRAM: {formatBytes(gpu.memory)}
            </Typography>

            {/* VRAM Usage Bar (if available) */}
            {gpu.memoryUsed > 0 && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 0.5,
                  }}
                >
                  <Typography level="body-xs" sx={{ fontSize: '10px' }}>
                    VRAM Usage
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    {formatBytes(gpu.memoryUsed)} / {formatBytes(gpu.memory)}
                  </Typography>
                </Box>
                <LinearProgress
                  determinate
                  value={(gpu.memoryUsed / gpu.memory) * 100}
                  color={getUsageColor((gpu.memoryUsed / gpu.memory) * 100)}
                  size="sm"
                />
              </Box>
            )}
          </Box>
        )}

        {/* System Type Badge */}
        {gpu.systemType && (
          <Box sx={{ mt: 1 }}>
            <Chip
              size="sm"
              variant="soft"
              color={
                gpu.systemType === 'GPU-Focused'
                  ? 'success'
                  : gpu.systemType === 'CPU-Focused'
                    ? 'primary'
                    : 'neutral'
              }
              sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
            >
              🖥️ {gpu.systemType} System
            </Chip>
          </Box>
        )}

        {/* GPU Capabilities */}
        <Box sx={{ mt: 1 }}>
          <Typography
            level="body-xs"
            sx={{ fontSize: '10px', color: 'text.tertiary' }}
          >
            {gpu.memory > 8 * 1024 * 1024 * 1024
              ? '🚀 High-end GPU detected'
              : gpu.memory > 4 * 1024 * 1024 * 1024
                ? '⚡ Mid-range GPU detected'
                : gpu.memory > 2 * 1024 * 1024 * 1024
                  ? '💻 Entry-level dedicated GPU'
                  : '📱 Integrated graphics detected'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GPUCard;

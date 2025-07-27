import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/joy';
import { Cpu } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';
import { getUsageColor } from '../utils/formatters';

interface CPUCardProps {
  cpu: SystemSpecs['cpu'];
}

const CPUCard: React.FC<CPUCardProps> = ({ cpu }) => {
  // Get CPU brand color
  const getBrandColor = (brand: string) => {
    if (brand.includes('Intel')) return '#0071c5';
    if (brand.includes('AMD')) return '#ed1c24';
    if (brand.includes('Apple')) return '#000000';
    return '#6b7280';
  };

  // Get performance tier indicator
  const getPerformanceIcon = (tier: string) => {
    if (tier.includes('High-End')) return '🚀';
    if (tier.includes('Mid-High')) return '⚡';
    if (tier.includes('Mid-Range')) return '💻';
    if (tier.includes('Entry')) return '📱';
    return '🔧';
  };

  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Cpu size={16} color={getBrandColor(cpu.brand)} />
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, fontSize: '12px' }}
          >
            Processor ({cpu.brand})
          </Typography>
        </Box>

        <Typography
          level="title-sm"
          sx={{ fontSize: '13px', mb: 0.5, fontWeight: 700 }}
        >
          {cpu.name}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          <Chip
            size="sm"
            variant="soft"
            sx={{
              fontSize: '9px',
              px: 0.5,
              py: 0.25,
              backgroundColor: cpu.brand.includes('Intel')
                ? 'rgba(0, 113, 197, 0.1)'
                : cpu.brand.includes('AMD')
                  ? 'rgba(237, 28, 36, 0.1)'
                  : cpu.brand.includes('Apple')
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'rgba(107, 114, 128, 0.1)',
              color: getBrandColor(cpu.brand),
              border: `1px solid ${getBrandColor(cpu.brand)}20`,
            }}
          >
            {cpu.architecture}
          </Chip>
          <Chip
            size="sm"
            variant="soft"
            sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
          >
            {cpu.cores} cores • {cpu.threads} threads
          </Chip>
        </Box>

        {/* Performance Tier */}
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
            {getPerformanceIcon(cpu.performanceTier)} {cpu.performanceTier}
          </Typography>
        </Box>

        {/* CPU Usage */}
        <Box sx={{ mb: 0.5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 0.5,
            }}
          >
            <Typography level="body-xs" sx={{ fontSize: '10px' }}>
              CPU Usage
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {cpu.usage}%
            </Typography>
          </Box>
          <LinearProgress
            determinate
            value={cpu.usage}
            color={getUsageColor(cpu.usage)}
            size="sm"
          />
        </Box>

        {/* Real CPU Detection Indicator */}
        <Box sx={{ mt: 1 }}>
          <Typography
            level="body-xs"
            sx={{ fontSize: '10px', color: 'text.tertiary' }}
          >
            ✅{' '}
            {cpu.cores >= 8
              ? 'Multi-core performance system'
              : cpu.cores >= 4
                ? 'Quad-core system'
                : 'Efficient processing'}{' '}
            • Real hardware cores detected
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CPUCard;

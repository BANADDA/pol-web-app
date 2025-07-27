import { Box, Card, CardContent, Chip, Typography } from '@mui/joy';
import { Cpu, Zap } from 'lucide-react';
import React from 'react';

import type { Runtime } from '../../types/runtime';

interface RuntimeCardProps {
  runtime: Runtime;
  isSelected: boolean;
  onRuntimeSelect: (runtimeId: string) => void;
}

const RuntimeCard: React.FC<RuntimeCardProps> = ({
  runtime,
  isSelected,
  onRuntimeSelect,
}) => {
  const getCompatibilityColor = (compatibility: Runtime['compatibility']) => {
    switch (compatibility) {
      case 'Compatible':
        return 'success';
      case 'Incompatible':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'High':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getEngineIcon = (engine: string) => {
    if (engine.includes('PolarisLLM')) {
      return '⚡';
    }
    switch (engine.toLowerCase()) {
      case 'llama.cpp':
        return '🦙';
      case 'onnxruntime':
        return '⚡';
      case 'openvino':
        return '🚀';
      case 'tensorrt':
        return '🏎️';
      default:
        return '⚡';
    }
  };

  // Determine primary hardware requirement
  const getHardwareType = () => {
    if (runtime.gpuHardware) {
      return {
        icon: <Zap size={14} />,
        type: 'GPU',
        detail: runtime.gpuHardware,
      };
    }
    if (runtime.cpuSoftware) {
      return {
        icon: <Cpu size={14} />,
        type: 'CPU',
        detail: runtime.cpuSoftware,
      };
    }
    return null;
  };

  const hardware = getHardwareType();

  return (
    <Card
      variant="outlined"
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minHeight: '140px', // Much smaller height
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        ...(isSelected && {
          borderColor: 'primary.500',
          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(59, 130, 246, 0.08)'
              : 'rgba(59, 130, 246, 0.04)',
        }),
        '&:hover': {
          borderColor: 'primary.300',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
        },
      }}
      onClick={() => onRuntimeSelect(runtime.id)}
    >
      <CardContent
        sx={{
          p: 1, // Reduced padding significantly
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 0.8, // Tight spacing between sections
        }}
      >
        {/* Compact Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography sx={{ fontSize: '18px', flexShrink: 0 }}>
              {getEngineIcon(runtime.engine)}
            </Typography>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                level="title-sm"
                sx={{
                  fontSize: '15px',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {runtime.name}
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  fontSize: '12px',
                  color: 'text.secondary',
                  lineHeight: 1,
                }}
              >
                v{runtime.version}
              </Typography>
            </Box>
          </Box>
          <Chip
            size="sm"
            color={getCompatibilityColor(runtime.compatibility)}
            sx={{ fontSize: '10px', px: 0.6, py: 0.3, flexShrink: 0 }}
          >
            {runtime.compatibility}
          </Chip>
        </Box>

        {/* Compact Info Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0.6,
            alignItems: 'center',
          }}
        >
          {/* Performance */}
          <Box>
            <Typography
              level="body-xs"
              sx={{ fontSize: '11px', color: 'text.tertiary', lineHeight: 1 }}
            >
              Performance
            </Typography>
            <Chip
              size="sm"
              color={getPerformanceColor(runtime.performance)}
              sx={{ fontSize: '10px', px: 0.5, py: 0.2, mt: 0.2 }}
            >
              {runtime.performance}
            </Chip>
          </Box>

          {/* Formats */}
          <Box>
            <Typography
              level="body-xs"
              sx={{ fontSize: '11px', color: 'text.tertiary', lineHeight: 1 }}
            >
              Formats
            </Typography>
            <Typography
              level="body-xs"
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                mt: 0.2,
              }}
            >
              {runtime.modelFormats.join(', ')}
            </Typography>
          </Box>
        </Box>

        {/* Hardware Requirement - Compact */}
        {hardware && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
              mt: 'auto',
              pt: 0.5,
            }}
          >
            <Box sx={{ color: 'text.secondary' }}>{hardware.icon}</Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                level="body-xs"
                sx={{ fontSize: '11px', color: 'text.tertiary', lineHeight: 1 }}
              >
                {hardware.type} Required
              </Typography>
              <Typography
                level="body-xs"
                sx={{
                  fontSize: '12px',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.1,
                }}
              >
                {hardware.detail}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Compact Status Indicator */}
        {runtime.status === 'Installed' && (
          <Box
            sx={{
              mt: 0.5,
              p: 0.5,
              borderRadius: 'xs',
              backgroundColor: 'success.50',
              border: '1px solid',
              borderColor: 'success.200',
            }}
          >
            <Typography
              level="body-xs"
              sx={{
                fontSize: '10px',
                color: 'success.700',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              ✓ Selected
            </Typography>
          </Box>
        )}

        {/* Available Status for PolarisLLM */}
        {runtime.id === 'polarisllm' && runtime.status !== 'Installed' && (
          <Box
            sx={{
              mt: 0.5,
              p: 0.5,
              borderRadius: 'xs',
              backgroundColor: 'primary.50',
              border: '1px solid',
              borderColor: 'primary.200',
            }}
          >
            <Typography
              level="body-xs"
              sx={{
                fontSize: '10px',
                color: 'primary.700',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              🚀 Available Now
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RuntimeCard;

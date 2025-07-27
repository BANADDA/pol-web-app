import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Sheet,
  Typography,
} from '@mui/joy';
import { Cpu, Database, Download, HardDrive, Monitor, Zap } from 'lucide-react';
import React from 'react';

import type { Runtime } from '../../types/runtime';

interface RuntimeDetailsProps {
  runtime: Runtime | null;
  onInstall?: (runtimeId: string) => void;
}

const RuntimeDetails: React.FC<RuntimeDetailsProps> = ({
  runtime,
  onInstall,
}) => {
  if (!runtime) {
    return (
      <Sheet
        sx={{
          width: 300,
          flexShrink: 0,
          borderLeft: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(17, 24, 39, 0.4)'
              : 'rgba(248, 250, 252, 0.4)',
        }}
      >
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <Typography sx={{ fontSize: '32px', mb: 1 }}>🔧</Typography>
          <Typography
            level="body-sm"
            sx={{ fontSize: '11px', color: 'text.tertiary' }}
          >
            Select a runtime to view details
          </Typography>
        </Box>
      </Sheet>
    );
  }

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

  const getStatusColor = (status: Runtime['status']) => {
    switch (status) {
      case 'Installed':
        return 'success';
      case 'Updating':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <Sheet
      sx={{
        width: 320,
        flexShrink: 0,
        borderLeft: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(17, 24, 39, 0.4)'
            : 'rgba(248, 250, 252, 0.4)',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography sx={{ fontSize: '18px' }}>⚡</Typography>
          <Typography
            level="title-sm"
            sx={{ fontSize: '13px', fontWeight: 700 }}
          >
            {runtime.displayName}
          </Typography>
        </Box>
        <Typography
          level="body-xs"
          sx={{ fontSize: '10px', color: 'text.secondary', mb: 1 }}
        >
          {runtime.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            size="sm"
            color={getCompatibilityColor(runtime.compatibility)}
            sx={{ fontSize: '8px' }}
          >
            {runtime.compatibility}
          </Chip>
          <Chip
            size="sm"
            color={getStatusColor(runtime.status)}
            sx={{ fontSize: '8px' }}
          >
            {runtime.status}
          </Chip>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        {/* Basic Information */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent sx={{ p: 1.5 }}>
            <Typography
              level="title-sm"
              sx={{ fontSize: '11px', fontWeight: 600, mb: 1 }}
            >
              Runtime Information
            </Typography>
            <Grid container spacing={1}>
              <Grid xs={6}>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '9px', color: 'text.tertiary' }}
                >
                  Engine
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', fontWeight: 600 }}
                >
                  {runtime.engine}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '9px', color: 'text.tertiary' }}
                >
                  Version
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', fontWeight: 600 }}
                >
                  {runtime.version}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '9px', color: 'text.tertiary' }}
                >
                  Model Formats
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', fontWeight: 600 }}
                >
                  {runtime.modelFormats.join(', ')}
                </Typography>
              </Grid>
              {runtime.size && (
                <Grid xs={6}>
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '9px', color: 'text.tertiary' }}
                  >
                    Size
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    {runtime.size}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Hardware Requirements */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent sx={{ p: 1.5 }}>
            <Typography
              level="title-sm"
              sx={{ fontSize: '11px', fontWeight: 600, mb: 1 }}
            >
              Requirements
            </Typography>

            {/* Operating Systems */}
            <Box sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <Monitor size={10} />
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '9px', color: 'text.tertiary' }}
                >
                  Operating Systems
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {runtime.requirements.os.map((os) => (
                  <Chip
                    key={os}
                    size="sm"
                    variant="soft"
                    sx={{ fontSize: '8px', px: 0.5, py: 0.25 }}
                  >
                    {os}
                  </Chip>
                ))}
              </Box>
            </Box>

            {/* GPU Requirements */}
            {runtime.requirements.gpu && (
              <Box sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <Zap size={10} />
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '9px', color: 'text.tertiary' }}
                  >
                    GPU Requirements
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {runtime.requirements.gpu.map((gpu) => (
                    <Chip
                      key={gpu}
                      size="sm"
                      variant="soft"
                      sx={{ fontSize: '8px', px: 0.5, py: 0.25 }}
                    >
                      {gpu}
                    </Chip>
                  ))}
                </Box>
              </Box>
            )}

            {/* Memory & Storage */}
            <Grid container spacing={1}>
              {runtime.requirements.memory && (
                <Grid xs={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <Database size={10} />
                    <Typography
                      level="body-xs"
                      sx={{ fontSize: '9px', color: 'text.tertiary' }}
                    >
                      Memory
                    </Typography>
                  </Box>
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    {runtime.requirements.memory}
                  </Typography>
                </Grid>
              )}
              {runtime.requirements.storage && (
                <Grid xs={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      mb: 0.5,
                    }}
                  >
                    <HardDrive size={10} />
                    <Typography
                      level="body-xs"
                      sx={{ fontSize: '9px', color: 'text.tertiary' }}
                    >
                      Storage
                    </Typography>
                  </Box>
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    {runtime.requirements.storage}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>

        {/* Hardware Acceleration */}
        {(runtime.gpuHardware || runtime.cpuSoftware) && (
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography
                level="title-sm"
                sx={{ fontSize: '11px', fontWeight: 600, mb: 1 }}
              >
                Hardware Acceleration
              </Typography>
              {runtime.gpuHardware && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <Zap size={12} color="#f59e0b" />
                  <Box>
                    <Typography
                      level="body-xs"
                      sx={{ fontSize: '9px', color: 'text.tertiary' }}
                    >
                      GPU Hardware
                    </Typography>
                    <Typography
                      level="body-xs"
                      sx={{ fontSize: '10px', fontWeight: 600 }}
                    >
                      {runtime.gpuHardware}
                    </Typography>
                  </Box>
                </Box>
              )}
              {runtime.cpuSoftware && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Cpu size={12} color="#3b82f6" />
                  <Box>
                    <Typography
                      level="body-xs"
                      sx={{ fontSize: '9px', color: 'text.tertiary' }}
                    >
                      CPU Software
                    </Typography>
                    <Typography
                      level="body-xs"
                      sx={{ fontSize: '10px', fontWeight: 600 }}
                    >
                      {runtime.cpuSoftware}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent sx={{ p: 1.5 }}>
            <Typography
              level="title-sm"
              sx={{ fontSize: '11px', fontWeight: 600, mb: 1 }}
            >
              Features
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {runtime.features.map((feature) => (
                <Chip
                  key={feature}
                  size="sm"
                  variant="soft"
                  color="primary"
                  sx={{ fontSize: '8px', px: 0.5, py: 0.25 }}
                >
                  {feature}
                </Chip>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Action Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        {runtime.id === 'polarisllm' ? (
          // PolarisLLM is available - show deploy button
          <Button
            size="sm"
            color="primary"
            startDecorator={<Download size={14} />}
            onClick={() => onInstall?.(runtime.id)}
            sx={{
              fontSize: '11px',
              fontWeight: 600,
              width: '100%',
              minHeight: '36px',
              background:
                'linear-gradient(90deg, rgba(59, 130, 246, 1), rgba(37, 99, 235, 1))',
              '&:hover': {
                background:
                  'linear-gradient(90deg, rgba(37, 99, 235, 1), rgba(29, 78, 216, 1))',
              },
            }}
          >
            Deploy PolarisLLM Platform (~15GB)
          </Button>
        ) : (
          // Other runtimes are coming soon
          <Button
            size="sm"
            color="neutral"
            disabled // Always disabled since functionality is coming soon
            startDecorator={<Download size={14} />}
            onClick={() => onInstall?.(runtime.id)}
            sx={{
              fontSize: '11px',
              fontWeight: 600,
              width: '100%',
              minHeight: '36px',
              opacity: 0.5, // Muted appearance
              cursor: 'not-allowed',
            }}
          >
            Coming Soon - Install Runtime
          </Button>
        )}
      </Box>
    </Sheet>
  );
};

export default RuntimeDetails;

import { Box, Button, Card, Chip, Grid, Typography } from '@mui/joy';
import { Cpu, Play, Zap } from 'lucide-react';
import React from 'react';

// Import organized components and data
import { mockRuntimes } from '../data/runtimeData';
import type { RuntimesTabProps } from '../types/runtime';

const RuntimesTab: React.FC<RuntimesTabProps> = () => {
  const polarisRuntime = mockRuntimes[0]; // Get PolarisLLM runtime

  const handleInstallRuntime = () => {
    console.log('Installing PolarisLLM Platform...');
    // Here you would typically trigger the runtime installation
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2, flexShrink: 0 }}>
        <Typography
          level="title-lg"
          sx={{ fontSize: '20px', fontWeight: 700, mb: 1 }}
        >
          ⚡ PolarisLLM Deployment Platform
        </Typography>
        <Typography
          level="body-sm"
          sx={{ fontSize: '14px', color: 'text.secondary' }}
        >
          The comprehensive deployment platform powered by MS-Swift framework
          for Large Language Models.
        </Typography>
      </Box>

      {/* Main Content - Scrollable */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 3 }}>
        <Card
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 'xl',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(67, 56, 202, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(124, 77, 255, 0.05) 100%)',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(147, 51, 234, 0.3)'
                : 'rgba(99, 102, 241, 0.2)',
          }}
        >
          {/* Runtime Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: '24px' }}>⚡</Typography>
              <Box>
                <Typography
                  level="title-md"
                  sx={{ fontSize: '16px', fontWeight: 700 }}
                >
                  {polarisRuntime.displayName}
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '11px', color: 'text.secondary' }}
                >
                  Version {polarisRuntime.version} • {polarisRuntime.engine}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip size="sm" color="success" sx={{ fontSize: '10px' }}>
                {polarisRuntime.compatibility}
              </Chip>
              <Chip size="sm" color="primary" sx={{ fontSize: '10px' }}>
                {polarisRuntime.status}
              </Chip>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            level="body-sm"
            sx={{
              fontSize: '13px',
              color: 'text.secondary',
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            {polarisRuntime.description}
          </Typography>

          {/* Specifications Grid */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Performance & Hardware */}
            <Grid xs={12} md={6}>
              <Card variant="soft" sx={{ p: 2, height: '100%' }}>
                <Typography
                  level="title-sm"
                  sx={{ fontSize: '12px', fontWeight: 600, mb: 1.5 }}
                >
                  Hardware Requirements
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Zap size={14} />
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: '11px', fontWeight: 500 }}
                  >
                    Performance:{' '}
                    <Chip
                      size="sm"
                      color="success"
                      sx={{ fontSize: '9px', ml: 0.5 }}
                    >
                      {polarisRuntime.performance}
                    </Chip>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Cpu size={14} />
                  <Typography level="body-xs" sx={{ fontSize: '11px' }}>
                    GPU: {polarisRuntime.gpuHardware}
                  </Typography>
                </Box>
                <Typography level="body-xs" sx={{ fontSize: '11px' }}>
                  CPU: {polarisRuntime.cpuSoftware}
                </Typography>
              </Card>
            </Grid>

            {/* Formats & Requirements */}
            <Grid xs={12} md={6}>
              <Card variant="soft" sx={{ p: 2, height: '100%' }}>
                <Typography
                  level="title-sm"
                  sx={{ fontSize: '12px', fontWeight: 600, mb: 1.5 }}
                >
                  Specifications
                </Typography>
                <Typography level="body-xs" sx={{ fontSize: '11px', mb: 1 }}>
                  <strong>Model Formats:</strong>{' '}
                  {polarisRuntime.modelFormats.join(', ')}
                </Typography>
                <Typography level="body-xs" sx={{ fontSize: '11px', mb: 1 }}>
                  <strong>Memory:</strong> {polarisRuntime.requirements.memory}
                </Typography>
                <Typography level="body-xs" sx={{ fontSize: '11px' }}>
                  <strong>Storage:</strong>{' '}
                  {polarisRuntime.requirements.storage}
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Features */}
          <Box sx={{ mb: 3 }}>
            <Typography
              level="title-sm"
              sx={{ fontSize: '12px', fontWeight: 600, mb: 1.5 }}
            >
              Key Features
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {polarisRuntime.features.map((feature) => (
                <Chip
                  key={feature}
                  size="sm"
                  variant="soft"
                  color="primary"
                  sx={{ fontSize: '9px', fontWeight: 500 }}
                >
                  {feature}
                </Chip>
              ))}
            </Box>
          </Box>

          {/* System Requirements */}
          <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography
              level="title-sm"
              sx={{ fontSize: '12px', fontWeight: 600, mb: 1.5 }}
            >
              System Requirements
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12} sm={4}>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '11px', fontWeight: 600, mb: 0.5 }}
                >
                  Operating System:
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', color: 'text.secondary' }}
                >
                  {polarisRuntime.requirements.os.join(', ')}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4}>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '11px', fontWeight: 600, mb: 0.5 }}
                >
                  GPU Support:
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', color: 'text.secondary' }}
                >
                  {polarisRuntime.requirements.gpu?.slice(0, 2).join(', ')}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4}>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '11px', fontWeight: 600, mb: 0.5 }}
                >
                  Download Size:
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', color: 'text.secondary' }}
                >
                  {polarisRuntime.size}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Card>
      </Box>

      {/* Fixed Bottom Install Section */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bg: 'background.surface',
          p: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          flexShrink: 0,
        }}
      >
        <Button
          size="lg"
          color="primary"
          onClick={handleInstallRuntime}
          startDecorator={<Play size={18} />}
          sx={{
            py: 1.5,
            px: 3,
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: 'lg',
            minWidth: '250px',
          }}
        >
          🚀 Install PolarisLLM Platform (~15GB)
        </Button>
      </Box>
    </Box>
  );
};

export default RuntimesTab;

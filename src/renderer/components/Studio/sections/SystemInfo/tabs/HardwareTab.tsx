import { Box, Grid, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';

// Organized imports
import {
  CPUCard,
  DisplayCard,
  GPUCard,
  MemoryCard,
  ResourceMonitorCard,
  StorageCard,
  SystemOverview,
} from '../components';
import { getSystemInfo } from '../services/systemService';
import type { HardwareTabProps, SystemSpecs } from '../types/system';

const HardwareTab: React.FC<HardwareTabProps> = () => {
  const [specs, setSpecs] = useState<SystemSpecs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const systemSpecs = await getSystemInfo();
        setSpecs(systemSpecs);
      } catch (error) {
        console.error('Failed to fetch system specs:', error);
        // Keep null to show error state
      } finally {
        setLoading(false);
      }
    };

    fetchSpecs();

    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(fetchSpecs, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <Typography level="body-sm" sx={{ fontSize: '12px' }}>
          🔍 Analyzing your system hardware...
        </Typography>
      </Box>
    );
  }

  if (!specs) {
    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <Typography level="body-sm" color="danger" sx={{ fontSize: '12px' }}>
          ❌ Failed to detect system hardware. Check browser permissions and try
          refreshing.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, overflow: 'auto' }}>
      {/* System Overview - Prominently displays OS and system type */}
      <SystemOverview specs={specs} />

      {/* Real-time indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, px: 1 }}>
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
          sx={{ fontSize: '11px', color: 'text.secondary' }}
        >
          🔄 Live Hardware Data • Updates every 5 seconds
        </Typography>
      </Box>

      <Grid container spacing={1.5}>
        {/* CPU Section */}
        <Grid xs={12} md={6}>
          <CPUCard cpu={specs.cpu} />
        </Grid>

        {/* Memory Section */}
        <Grid xs={12} md={6}>
          <MemoryCard memory={specs.memory} />
        </Grid>

        {/* GPU Section */}
        <Grid xs={12} md={6}>
          <GPUCard gpu={specs.gpu} />
        </Grid>

        {/* Storage Section */}
        <Grid xs={12} md={6}>
          <StorageCard storage={specs.storage} />
        </Grid>

        {/* Display Section */}
        <Grid xs={12} md={6}>
          <DisplayCard display={specs.display} />
        </Grid>

        {/* Resource Monitor Section */}
        <Grid xs={12} md={6}>
          <ResourceMonitorCard resources={specs.resourceMonitor} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HardwareTab;

import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/joy';
import { Activity } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';

interface ResourceMonitorCardProps {
  resources: SystemSpecs['resourceMonitor'];
}

const ResourceMonitorCard: React.FC<ResourceMonitorCardProps> = ({
  resources,
}) => {
  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Activity size={14} color="#f59e0b" />
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, fontSize: '11px' }}
          >
            System Resources
          </Typography>
        </Box>

        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid xs={6}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Processes
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {resources.processes || 'N/A'}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Uptime
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {resources.uptime}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid xs={6}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Network (Up)
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {resources.networkUp}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Network (Type)
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {resources.networkDown}
            </Typography>
          </Grid>
        </Grid>

        {/* Real Network Detection Indicator */}
        <Box sx={{ mt: 1 }}>
          <Chip
            size="sm"
            variant="soft"
            sx={{ fontSize: '8px', px: 0.5, py: 0.25 }}
          >
            ✅ Network info from Navigator API
          </Chip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResourceMonitorCard;

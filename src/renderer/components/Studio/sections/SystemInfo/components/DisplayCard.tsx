import { Box, Card, CardContent, Grid, Typography } from '@mui/joy';
import { Monitor } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';

interface DisplayCardProps {
  display: SystemSpecs['display'];
}

const DisplayCard: React.FC<DisplayCardProps> = ({ display }) => {
  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Monitor size={14} color="#ec4899" />
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, fontSize: '11px' }}
          >
            Display
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid xs={4}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Resolution
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {display.resolution}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Color Depth
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {display.colorDepth}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography
              level="body-xs"
              sx={{ fontSize: '9px', color: 'text.tertiary' }}
            >
              Refresh Rate
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {display.refreshRate}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DisplayCard;

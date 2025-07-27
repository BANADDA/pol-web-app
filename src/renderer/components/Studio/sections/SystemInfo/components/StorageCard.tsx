import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/joy';
import { HardDrive } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';
import { formatBytes, getUsageColor } from '../utils/formatters';

interface StorageCardProps {
  storage: SystemSpecs['storage'];
}

const StorageCard: React.FC<StorageCardProps> = ({ storage }) => {
  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <HardDrive size={16} color="#8b5cf6" />
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, fontSize: '12px' }}
          >
            Storage Drives
          </Typography>
        </Box>

        {storage.drives.map((drive, index) => (
          <Box
            key={`${drive.name}-${index}`}
            sx={{ mb: index < storage.drives.length - 1 ? 2 : 0 }}
          >
            <Typography
              level="title-sm"
              sx={{ fontSize: '13px', mb: 0.5, fontWeight: 700 }}
            >
              {drive.name}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              <Chip
                size="sm"
                variant="soft"
                sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
              >
                {drive.type}
              </Chip>
              <Chip
                size="sm"
                variant="soft"
                sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
              >
                {formatBytes(drive.total)} Total
              </Chip>
              <Chip
                size="sm"
                variant="soft"
                color={getUsageColor(drive.usage)}
                sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
              >
                {drive.usage}% Used
              </Chip>
            </Box>

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
                  Available Space
                </Typography>
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '10px', fontWeight: 600 }}
                >
                  {formatBytes(drive.available)} free
                </Typography>
              </Box>
              <LinearProgress
                determinate
                value={drive.usage}
                color={getUsageColor(drive.usage)}
                size="sm"
              />
            </Box>
          </Box>
        ))}

        {/* Real Storage Detection Indicator */}
        <Box
          sx={{
            mt: 1,
            pt: 1,
            borderTop: storage.drives.length > 1 ? '1px solid' : 'none',
            borderColor: 'divider',
          }}
        >
          <Typography
            level="body-xs"
            sx={{ fontSize: '10px', color: 'text.tertiary' }}
          >
            ✅ {storage.drives.length} drive
            {storage.drives.length > 1 ? 's' : ''} detected • Web Storage API
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StorageCard;

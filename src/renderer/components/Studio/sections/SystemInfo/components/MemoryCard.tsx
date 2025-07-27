import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from '@mui/joy';
import { Database } from 'lucide-react';
import React from 'react';
import type { SystemSpecs } from '../types/system';
import { formatBytes, getUsageColor } from '../utils/formatters';

interface MemoryCardProps {
  memory: SystemSpecs['memory'];
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  return (
    <Card variant="outlined" sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Database size={16} color="#10b981" />
          <Typography
            level="body-sm"
            sx={{ fontWeight: 600, fontSize: '12px' }}
          >
            Memory (RAM)
          </Typography>
        </Box>

        <Typography
          level="title-sm"
          sx={{ fontSize: '13px', mb: 0.5, fontWeight: 700 }}
        >
          {formatBytes(memory.total)} Total
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          <Chip
            size="sm"
            variant="soft"
            sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
          >
            Available: {formatBytes(memory.available)}
          </Chip>
          <Chip
            size="sm"
            variant="soft"
            color={getUsageColor(memory.usage)}
            sx={{ fontSize: '9px', px: 0.5, py: 0.25 }}
          >
            {memory.usage}% Used
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
              Memory Usage
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '10px', fontWeight: 600 }}
            >
              {formatBytes(memory.total - memory.available)} /{' '}
              {formatBytes(memory.total)}
            </Typography>
          </Box>
          <LinearProgress
            determinate
            value={memory.usage}
            color={getUsageColor(memory.usage)}
            size="sm"
          />
        </Box>

        {/* Real Memory Detection Indicator */}
        <Box sx={{ mt: 1 }}>
          <Typography
            level="body-xs"
            sx={{ fontSize: '10px', color: 'text.tertiary' }}
          >
            ✅ {(memory.total / (1024 * 1024 * 1024)).toFixed(0)} GB RAM
            detected • Navigator deviceMemory API
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemoryCard;

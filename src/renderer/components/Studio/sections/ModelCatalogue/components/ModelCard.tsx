import { Box, Card, CardContent, Chip, Typography } from '@mui/joy';
import { Download, Heart } from 'lucide-react';
import React from 'react';
import type { ModelCardProps } from '../types/model';

const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isSelected,
  onClick,
}) => {
  return (
    <Card
      variant="outlined"
      onClick={() => onClick(model)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        mb: 0.5,
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: 'sm',
          borderColor: 'primary.300',
          backgroundColor: 'rgba(99, 102, 241, 0.04)',
        },
        ...(isSelected && {
          borderColor: 'primary.500',
          borderWidth: 2,
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.1)',
        }),
        ...(model.comingSoon && {
          opacity: 0.7,
          '&::after': {
            content: '"Coming Soon"',
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'warning.500',
            color: 'white',
            fontSize: '8px',
            fontWeight: 600,
            px: 0.5,
            py: 0.125,
            borderRadius: 'xs',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
          },
        }),
        ...(model.deployed && {
          '&::before': {
            content: '"Deployed"',
            position: 'absolute',
            top: 4,
            left: 4,
            backgroundColor: 'success.500',
            color: 'white',
            fontSize: '8px',
            fontWeight: 600,
            px: 0.5,
            py: 0.125,
            borderRadius: 'xs',
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            zIndex: 2,
          },
        }),
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: 1 }}>
        {/* Model Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.75 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              level="title-sm"
              sx={{
                fontWeight: 600,
                mb: 0.125,
                lineHeight: 1.1,
                fontSize: '13px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {model.name}
            </Typography>
            <Typography
              level="body-xs"
              sx={{
                color: 'text.secondary',
                mb: 0.75,
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              {model.author}
            </Typography>
          </Box>

          {model.featured && (
            <Chip
              size="sm"
              color="primary"
              variant="soft"
              sx={{
                fontSize: '8px',
                fontWeight: 600,
                px: 0.5,
                py: 0.125,
                ml: 0.75,
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                minHeight: 'auto',
              }}
            >
              Featured
            </Chip>
          )}
        </Box>

        {/* Stats */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 0.75,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <Heart size={10} />
              <Typography
                level="body-xs"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '10px',
                }}
              >
                {model.stats.likes}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <Download size={10} />
              <Typography
                level="body-xs"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '10px',
                }}
              >
                {model.stats.downloads}
              </Typography>
            </Box>
          </Box>

          <Typography
            level="body-xs"
            sx={{ color: 'text.secondary', fontSize: '10px' }}
          >
            {model.stats.size}
          </Typography>
        </Box>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
          {model.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              size="sm"
              variant="soft"
              sx={{
                fontSize: '9px',
                fontWeight: 500,
                px: 0.75,
                py: 0.25,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'primary.700',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: 'md',
                minHeight: 'auto',
                transition: 'all 0.1s ease',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                },
              }}
            >
              {tag}
            </Chip>
          ))}
          {model.tags.length > 3 && (
            <Typography
              level="body-xs"
              sx={{
                color: 'text.secondary',
                alignSelf: 'center',
                fontSize: '9px',
              }}
            >
              +{model.tags.length - 3} more
            </Typography>
          )}
        </Box>

        {/* Category and Updated */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 0.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Chip
            size="sm"
            variant="soft"
            color={
              model.category === 'instruct'
                ? 'primary'
                : model.category === 'code'
                  ? 'success'
                  : model.category === 'embedding'
                    ? 'warning'
                    : model.category === 'multimodal'
                      ? 'danger'
                      : 'neutral'
            }
            sx={{
              fontSize: '8px',
              fontWeight: 600,
              px: 0.5,
              py: 0.125,
              textTransform: 'capitalize',
              minHeight: 'auto',
            }}
          >
            {model.category}
          </Chip>

          <Typography
            level="body-xs"
            sx={{ color: 'text.tertiary', fontSize: '9px' }}
          >
            {model.stats.lastUpdated}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModelCard;

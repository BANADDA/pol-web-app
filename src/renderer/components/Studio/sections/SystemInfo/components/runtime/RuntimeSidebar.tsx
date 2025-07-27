import { Box, Button, Chip, Sheet, Typography } from '@mui/joy';
import React from 'react';
import type { RuntimeCategory } from '../../types/runtime';

interface RuntimeSidebarProps {
  categories: RuntimeCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  showCompatibleOnly: boolean;
}

const RuntimeSidebar: React.FC<RuntimeSidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  showCompatibleOnly,
}) => {
  return (
    <Sheet
      sx={{
        width: 200,
        flexShrink: 0,
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(17, 24, 39, 0.8)'
            : 'rgba(248, 250, 252, 0.8)',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography
          level="title-sm"
          sx={{ fontSize: '12px', fontWeight: 600, mb: 1 }}
        >
          Runtime Categories
        </Typography>
        {showCompatibleOnly && (
          <Chip size="sm" color="success" sx={{ fontSize: '8px' }}>
            Compatible Only
          </Chip>
        )}
      </Box>

      {/* Category List */}
      <Box sx={{ flex: 1, p: 1 }}>
        {categories.map((category) => {
          const compatibleCount = category.runtimes.filter(
            (r) => r.compatibility === 'Compatible',
          ).length;
          const displayCount = showCompatibleOnly
            ? compatibleCount
            : category.runtimes.length;

          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'soft' : 'plain'}
              color={selectedCategory === category.id ? 'primary' : 'neutral'}
              size="sm"
              onClick={() => onCategorySelect(category.id)}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                mb: 0.5,
                p: 1,
                fontSize: '11px',
                fontWeight: selectedCategory === category.id ? 600 : 500,
                minHeight: '44px', // Increased from 32px to accommodate two lines
                ...(selectedCategory === category.id && {
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))'
                      : 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
                  borderLeft: '2px solid',
                  borderLeftColor: 'primary.500',
                }),
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  width: '100%',
                  pt: 0.2, // Small padding to center the content better
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography sx={{ fontSize: '14px', flexShrink: 0 }}>
                    {category.icon}
                  </Typography>
                  <Box
                    sx={{
                      minWidth: 0,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: '11px', lineHeight: 1.2, mt: 0.2 }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '8px',
                        color: 'warning.500', // Orange color
                        lineHeight: 1,
                        opacity: 0.9,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        mb: 0.2,
                      }}
                    >
                      Coming Soon
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  size="sm"
                  variant="soft"
                  sx={{
                    fontSize: '8px',
                    minHeight: '16px',
                    px: 0.5,
                    opacity: 0.8,
                    flexShrink: 0,
                  }}
                >
                  {displayCount}
                </Chip>
              </Box>
            </Button>
          );
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography
          level="body-xs"
          sx={{ fontSize: '9px', color: 'text.tertiary', textAlign: 'center' }}
        >
          Select a runtime category
        </Typography>
      </Box>
    </Sheet>
  );
};

export default RuntimeSidebar;

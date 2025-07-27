import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Sheet,
  Typography,
} from '@mui/joy';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';
import { navigationSections } from '../../config/navigation';
import { NavigationSection } from '../../types';

interface SidebarProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (expanded: boolean) => void;
  activeSidebarItem: string;
  onSectionClick: (section: NavigationSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
  activeSidebarItem,
  onSectionClick,
}) => {
  // Group sections by their group property
  const groupedSections = navigationSections.reduce(
    (groups, section) => {
      const { group } = section;
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(section);
      return groups;
    },
    {} as Record<string, NavigationSection[]>,
  );

  const groupOrder = ['models', 'tools', 'development', 'system'];

  return (
    <Sheet
      sx={{
        width: isSidebarExpanded ? 176 : 64,
        flexShrink: 0,
        borderRight: '2px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        position: 'relative',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(17, 24, 39, 0.8)'
            : 'rgba(248, 250, 252, 0.8)',
      }}
    >
      <Box
        sx={{
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          flex: 1,
        }}
      >
        {groupOrder.map((groupKey, groupIndex) => {
          const sections = groupedSections[groupKey] || [];
          if (sections.length === 0) return null;

          return (
            <React.Fragment key={groupKey}>
              {/* Group Divider */}
              {groupIndex > 0 && (
                <Divider
                  sx={{
                    my: 1,
                    opacity: 0.3,
                  }}
                />
              )}

              {/* Group Label (only when expanded) */}
              {isSidebarExpanded && (
                <Typography
                  level="body-xs"
                  sx={{
                    px: 1,
                    py: 0.5,
                    color: 'text.tertiary',
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {groupKey === 'models' && 'Model Management'}
                  {groupKey === 'tools' && 'AI Tools'}
                  {groupKey === 'development' && 'Development'}
                  {groupKey === 'system' && 'System'}
                </Typography>
              )}

              {/* Group Items */}
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={
                    activeSidebarItem === section.id && !section.comingSoon
                      ? 'soft'
                      : 'plain'
                  }
                  color={
                    activeSidebarItem === section.id && !section.comingSoon
                      ? 'primary'
                      : 'neutral'
                  }
                  size="sm"
                  onClick={() => onSectionClick(section)}
                  sx={{
                    width: '100%',
                    justifyContent: isSidebarExpanded
                      ? 'space-between'
                      : 'center',
                    p: 1,
                    fontSize: '12px',
                    fontWeight: 500,
                    ...(activeSidebarItem === section.id &&
                      !section.comingSoon && {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))'
                            : 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
                        borderLeft: '2px solid',
                        borderLeftColor: 'primary.500',
                      }),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <section.icon size={16} />
                    {isSidebarExpanded && <span>{section.label}</span>}
                  </Box>
                  {isSidebarExpanded && section.comingSoon && (
                    <Chip
                      size="sm"
                      sx={{
                        fontSize: '8px',
                        px: 1,
                        py: 0.25,
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(147, 51, 234, 0.2)'
                            : 'rgba(147, 51, 234, 0.1)',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#c4b5fd' : '#7c3aed',
                      }}
                    >
                      Soon
                    </Chip>
                  )}
                </Button>
              ))}
            </React.Fragment>
          );
        })}
      </Box>

      {/* Toggle sidebar button - small floating style */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          right: -10,
          zIndex: 1000,
        }}
      >
        <IconButton
          size="sm"
          variant="outlined"
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          sx={{
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
            borderRadius: '50%',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(15, 23, 42, 0.98)'
                : 'rgba(255, 255, 255, 0.98)',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.1)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 1)'
                  : 'rgba(255, 255, 255, 1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isSidebarExpanded ? (
            <ChevronsLeft size={12} />
          ) : (
            <ChevronsRight size={12} />
          )}
        </IconButton>
      </Box>
    </Sheet>
  );
};

export default Sidebar;

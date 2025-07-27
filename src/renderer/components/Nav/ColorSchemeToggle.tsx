import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Sheet,
  Typography,
} from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { Check, Contrast, Monitor, Moon, Palette, Sun } from 'lucide-react';
import React, { useState } from 'react';

interface ColorSchemeToggleProps {
  themeSetter: (theme: string) => void;
}

type ThemeOption = {
  id:
    | 'system'
    | 'light'
    | 'dark'
    | 'light-high-contrast'
    | 'dark-high-contrast'
    | 'sepia';
  label: string;
  icon: React.ComponentType<any>;
  description: string;
};

const themeOptions: ThemeOption[] = [
  {
    id: 'system',
    label: 'Auto',
    icon: Monitor,
    description: 'Match system',
  },
  {
    id: 'light',
    label: 'Light',
    icon: Sun,
    description: 'Light theme',
  },
  {
    id: 'dark',
    label: 'Dark',
    icon: Moon,
    description: 'Dark theme',
  },
  {
    id: 'light-high-contrast',
    label: 'Light High Contrast',
    icon: Contrast,
    description: 'High contrast light',
  },
  {
    id: 'dark-high-contrast',
    label: 'Dark High Contrast',
    icon: Contrast,
    description: 'High contrast dark',
  },
  {
    id: 'sepia',
    label: 'Sepia',
    icon: Palette,
    description: 'Warm sepia',
  },
];

function ColorSchemeToggle({ themeSetter }: ColorSchemeToggleProps) {
  const { setMode } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('system');

  const getCurrentIcon = () => {
    const option = themeOptions.find((opt) => opt.id === selectedTheme);
    return option ? option.icon : Monitor;
  };

  const handleThemeSelect = (themeId: ThemeOption['id']) => {
    setSelectedTheme(themeId);
    setIsOpen(false);

    if (themeId === 'system') {
      // Detect system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
      themeSetter('system');
    } else if (themeId === 'sepia') {
      setMode('light'); // Use light mode as base for sepia
      themeSetter('sepia'); // Apply sepia theme
    } else if (themeId === 'light-high-contrast') {
      setMode('light');
      themeSetter('light-high-contrast');
    } else if (themeId === 'dark-high-contrast') {
      setMode('dark');
      themeSetter('dark-high-contrast');
    } else {
      setMode(themeId);
      themeSetter(themeId);
    }
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        variant="plain"
        size="sm"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          width: '28px',
          height: '28px',
          minHeight: '28px',
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <CurrentIcon size={16} />
      </IconButton>

      {/* Dropdown Menu */}
      {isOpen && (
        <Sheet
          sx={{
            position: 'absolute',
            top: '32px',
            right: 0,
            minWidth: '160px',
            borderRadius: 'md',
            boxShadow: 'lg',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            py: 0.5,
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <List
            size="sm"
            sx={{
              '--List-padding': '4px',
              '--ListItem-paddingY': '2px',
            }}
          >
            {themeOptions.map((option) => (
              <ListItem key={option.id} sx={{ p: 0 }}>
                <ListItemButton
                  onClick={() => handleThemeSelect(option.id)}
                  sx={{
                    borderRadius: 'sm',
                    fontSize: '11px',
                    minHeight: '32px',
                    px: 1.5,
                    py: 0.75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(124, 77, 255, 0.15)'
                          : 'rgba(124, 77, 255, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <option.icon size={12} />
                    <Box>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {option.label}
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '9px',
                          color: 'text.tertiary',
                        }}
                      >
                        {option.description}
                      </Typography>
                    </Box>
                  </Box>
                  {selectedTheme === option.id && (
                    <Check size={10} color="#7c4dff" />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Sheet>
      )}
    </Box>
  );
}

export default ColorSchemeToggle;

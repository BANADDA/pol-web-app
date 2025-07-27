import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  fontFamily: {
    display: '-apple-system, "system-ui", var(--joy-fontFamily-fallback)',
    body: '-apple-system, "system-ui", var(--joy-fontFamily-fallback)',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#7c4dff',
          '600': '#6366f1',
          '700': '#4f46e5',
          '800': '#4338ca',
          '900': '#3730a3',
        },
        success: {
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
        },
        danger: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fed7aa',
          '300': '#fdba74',
          '400': '#fb923c',
          '500': '#f97316',
          '600': '#ea580c',
          '700': '#c2410c',
          '800': '#9a3412',
          '900': '#7c2d12',
        },
        background: {
          body: '#ffffff',
          surface: '#ffffff',
          level1: '#f9fafb',
          level2: '#f3f4f6',
        },
        text: {
          primary: '#1f2937',
          secondary: '#4b5563',
          tertiary: '#6b7280',
        },
        divider: '#e5e7eb',
      },
    },
    dark: {
      palette: {
        primary: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#7c4dff',
          '600': '#6366f1',
          '700': '#4f46e5',
          '800': '#4338ca',
          '900': '#3730a3',
        },
        background: {
          body: '#111827',
          surface: '#1f2937',
          level1: '#111827',
          level2: '#374151',
        },
        text: {
          primary: '#ffffff', // Improved from #f9fafb to pure white for better contrast
          secondary: '#e5e7eb', // Improved from #d1d5db to brighter gray
          tertiary: '#d1d5db', // Improved from #9ca3af to much brighter gray
        },
        divider: '#6b7280', // Improved from #4b5563 to brighter divider
      },
    },
  },
});

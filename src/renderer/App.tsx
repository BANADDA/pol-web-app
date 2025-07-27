import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import { useCallback, useEffect, useState } from 'react';

import secretPurpleTheme from './lib/secretPurpleTheme';
import customTheme from './lib/theme';

import MainAppPanel from './components/MainAppPanel';
import './dark-high-contrast.css';
import './light-high-contrast.css';
import './sepia-theme.css';
import './styles.css';

import { NotificationProvider } from './components/Shared/NotificationSystem';
import { ExperimentInfoProvider } from './lib/ExperimentInfoContext';

function AppContent({ themeSetter }: { themeSetter: (name: string) => void }) {
  return (
    <Box
      component="main"
      sx={{
        height: '100dvh',
        width: '100dvw',
        overflow: 'hidden',
        backgroundColor: 'var(--joy-palette-background-surface)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MainAppPanel themeSetter={themeSetter} />
    </Box>
  );
}

export default function App() {
  const [theme, setTheme] = useState(customTheme);
  const [activeThemeClass, setActiveThemeClass] = useState<string>('');

  // Suppress ResizeObserver errors (common in React apps, especially during theme changes)
  useEffect(() => {
    // Create a more robust error handler that catches ResizeObserver loops
    const suppressResizeObserverErrors = () => {
      // Hide webpack dev server error overlays
      const resizeObserverErrDiv = document.getElementById(
        'webpack-dev-server-client-overlay-div',
      );
      const resizeObserverErr = document.getElementById(
        'webpack-dev-server-client-overlay',
      );

      if (resizeObserverErr) {
        resizeObserverErr.style.display = 'none';
      }
      if (resizeObserverErrDiv) {
        resizeObserverErrDiv.style.display = 'none';
      }
    };

    // Run immediately and set up periodic check
    suppressResizeObserverErrors();
    const intervalId = setInterval(suppressResizeObserverErrors, 100);

    // Comprehensive error suppression for ResizeObserver
    const isResizeObserverError = (message: any) => {
      const messageStr = typeof message === 'string' ? message : String(message);
      return messageStr.includes('ResizeObserver loop completed with undelivered notifications') ||
             messageStr.includes('ResizeObserver loop limit exceeded');
    };

    // Suppress console errors
    const originalError = console.error;
    console.error = (...args) => {
      if (args.length > 0 && isResizeObserverError(args[0])) {
        return; // Ignore ResizeObserver errors
      }
      originalError.apply(console, args);
    };

    // Suppress thrown ResizeObserver errors
    const originalErrorHandler = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (isResizeObserverError(message)) {
        return true; // Prevent the error from being displayed
      }
      if (originalErrorHandler) {
        return originalErrorHandler(message, source, lineno, colno, error);
      }
      return false;
    };

    // Suppress unhandled promise rejections for ResizeObserver
    const originalUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
      if (
        event.reason &&
        (isResizeObserverError(event.reason.message) || 
         isResizeObserverError(event.reason))
      ) {
        event.preventDefault();
        return;
      }
      if (originalUnhandledRejection) {
        originalUnhandledRejection(event);
      }
    };

    // Handle React error boundaries and development overlays
    const originalAddEventListener = document.addEventListener;
    const handleErrorEvent = (event: ErrorEvent) => {
      if (isResizeObserverError(event.message || event.error?.message)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener('error', handleErrorEvent, true);

    return () => {
      clearInterval(intervalId);
      console.error = originalError;
      window.onerror = originalErrorHandler;
      window.onunhandledrejection = originalUnhandledRejection;
      document.removeEventListener('error', handleErrorEvent, true);
    };
  }, []);

  const themeSetter = useCallback((name: string) => {
    // Remove all theme classes first
    const { body } = document;
    body.classList.remove(
      'sepia-theme',
      'light-high-contrast',
      'dark-high-contrast',
    );

    if (name === 'purple') {
      setTheme(secretPurpleTheme);
      setActiveThemeClass('');
    } else if (name === 'sepia') {
      setTheme(customTheme);
      setActiveThemeClass('sepia-theme');
    } else if (name === 'light-high-contrast') {
      setTheme(customTheme);
      setActiveThemeClass('light-high-contrast');
    } else if (name === 'dark-high-contrast') {
      setTheme(customTheme);
      setActiveThemeClass('dark-high-contrast');
    } else {
      setTheme(customTheme);
      setActiveThemeClass('');
    }
  }, []);

  // Apply/remove theme classes to document body
  useEffect(() => {
    const { body } = document;

    // Remove all theme classes first
    body.classList.remove(
      'sepia-theme',
      'light-high-contrast',
      'dark-high-contrast',
    );

    // Add the active theme class if any
    if (activeThemeClass) {
      body.classList.add(activeThemeClass);
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove(
        'sepia-theme',
        'light-high-contrast',
        'dark-high-contrast',
      );
    };
  }, [activeThemeClass]);

  return (
    <NotificationProvider>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <CssBaseline />
        <ExperimentInfoProvider connection="polaris">
          <AppContent themeSetter={themeSetter} />
        </ExperimentInfoProvider>
      </CssVarsProvider>
    </NotificationProvider>
  );
}

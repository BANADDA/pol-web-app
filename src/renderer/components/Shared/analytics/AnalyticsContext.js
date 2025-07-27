/* eslint-disable no-console */
// src/analytics/AnalyticsContext.js
import { AnalyticsBrowser } from '@segment/analytics-next';
import { createContext, useContext } from 'react';
import { appContextPlugin } from './appContextPlugin'; // Import the app context plugin

// Initialize the Segment client
export const analytics = new AnalyticsBrowser();

async function maybeLoadAnalytics() {
  console.log('[Analytics] Initializing Analytics...');
  if (window.platform?.environment === 'development') {
    console.log(
      '[Analytics] Analytics tracking is disabled in development mode.',
    );
    return;
  }

  // Check if window.storage exists (preload script loaded properly)
  if (!window.storage) {
    console.log('[Analytics] Storage API not available, analytics disabled.');
    return;
  }

  const doNotTrack = await window.storage.get('DO_NOT_TRACK');
  console.log(`[Analytics] Do Not Track setting: ${doNotTrack}`);
  // If the user has opted out of tracking, do not load the analytics client
  if (doNotTrack === 'true') {
    console.log(
      '[Analytics] User has opted out. All usage tracking is disabled.',
    );
    return;
  }
  analytics.load({ writeKey: 'UYXFr71CWmsdxDqki5oFXIs2PSR5XGCE' }); // destinations loaded, enqueued events are flushed
}

maybeLoadAnalytics();

analytics.register(appContextPlugin); // Register the plugins

// Create a React Context
const AnalyticsContext = createContext(analytics);

// Export a custom hook for easy access to the analytics instance
export const useAnalytics = () => {
  return useContext(AnalyticsContext);
};

// Export a provider component
export const AnalyticsProvider = ({ children }) => {
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

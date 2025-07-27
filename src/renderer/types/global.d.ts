// Global type declarations for Electron APIs exposed through preload script

declare global {
  interface Window {
    systemAPI: {
      getCPUs: () => any[];
      getTotalMemory: () => number;
      getFreeMemory: () => number;
      getUptime: () => number;
      getArch: () => string;
      getPlatform: () => string;
      getRelease: () => string;
      execSync: (command: string, options?: { timeout?: number }) => string;
      isWindows: () => boolean;
      isMac: () => boolean;
      isLinux: () => boolean;
    };
  }
}

export {};

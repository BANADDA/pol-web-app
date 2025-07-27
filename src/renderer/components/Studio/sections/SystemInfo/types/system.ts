export interface SystemSpecs {
  os: {
    name: string;
    version: string;
    architecture: string;
    platform: string;
  };
  cpu: {
    name: string;
    brand: string;
    architecture: string;
    model: string;
    family: string;
    cores: number;
    threads: number;
    performanceTier: string;
    baseSpeed: string;
    maxSpeed: string;
    cache: {
      l1: string;
      l2: string;
      l3: string;
    };
    usage: number;
    temperature: number;
  };
  memory: {
    total: number;
    available: number;
    usage: number;
    speed: string;
    type: string;
    slots: number;
    slotsUsed: number;
  };
  gpu: {
    name: string;
    vendor: string;
    architecture: string;
    memory: number;
    memoryUsed: number;
    usage: number;
    temperature: number;
    driverVersion: string;
    clockSpeed: string;
    systemType?: 'CPU-Focused' | 'GPU-Focused' | 'Balanced';
  };
  storage: {
    drives: Array<{
      name: string;
      type: string;
      total: number;
      available: number;
      usage: number;
      health: string;
    }>;
  };
  display: {
    resolution: string;
    colorDepth: string;
    refreshRate: string;
  };
  resourceMonitor: {
    processes: number;
    uptime: string;
    networkUp: string;
    networkDown: string;
  };
}

export interface HardwareTabProps {
  darkMode?: boolean;
}

export interface DriveInfo {
  name: string;
  type: string;
  total: number;
  available: number;
  usage: number;
  health: string;
}

export interface GPUInfo {
  name: string;
  vendor: string;
  architecture: string;
  memory: number;
  memoryUsed: number;
  usage: number;
  temperature: number;
  driverVersion: string;
  clockSpeed: string;
  systemType?: 'CPU-Focused' | 'GPU-Focused' | 'Balanced';
}

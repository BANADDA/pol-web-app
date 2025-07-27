export interface Runtime {
  id: string;
  name: string;
  displayName: string;
  version: string;
  engine: string;
  description: string;
  compatibility: 'Compatible' | 'Incompatible' | 'Unknown';
  modelFormats: string[];
  gpuHardware?: string;
  cpuSoftware?: string;
  requirements: {
    os: string[];
    gpu?: string[];
    memory?: string;
    storage?: string;
  };
  features: string[];
  performance: 'High' | 'Medium' | 'Low';
  status: 'Available' | 'Installed' | 'Updating';
  size?: string;
}

export interface RuntimeCategory {
  id: string;
  name: string;
  icon: string;
  runtimes: Runtime[];
}

export interface RuntimesTabProps {
  darkMode?: boolean;
}

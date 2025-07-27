import type { Runtime, RuntimeCategory } from '../types/runtime';

// =============================================================================
// RUNTIME DATA CONFIGURATION
// =============================================================================
// This file contains all runtime configurations that can be easily updated
// Add, modify, or remove runtimes by editing the arrays below
// =============================================================================

export const mockRuntimes: Runtime[] = [
  // =============================================================================
  // POLARISLLM - The Only Runtime Platform
  // =============================================================================
  {
    id: 'polarisllm',
    name: 'PolarisLLM',
    displayName: 'PolarisLLM Deployment Platform',
    version: '1.0.0',
    engine: 'PolarisLLM + Swift',
    description:
      'A comprehensive deployment platform powered by MS-Swift framework for Large Language Models with public API access. Currently featuring DeepSeek-VL-7B-Chat with vision + text capabilities.',
    compatibility: 'Compatible' as const,
    modelFormats: ['gguf', 'safetensors', 'pytorch'],
    gpuHardware: 'NVIDIA RTX 4090 (Recommended)',
    cpuSoftware: 'x64 Multi-core + Swift Runtime',
    requirements: {
      os: ['Linux', 'Windows'],
      gpu: ['NVIDIA RTX 4090', 'NVIDIA RTX 4080', 'NVIDIA RTX 3090'],
      memory: '16GB+ RAM',
      storage: '50GB+ free space',
    },
    features: [
      'MS-Swift Framework',
      'Automated Setup',
      'GPU Optimized',
      'Public API Access',
      'Cloudflare Integration',
      'Vision Support',
      'Production Ready',
      'OpenAI-Compatible API',
      'Swift-Accelerated Inference',
      'Multi-Model Support',
    ],
    performance: 'High' as const,
    status: 'Available' as const,
    size: '~15GB',
  },
];

// =============================================================================
// RUNTIME CATEGORIES
// =============================================================================
// Organize runtimes into logical categories for easy navigation
// =============================================================================

export const runtimeCategories: RuntimeCategory[] = [
  {
    id: 'polarisllm',
    name: 'PolarisLLM Platform',
    icon: '⚡',
    runtimes: mockRuntimes, // Only PolarisLLM runtime
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================
// Helper functions for filtering and finding runtimes
// =============================================================================

export const getCompatibleRuntimes = (): Runtime[] => {
  return mockRuntimes.filter(
    (runtime) => runtime.compatibility === 'Compatible',
  );
};

export const getInstalledRuntimes = (): Runtime[] => {
  return mockRuntimes.filter((runtime) => runtime.status === 'Installed');
};

export const getRuntimeById = (id: string): Runtime | undefined => {
  return mockRuntimes.find((runtime) => runtime.id === id);
};

export const getRuntimesByEngine = (engine: string): Runtime[] => {
  return mockRuntimes.filter((runtime) => runtime.engine === engine);
};

export const getRuntimesByPerformance = (
  performance: Runtime['performance'],
): Runtime[] => {
  return mockRuntimes.filter((runtime) => runtime.performance === performance);
};

// =============================================================================
// CONFIGURATION CONSTANTS
// =============================================================================
// Easy-to-modify constants for runtime configuration
// =============================================================================

export const RUNTIME_CONFIG = {
  // Default category to show when component loads
  DEFAULT_CATEGORY: 'polarisllm',

  // Whether to show compatible runtimes only by default
  DEFAULT_SHOW_COMPATIBLE_ONLY: true,

  // Maximum description length for runtime cards
  MAX_DESCRIPTION_LENGTH: 100,

  // Card dimensions
  MIN_CARD_HEIGHT: 140, // Compact height with minimal padding
  CARDS_PER_ROW_XS: 1, // 1 card per row on mobile
  CARDS_PER_ROW: 2, // 2 cards per row on all other screens
  GRID_SPACING: 1.5, // Reduced spacing between cards

  // Supported model formats
  SUPPORTED_FORMATS: ['gguf', 'onnx', 'openvino', 'ir', 'trt', 'plan'],
} as const;

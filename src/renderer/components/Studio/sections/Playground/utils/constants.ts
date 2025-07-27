import type { Model, SamplePrompt } from '../types';

export const SAMPLE_PROMPTS: SamplePrompt[] = [
  {
    id: 'sample1',
    title: 'Help me optimize a Python function for better performance',
  },
  {
    id: 'sample2',
    title: 'Create a REST API endpoint for user authentication',
  },
  {
    id: 'sample3',
    title: 'Explain transformer attention mechanisms in simple terms',
  },
  {
    id: 'sample4',
    title: 'Generate test cases for a machine learning model',
  },
];

export const AVAILABLE_MODELS: Model[] = [
  {
    id: 'Qwen2.5-7B-Instruct',
    name: 'Qwen 2.5 7B',
    description:
      'High-performance 7B model optimized for code and reasoning tasks.',
    deployed: true,
    parameters: '7B',
    multimodal: false,
    iconType: 'qwen',
  },
  {
    id: 'deepseek-vl-7b-chat',
    name: 'DeepSeek VL 7B',
    description: 'Advanced multimodal model for visual and text understanding.',
    deployed: true,
    parameters: '7B',
    multimodal: true,
    iconType: 'deepseek',
  },
  {
    id: 'llama-3-8b-instruct',
    name: 'Llama 3 8B',
    description: "Meta's latest instruction-tuned model for general tasks.",
    deployed: false,
    parameters: '8B',
    multimodal: false,
    iconType: 'meta',
  },
];

export const TABS = ['chat', 'json', 'markdown'] as const;

export const SIDEBAR_PANELS = ['chatHistory', 'details'] as const;

export const DEFAULT_API_CONFIG = {
  maxTokens: 2048,
  temperature: 0.7,
  stream: true,
};

export const UI_CONFIG = {
  sidebar: {
    defaultWidth: 'w-72',
    collapsedWidth: 'w-10',
  },
  chat: {
    maxImagePreviewHeight: 'max-h-48',
    messageMaxWidth: 'max-w-4xl',
  },
};

export const KEYBOARD_SHORTCUTS = {
  SEND_MESSAGE: 'Enter',
  NEW_CHAT: 'Ctrl+N',
  TOGGLE_SIDEBAR: 'Ctrl+B',
} as const;

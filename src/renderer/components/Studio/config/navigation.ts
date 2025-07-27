import {
  Book,
  Bot,
  Brain,
  Code,
  Folder,
  PlayCircle,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { NavigationSection } from '../types';

export const navigationSections: NavigationSection[] = [
  // Group 1: Model Management
  {
    id: 'catalogue',
    label: 'Model Catalogue',
    icon: Folder,
    comingSoon: false,
    description: 'Browse and search for models',
    group: 'models',
  },
  {
    id: 'playground',
    label: 'Playground',
    icon: PlayCircle,
    comingSoon: false,
    description: 'Test models with prompts',
    group: 'models',
  },
  // Group 2: AI Tools
  {
    id: 'readbuddy',
    label: 'ReadBuddy',
    icon: Book,
    comingSoon: true,
    description: 'Document chat & libraries',
    group: 'tools',
  },
  {
    id: 'agentmaker',
    label: 'Agent Maker',
    icon: Bot,
    comingSoon: true,
    description: 'Create custom AI agents',
    group: 'tools',
  },
  {
    id: 'assistant',
    label: 'AI Assistant',
    icon: Sparkles,
    comingSoon: true,
    description: 'Personal AI assistant',
    group: 'tools',
  },
  // Group 3: Development
  {
    id: 'deployments',
    label: 'Deployments',
    icon: Rocket,
    comingSoon: true,
    hideFromTabs: true,
    description: 'Deploy and manage model deployments',
    group: 'development',
  },
  {
    id: 'tokens',
    label: 'API & Tokens',
    icon: Code,
    comingSoon: true,
    description: 'Manage API keys and tokens',
    group: 'development',
  },
  // Group 4: System
  {
    id: 'system',
    label: 'System Info',
    icon: Brain,
    comingSoon: false,
    description: 'View system information and settings',
    group: 'system',
  },
];

export const groupLabels = {
  models: 'Model Management',
  tools: 'AI Tools',
  development: 'Development',
  system: 'System',
};

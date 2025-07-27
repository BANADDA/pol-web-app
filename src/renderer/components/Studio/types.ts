import React from 'react';

export interface NavigationSection {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  comingSoon: boolean;
  description: string;
  group: 'models' | 'tools' | 'development' | 'system';
  hideFromTabs?: boolean;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  parameters: string;
  brand: string;
  type: string;
  downloads: string;
  lastUpdated: string;
  size: string;
  huggingface_id: string;
  requirements?: any;
  quantizations?: any;
}

export interface StudioProps {
  darkMode: boolean;
  themeSetter: (theme: string) => void;
}

export interface PlaceholderComponentProps {
  darkMode: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  feature?: string;
  description?: string;
}

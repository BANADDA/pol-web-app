import React from 'react';

export interface Model {
  id: string;
  name: string;
  description: string;
  deployed: boolean;
  parameters: string;
  multimodal: boolean;
  iconType: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  imagePreview?: string;
  imageUrl?: string;
  isStreaming?: boolean;
  isBreakdown?: boolean;
  error?: boolean;
  timestamp?: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  date: string;
  model: string;
  active: boolean;
}

export interface PlaygroundState {
  activeTab: 'chat' | 'json' | 'markdown';
  selectedModel: Model | null;
  breakdownModel: Model | null;
  isMultiModelMode: boolean;
  chatMessages: ChatMessage[];
  chatHistory: ChatHistory[];
  userInput: string;
  isProcessing: boolean;
  conversationId: string | null;
  attachedImageFile: File | null;
  attachedImagePreview: string | null;
}

export interface UIState {
  activePanel: 'chatHistory' | 'details';
  isSidebarCollapsed: boolean;
  showModelDropdown: boolean;
  showBreakdownModelDropdown: boolean;
  isImageModalOpen: boolean;
  modalImageUrl: string | null;
  isShareModalOpen: boolean;
  copiedMessageId: string | null;
}

export interface PlaygroundProps {
  darkMode?: boolean;
}

export interface ModelSelectorProps {
  label: string;
  models: Model[];
  selectedModel: Model | null;
  onModelSelect: (model: Model) => void;
  onModelDeploy: (model: Model) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  buttonStyle?: string;
}

export interface ChatAreaProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  selectedModel: Model | null;
  onImageClick: (imageUrl: string) => void;
  onCopyMessage: (messageId: string, content: string) => void;
  onEditMessage: (content: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  onSendMessage: () => void;
  onImageAttach: (file: File) => void;
  onRemoveImage: () => void;
  attachedImagePreview: string | null;
  isProcessing: boolean;
  selectedModel: Model | null;
  breakdownModel: Model | null;
  isMultiModelMode: boolean;
  disabled: boolean;
}

export interface SidebarProps {
  activePanel: 'chatHistory' | 'details';
  setActivePanel: (panel: 'chatHistory' | 'details') => void;
  chatHistory: ChatHistory[];
  selectedModel: Model | null;
  onSelectChat: (chatId: string) => void;
  onClearHistory: () => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

export interface SamplePrompt {
  id: string;
  title: string;
}

export interface StreamCallbacks {
  onStreamChunk?: (chunk: string) => void;
  onStreamEnd?: () => void;
  onStreamError?: (error: Error) => void;
}

export interface ApiPayload {
  model: string;
  messages?: Array<{ role: string; content: string }>;
  prompt?: string;
  image?: File;
  stream: boolean;
  conversation_id?: string;
  max_tokens?: number;
  temperature?: number;
}

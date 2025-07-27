import type { ChatMessage, Model } from '../types';

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
};

export const generateConversationTitle = (
  firstMessage: string,
  hasImage: boolean,
): string => {
  if (hasImage) {
    return `Image: ${firstMessage.slice(0, 15)}${firstMessage.length > 15 ? '...' : ''}`;
  }
  return firstMessage.slice(0, 25) + (firstMessage.length > 25 ? '...' : '');
};

export const generateMarkdownExport = (
  messages: ChatMessage[],
  model?: Model,
): string => {
  let md = `# Conversation with ${model?.name || 'AI Assistant'}\n\n`;
  md += `*Generated from Polaris AI Playground*\n\n`;
  md += `**Model:** ${model?.name || 'Unknown'}\n`;
  md += `**Date:** ${new Date().toLocaleString()}\n\n`;
  md += '---\n\n';

  messages.forEach((msg) => {
    const prefix =
      msg.role === 'user'
        ? '👤 **User**'
        : `🤖 **${msg.model || model?.name || 'Assistant'}**`;
    md += `### ${prefix}\n\n`;

    if (msg.role === 'user' && msg.imagePreview) {
      md += `*(Image attached - not included in export)*\n\n`;
    }

    md += `${msg.content || ''}\n\n`;

    if (msg.error) {
      md += `*⚠️ This message encountered an error during processing*\n\n`;
    }
  });

  return md;
};

export const generateJSONExport = (
  messages: ChatMessage[],
  model?: Model,
  config?: any,
): string => {
  const exportData = {
    metadata: {
      exportDate: new Date().toISOString(),
      model: {
        id: model?.id,
        name: model?.name,
        parameters: model?.parameters,
      },
      messageCount: messages.length,
      version: '1.0.0',
    },
    configuration: {
      temperature: config?.temperature || 0.7,
      maxTokens: config?.maxTokens || 2048,
      stream: config?.stream || true,
    },
    conversation: messages.map((msg) => ({
      id: msg.id,
      role: msg.role,
      content: msg.content,
      model: msg.model,
      timestamp: msg.timestamp?.toISOString(),
      hasImage: !!msg.imagePreview,
      isStreaming: msg.isStreaming,
      error: msg.error,
    })),
  };

  return JSON.stringify(exportData, null, 2);
};

export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (
  file: File,
): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)',
    };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image file size must be less than 10MB' };
  }

  return { valid: true };
};

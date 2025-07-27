import { Circle, Scissors, Sparkles } from 'lucide-react';
import React from 'react';

interface ModelIconProps {
  type?: string;
  multimodal?: boolean;
  className?: string;
  modelName?: string;
}

const ModelIcon: React.FC<ModelIconProps> = ({
  type,
  multimodal,
  className = 'h-4 w-4',
  modelName = '',
}) => {
  // Determine effective type for icon mapping
  const effectiveType =
    type ||
    (modelName?.toLowerCase().includes('qwen')
      ? 'qwen'
      : modelName?.toLowerCase().includes('deepseek')
        ? 'deepseek'
        : 'default');

  // Determine color based on multimodality or type
  const getIconColor = () => {
    if (multimodal) return 'text-pink-500';
    if (effectiveType === 'qwen') return 'text-cyan-500';
    if (effectiveType === 'deepseek') return 'text-purple-500';
    return 'text-neutral-400';
  };

  const iconProps = {
    className: `${className} ${getIconColor()}`,
    strokeWidth: 1.5,
  };

  // DeepSeek or Multimodal Icon (Scissors for visual/processing)
  if (multimodal || effectiveType === 'deepseek') {
    return <Scissors {...iconProps} />;
  }

  // Qwen Icon (Sparkles for advanced AI)
  if (effectiveType === 'qwen') {
    return <Sparkles {...iconProps} />;
  }

  // Default Icon (Circle)
  return <Circle {...iconProps} fill="currentColor" />;
};

export default ModelIcon;

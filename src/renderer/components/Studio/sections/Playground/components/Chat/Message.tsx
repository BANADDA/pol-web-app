import { Box, Button, Card, Chip, Typography } from '@mui/joy';
import { Check, Copy, Edit3, User } from 'lucide-react';
import React from 'react';
import type { ChatMessage } from '../../types';
import ModelIcon from '../UI/ModelIcon';

interface MessageProps {
  message: ChatMessage;
  selectedModel?: { name: string } | null;
  onImageClick?: (imageUrl: string) => void;
  onCopyMessage?: (messageId: string, content: string) => void;
  onEditMessage?: (content: string) => void;
  copiedMessageId?: string | null;
}

const Message: React.FC<MessageProps> = ({
  message,
  selectedModel,
  onImageClick,
  onCopyMessage,
  onEditMessage,
  copiedMessageId,
}) => {
  const isUser = message.role === 'user';
  const isCopied = copiedMessageId === message.id;

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3,
        overflow: 'hidden',
        backgroundColor: isUser ? 'primary.50' : 'background.body',
        borderColor: isUser ? 'primary.200' : 'divider',
      }}
    >
      {/* Message Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          pb: 1,
          backgroundColor: isUser ? 'primary.100' : 'background.level1',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* User/Model Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: isUser ? 'primary.500' : 'neutral.200',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isUser ? (
              <User size={12} color="white" />
            ) : (
              <ModelIcon
                type={message.model}
                className="w-3 h-3"
                modelName={message.model}
              />
            )}
          </Box>

          <Box>
            <Typography
              level="title-sm"
              sx={{ fontSize: '12px', fontWeight: 600 }}
            >
              {isUser
                ? 'User'
                : message.model || selectedModel?.name || 'Assistant'}
            </Typography>
            {message.isBreakdown && (
              <Chip
                size="sm"
                color="warning"
                variant="soft"
                sx={{ fontSize: '9px', ml: 1 }}
              >
                Base Model Processing
              </Chip>
            )}
          </Box>

          {/* Status Indicators */}
          {message.isStreaming && (
            <Typography level="body-xs" sx={{ color: 'text.secondary', ml: 1 }}>
              typing...
            </Typography>
          )}
          {message.error && (
            <Chip
              size="sm"
              color="danger"
              variant="soft"
              sx={{ fontSize: '9px', ml: 1 }}
            >
              Error
            </Chip>
          )}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {message.content && (
            <Button
              size="sm"
              variant="plain"
              onClick={() => onCopyMessage?.(message.id, message.content)}
              sx={{
                minWidth: 'auto',
                p: 0.5,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
            >
              {isCopied ? (
                <Check size={14} color="green" />
              ) : (
                <Copy size={14} />
              )}
            </Button>
          )}

          {isUser && (
            <Button
              size="sm"
              variant="plain"
              onClick={() => onEditMessage?.(message.content)}
              sx={{
                minWidth: 'auto',
                p: 0.5,
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
              }}
            >
              <Edit3 size={14} />
            </Button>
          )}
        </Box>
      </Box>

      {/* Message Content */}
      <Box sx={{ p: 2 }}>
        {/* Image Preview for User Messages */}
        {message.imagePreview && (
          <Box sx={{ mb: 2 }}>
            <img
              src={message.imagePreview}
              alt="User upload"
              onClick={() => onImageClick?.(message.imagePreview!)}
              style={{
                maxWidth: '200px',
                maxHeight: '150px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'var(--joy-palette-divider)',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLImageElement).style.opacity = '1';
              }}
            />
          </Box>
        )}

        {/* Message Text */}
        <Box>
          {message.content ? (
            <Typography
              level="body-sm"
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '13px',
                lineHeight: 1.5,
                opacity: message.isBreakdown ? 0.8 : 1,
              }}
            >
              {message.content}
            </Typography>
          ) : (
            <Box
              sx={{
                height: 16,
                width: 64,
                backgroundColor: 'neutral.200',
                borderRadius: 'sm',
                animation: 'pulse 1.5s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.4 },
                  '50%': { opacity: 0.8 },
                },
              }}
            />
          )}
        </Box>

        {/* Timestamp */}
        {message.timestamp && (
          <Typography
            level="body-xs"
            sx={{
              color: 'text.tertiary',
              fontSize: '10px',
              mt: 1,
            }}
          >
            {message.timestamp.toLocaleTimeString()}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default Message;

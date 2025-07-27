import { Box } from '@mui/joy';
import React from 'react';
import type { ChatMessage, Model } from '../../types';

interface ChatAreaProps {
  messages: ChatMessage[];
  selectedModel: Model | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  darkMode: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  selectedModel,
  messagesEndRef,
  darkMode,
}) => {
  const getUserBackgroundColor = (isUser: boolean) => {
    if (isUser) {
      return darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)';
    }
    return darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(248, 250, 252, 0.9)';
  };

  const getAvatarColor = (isUser: boolean) => {
    if (isUser) {
      return darkMode ? '#3b82f6' : '#2563eb';
    }
    return darkMode ? '#06b6d4' : '#0891b2';
  };
  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            mb: 4,
            borderRadius: 'xl',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            backgroundColor: darkMode
              ? 'rgba(17, 24, 39, 0.7)'
              : 'rgba(255, 255, 255, 0.95)',
            boxShadow: darkMode
              ? '0 4px 8px rgba(0,0,0,0.3)'
              : '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Message Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              backgroundColor: getUserBackgroundColor(message.role === 'user'),
              borderBottom: '1px solid',
              borderColor: darkMode
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: getAvatarColor(message.role === 'user'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {message.role === 'user' ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                )}
              </Box>

              <Box sx={{ fontSize: '12px', fontWeight: 600 }}>
                {message.role === 'user'
                  ? 'User Query'
                  : message.model || selectedModel?.name || 'Assistant'}
              </Box>

              {message.isStreaming && (
                <Box
                  sx={{
                    fontSize: '10px',
                    color: 'text.secondary',
                    ml: 2,
                    fontStyle: 'italic',
                  }}
                >
                  typing...
                </Box>
              )}
              {message.error && (
                <Box sx={{ fontSize: '10px', color: 'error.500', ml: 2 }}>
                  (Error)
                </Box>
              )}
              {message.isBreakdown && (
                <Box
                  sx={{
                    fontSize: '9px',
                    px: 1,
                    py: 0.25,
                    borderRadius: '12px',
                    backgroundColor: darkMode
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(245, 158, 11, 0.1)',
                    color: darkMode ? '#fbbf24' : '#f59e0b',
                    ml: 2,
                  }}
                >
                  Base Model Processing
                </Box>
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
                  alt="User upload preview"
                  style={{
                    maxWidth: '300px',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    cursor: 'pointer',
                  }}
                />
              </Box>
            )}

            {/* Message Text */}
            <Box>
              {message.content ? (
                <Box
                  sx={{
                    fontSize: '13px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    color: darkMode
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(0,0,0,0.9)',
                    opacity: message.isBreakdown ? 0.8 : 1,
                  }}
                >
                  {message.content}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 16,
                    width: 64,
                    backgroundColor: darkMode
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.1)',
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
          </Box>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatArea;

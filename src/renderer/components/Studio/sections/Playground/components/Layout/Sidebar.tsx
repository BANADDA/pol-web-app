import { Box, Button, IconButton, Typography } from '@mui/joy';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import React from 'react';
import type { ChatHistory, Model } from '../../types';

interface SidebarProps {
  activePanel: 'chatHistory' | 'details';
  setActivePanel: (panel: 'chatHistory' | 'details') => void;
  chatHistory: ChatHistory[];
  selectedModel: Model | null;
  onSelectChat: (chatId: string) => void;
  onClearHistory: () => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePanel,
  setActivePanel,
  chatHistory,
  selectedModel,
  onSelectChat,
  onClearHistory,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  darkMode,
}) => {
  return (
    <Box
      sx={{
        width: {
          xs: isSidebarCollapsed ? 40 : '100vw',
          sm: isSidebarCollapsed ? 40 : 280,
          md: isSidebarCollapsed ? 40 : 260,
          lg: isSidebarCollapsed ? 40 : 240
        },
        flexShrink: 0,
        height: '100vh',
        borderLeft: '1px solid',
        borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        background: darkMode
          ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: {
          xs: isSidebarCollapsed ? 'relative' : 'fixed',
          sm: 'relative'
        },
        top: 0,
        right: 0,
        zIndex: {
          xs: isSidebarCollapsed ? 'auto' : 1200,
          sm: 'auto'
        },
        display: 'flex',
        flexDirection: 'column',
        boxShadow: darkMode 
          ? 'inset 1px 0 0 0 rgba(148, 163, 184, 0.1), -4px 0 24px -2px rgba(0, 0, 0, 0.4)'
          : 'inset 1px 0 0 0 rgba(148, 163, 184, 0.2), -4px 0 24px -2px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Collapse/Expand Button */}
      <IconButton
        size="sm"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        sx={{
          position: 'absolute',
          left: -16,
          top: 20,
          zIndex: 1300,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: darkMode
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(51, 65, 85, 0.95))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
          color: darkMode ? 'rgba(148, 163, 184, 1)' : 'rgba(71, 85, 105, 1)',
          border: '1px solid',
          borderColor: darkMode 
            ? 'rgba(148, 163, 184, 0.2)' 
            : 'rgba(148, 163, 184, 0.3)',
          boxShadow: darkMode
            ? '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(51, 65, 85, 1), rgba(71, 85, 105, 1))'
              : 'linear-gradient(135deg, rgba(241, 245, 249, 1), rgba(226, 232, 240, 1))',
            borderColor: darkMode 
              ? 'rgba(148, 163, 184, 0.3)' 
              : 'rgba(148, 163, 184, 0.4)',
            boxShadow: darkMode
              ? '0 6px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              : '0 6px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          },\n        }}\n      >\n        {isSidebarCollapsed ? (\n          <ChevronLeft size={18} />\n        ) : (\n          <ChevronRight size={18} />\n        )}\n      </IconButton>\n\n      {/* Mobile Overlay */}\n      {!isSidebarCollapsed && (\n        <Box\n          sx={{\n            display: { xs: 'block', sm: 'none' },\n            position: 'fixed',\n            top: 0,\n            left: 0,\n            right: 0,\n            bottom: 0,\n            backgroundColor: 'rgba(0, 0, 0, 0.6)',\n            backdropFilter: 'blur(4px)',\n            zIndex: 1199,\n          }}\n          onClick={() => setIsSidebarCollapsed(true)}\n        />\n      )}

      {/* Conditionally render sidebar content */}
      {!isSidebarCollapsed && (
        <>
          {/* Sidebar Tabs */}
          <Box
            sx={{
              display: 'flex',
              borderBottom: '1px solid',
              borderColor: darkMode
                ? 'rgba(148, 163, 184, 0.1)'
                : 'rgba(148, 163, 184, 0.2)',
              background: darkMode
                ? 'rgba(15, 23, 42, 0.8)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              position: 'sticky',
              top: 0,
              zIndex: 2,
            }}
          >
            {[
              { id: 'chatHistory' as const, label: 'Chats' },
              { id: 'details' as const, label: 'Details' },
            ].map((panel) => (
              <Button
                key={panel.id}
                variant="plain"
                onClick={() => setActivePanel(panel.id)}
                sx={{
                  flex: 1,
                  position: 'relative',
                  py: 2.5,
                  px: 2,
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: 0,
                  minHeight: '44px',
                  color:
                    activePanel === panel.id
                      ? panel.id === 'chatHistory'
                        ? darkMode
                          ? '#fb923c'
                          : '#ea580c'
                        : darkMode
                          ? '#60a5fa'
                          : '#3b82f6'
                      : darkMode
                        ? 'rgba(148, 163, 184, 0.8)'
                        : 'rgba(71, 85, 105, 0.8)',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    color: activePanel === panel.id 
                      ? undefined
                      : darkMode
                        ? 'rgba(248, 250, 252, 0.95)'
                        : 'rgba(15, 23, 42, 0.95)',
                    backgroundColor: darkMode
                      ? 'rgba(148, 163, 184, 0.1)'
                      : 'rgba(148, 163, 184, 0.1)',
                  },
                  '&::after':
                    activePanel === panel.id
                      ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '32px',
                          height: '3px',
                          borderRadius: '2px 2px 0 0',
                          background:
                            panel.id === 'chatHistory'
                              ? 'linear-gradient(90deg, #fb923c, #f97316)'
                              : 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                          boxShadow: panel.id === 'chatHistory'
                            ? '0 0 12px rgba(251, 146, 60, 0.4)'
                            : '0 0 12px rgba(96, 165, 250, 0.4)',
                        }
                      : {},
                }}
              >
                {panel.label}
              </Button>
            ))}
          </Box>

          {/* Chat History Panel */}
          {activePanel === 'chatHistory' && (
            <Box sx={{ overflow: 'auto', flex: 1, minHeight: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 3,
                  py: 2.5,
                  position: 'sticky',
                  top: 0,
                  zIndex: 3,
                  background: darkMode
                    ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
                  backdropFilter: 'blur(12px)',
                  borderBottom: '1px solid',
                  borderColor: darkMode
                    ? 'rgba(148, 163, 184, 0.08)'
                    : 'rgba(148, 163, 184, 0.15)',
                }}
              >
                <Typography
                  level="title-sm"
                  sx={{ 
                    fontSize: '14px', 
                    fontWeight: 700,
                    background: darkMode 
                      ? 'linear-gradient(135deg, #fb923c, #f97316)'
                      : 'linear-gradient(135deg, #ea580c, #dc2626)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Recent Chats
                </Typography>
                {chatHistory.length > 0 && (
                  <Button
                    variant="plain"
                    size="sm"
                    onClick={onClearHistory}
                    sx={{
                      fontSize: '11px',
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      color: darkMode ? '#fb923c' : '#ea580c',
                      backgroundColor: darkMode 
                        ? 'rgba(251, 146, 60, 0.1)'
                        : 'rgba(234, 88, 12, 0.08)',
                      border: '1px solid',
                      borderColor: darkMode
                        ? 'rgba(251, 146, 60, 0.2)'
                        : 'rgba(234, 88, 12, 0.15)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: darkMode ? '#f97316' : '#dc2626',
                        backgroundColor: darkMode 
                          ? 'rgba(249, 115, 22, 0.15)'
                          : 'rgba(220, 38, 38, 0.1)',
                        borderColor: darkMode
                          ? 'rgba(249, 115, 22, 0.3)'
                          : 'rgba(220, 38, 38, 0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    Clear all
                  </Button>
                )}
              </Box>

              {chatHistory.length === 0 ? (
                <Box sx={{ textAlign: 'center', p: 4, mt: 4 }}>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: '12px',
                      color: darkMode
                        ? 'rgba(255,255,255,0.5)'
                        : 'rgba(0,0,0,0.5)',
                    }}
                  >
                    No saved conversations.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ px: 2, pt: 1, pb: 3 }}>
                  {chatHistory.map((chat) => (
                    <Box
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      sx={{
                        p: 2.5,
                        mb: 1.5,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: chat.active
                          ? darkMode
                            ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(168, 85, 247, 0.15))'
                            : 'linear-gradient(135deg, rgba(249, 115, 22, 0.08), rgba(168, 85, 247, 0.08))'
                          : darkMode
                            ? 'rgba(30, 41, 59, 0.4)'
                            : 'rgba(248, 250, 252, 0.8)',
                        border: '1px solid',
                        borderColor: chat.active
                          ? darkMode ? 'rgba(251, 146, 60, 0.3)' : 'rgba(249, 115, 22, 0.2)'
                          : darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.15)',
                        boxShadow: chat.active
                          ? '0 4px 20px rgba(251, 146, 60, 0.15)'
                          : 'none',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          background: chat.active
                            ? darkMode
                              ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(168, 85, 247, 0.2))'
                              : 'linear-gradient(135deg, rgba(249, 115, 22, 0.12), rgba(168, 85, 247, 0.12))'
                            : darkMode
                              ? 'rgba(51, 65, 85, 0.6)'
                              : 'rgba(241, 245, 249, 0.9)',
                          boxShadow: chat.active
                            ? '0 8px 30px rgba(251, 146, 60, 0.25)'
                            : darkMode
                              ? '0 4px 20px rgba(0, 0, 0, 0.3)'
                              : '0 4px 20px rgba(0, 0, 0, 0.1)',
                          borderColor: chat.active
                            ? darkMode ? 'rgba(251, 146, 60, 0.4)' : 'rgba(249, 115, 22, 0.3)'
                            : darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.25)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Clock
                          size={12}
                          style={{
                            marginRight: '6px',
                            flexShrink: 0,
                            color: darkMode
                              ? 'rgba(156, 163, 175, 1)'
                              : 'rgba(107, 114, 128, 1)',
                          }}
                        />
                        <Typography
                          level="body-sm"
                          sx={{
                            fontSize: '12px',
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: chat.active
                              ? darkMode
                                ? 'rgba(255,255,255,0.95)'
                                : 'rgba(0,0,0,0.95)'
                              : darkMode
                                ? 'rgba(255,255,255,0.8)'
                                : 'rgba(0,0,0,0.8)',
                          }}
                        >
                          {chat.title}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '10px',
                          mt: 0.5,
                          ml: 2.25,
                          color: darkMode
                            ? 'rgba(156, 163, 175, 1)'
                            : 'rgba(107, 114, 128, 1)',
                        }}
                      >
                        <span>{chat.date}</span>
                        <span
                          style={{
                            color: chat.active
                              ? darkMode
                                ? '#f97316'
                                : '#ea580c'
                              : darkMode
                                ? 'rgba(249, 115, 22, 0.8)'
                                : 'rgba(234, 88, 12, 0.8)',
                          }}
                        >
                          {chat.model}
                        </span>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* Details Panel */}
          {activePanel === 'details' && (
            <Box sx={{ overflow: 'auto', flex: 1, p: 3 }}>
              {selectedModel ? (
                <>
                  <Typography
                    level="title-sm"
                    sx={{ mb: 1.5, fontSize: '12px', fontWeight: 500 }}
                  >
                    Model Information
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 'md',
                      mb: 3,
                      fontSize: '12px',
                      backgroundColor: darkMode
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'rgba(59, 130, 246, 0.05)',
                      border: '1px solid',
                      borderColor: darkMode
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '10px',
                          color: darkMode
                            ? 'rgba(156, 163, 175, 1)'
                            : 'rgba(107, 114, 128, 1)',
                        }}
                      >
                        Model ID
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ fontWeight: 500, fontSize: '12px' }}
                      >
                        {selectedModel.id}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '10px',
                          color: darkMode
                            ? 'rgba(156, 163, 175, 1)'
                            : 'rgba(107, 114, 128, 1)',
                        }}
                      >
                        Name
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ fontWeight: 500, fontSize: '12px' }}
                      >
                        {selectedModel.name}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '10px',
                          color: darkMode
                            ? 'rgba(156, 163, 175, 1)'
                            : 'rgba(107, 114, 128, 1)',
                        }}
                      >
                        Parameters
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ fontWeight: 500, fontSize: '12px' }}
                      >
                        {selectedModel.parameters}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '10px',
                          color: darkMode
                            ? 'rgba(156, 163, 175, 1)'
                            : 'rgba(107, 114, 128, 1)',
                        }}
                      >
                        Type
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ fontWeight: 500, fontSize: '12px' }}
                      >
                        {selectedModel.multimodal
                          ? 'Multimodal (Text + Image)'
                          : 'Text Only'}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    level="title-sm"
                    sx={{ mb: 1.5, fontSize: '12px', fontWeight: 500 }}
                  >
                    Description
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: '12px',
                      p: 2,
                      borderRadius: 'md',
                      backgroundColor: darkMode
                        ? 'rgba(31, 41, 55, 0.7)'
                        : 'rgba(243, 244, 246, 0.7)',
                      lineHeight: 1.5,
                    }}
                  >
                    {selectedModel.description}
                  </Typography>
                </>
              ) : (
                <Typography
                  level="body-sm"
                  sx={{
                    fontSize: '12px',
                    p: 4,
                    textAlign: 'center',
                    color: darkMode
                      ? 'rgba(156, 163, 175, 1)'
                      : 'rgba(107, 114, 128, 1)',
                  }}
                >
                  Select a model to see details.
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Sidebar;

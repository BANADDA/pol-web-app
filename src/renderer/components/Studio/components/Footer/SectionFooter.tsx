import { Box, Typography } from '@mui/joy';
import React from 'react';

interface SectionFooterProps {
  activeSection: string;
  darkMode: boolean;
}

const SectionFooter: React.FC<SectionFooterProps> = ({
  activeSection,
  darkMode,
}) => {
  const getFooterContent = () => {
    switch (activeSection) {
      case 'catalogue':
        return {
          icon: '🗂️',
          title: 'Model Catalogue by Polaris Cloud',
          subtitle: 'Browse and deploy AI models',
          version: 'v1.0.0',
        };
      case 'playground':
        return {
          icon: '🚀',
          title: 'AI Model Playground by Polaris Cloud',
          subtitle: 'Test and experiment with models',
          version: 'v1.0.0',
        };
      case 'readbuddy':
        return {
          icon: '📚',
          title: 'ReadBuddy by Polaris Cloud',
          subtitle: 'Document intelligence assistant',
          version: 'v1.0.0',
        };
      case 'deployments':
        return {
          icon: '🚢',
          title: 'Model Deployments by Polaris Cloud',
          subtitle: 'Manage production deployments',
          version: 'v1.0.0',
        };
      case 'system':
        return {
          icon: '⚙️',
          title: 'System Monitor by Polaris Cloud',
          subtitle: 'Hardware & runtime diagnostics',
          version: 'v1.0.0',
        };
      case 'agentmaker':
        return {
          icon: '🤖',
          title: 'Agent Maker by Polaris Cloud',
          subtitle: 'Create intelligent AI agents',
          version: 'v1.0.0',
        };
      case 'aiassistant':
        return {
          icon: '✨',
          title: 'AI Assistant by Polaris Cloud',
          subtitle: 'Personal productivity companion',
          version: 'v1.0.0',
        };
      case 'api':
        return {
          icon: '🔧',
          title: 'API Gateway by Polaris Cloud',
          subtitle: 'Developer tools & tokens',
          version: 'v1.0.0',
        };
      default:
        return {
          icon: '🌟',
          title: 'Polaris AI Studio',
          subtitle: 'Next-generation AI platform',
          version: 'v1.0.0',
        };
    }
  };

  const content = getFooterContent();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2.5,
        py: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.9)'
            : 'rgba(248, 250, 252, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Left side - Section info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '12px' }}>{content.icon}</Typography>
        <Box>
          <Typography
            level="body-sm"
            sx={{
              fontWeight: 600,
              fontSize: '10px',
              color: 'text.primary',
              lineHeight: 1.1,
            }}
          >
            {content.title}
          </Typography>
          <Typography
            level="body-xs"
            sx={{
              color: 'text.tertiary',
              fontSize: '8px',
              lineHeight: 1.1,
            }}
          >
            {content.subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Right side - Version */}
      <Box
        sx={{
          px: 1,
          py: 0.25,
          borderRadius: 'sm',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(124, 77, 255, 0.15)'
              : 'rgba(124, 77, 255, 0.08)',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(124, 77, 255, 0.3)'
              : 'rgba(124, 77, 255, 0.2)',
        }}
      >
        <Typography
          level="body-xs"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#c4b5fd' : '#7c3aed',
            fontSize: '8px',
            fontWeight: 600,
            fontFamily: 'monospace',
          }}
        >
          {content.version}
        </Typography>
      </Box>
    </Box>
  );
};

export default SectionFooter;

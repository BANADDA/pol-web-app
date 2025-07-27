import { Box, Button, Chip, Grid, Typography } from '@mui/joy';
import { BarChart3, Bot, Database } from 'lucide-react';
import React from 'react';
import BottomNavigation from './BottomNavigation';
import TopNavigation from './TopNavigation';

interface PolarisWelcomeProps {
  onGetStarted?: () => void;
  themeSetter?: (theme: string) => void;
}

const PolarisWelcome: React.FC<PolarisWelcomeProps> = ({
  onGetStarted = () => {},
  themeSetter = () => {},
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: { xs: 'auto', md: '100vh' }, // Auto height on mobile, fixed on larger screens
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        position: 'relative',
        overflow: { xs: 'visible', md: 'hidden' }, // Allow scroll on mobile
      }}
    >
      {/* Top Navigation */}
      <TopNavigation themeSetter={themeSetter} />

      {/* Content Wrapper - Responsive Layout */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: {
            xs: '2vh', // Very small padding on mobile
            sm: '3vh', // Small padding on small screens
            md: '4vh', // Medium padding on medium screens
            lg: '6vh', // Larger padding on large screens
            xl: '8vh', // Original padding on extra large screens
          },
          gap: {
            xs: 1, // Smaller gap on mobile
            sm: 1.5, // Small gap on small screens
            md: 2, // Original gap on medium+ screens
          },
          minHeight: 0, // Allow content to shrink
          overflow: 'auto', // Enable scrolling if needed
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            padding: {
              xs: '5px 15px', // Smaller padding on mobile
              sm: '8px 18px', // Small screens
              md: '10px 20px', // Original padding for medium+ screens
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.1) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(147, 51, 234, 0.1) 2px, transparent 0)'
                  : 'radial-gradient(circle at 25px 25px, rgba(124, 77, 255, 0.05) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(99, 102, 241, 0.05) 2px, transparent 0)',
              backgroundSize: '100px 100px',
              opacity: 0.6,
              pointerEvents: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '700px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Hero Section */}
            <Box
              sx={{
                padding: '8px 24px', // Reduced from 12px 24px
                maxWidth: '700px',
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <Typography
                level="h2"
                sx={{
                  fontSize: {
                    xs: '18px', // Smaller on mobile
                    sm: '20px', // Small screens
                    md: '22px', // Medium screens
                    lg: '24px', // Large screens
                  },
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: {
                    xs: 0.5, // Smaller margin on mobile
                    md: 0.8, // Original margin on medium+ screens
                  },
                  lineHeight: 1.1,
                }}
              >
                Build AI Applications with Polaris AI Studio
              </Typography>

              <Typography
                level="body-sm"
                sx={{
                  fontSize: {
                    xs: '12px', // Smaller on mobile
                    sm: '13px', // Small screens
                    md: '14px', // Medium+ screens
                  },
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#d1d5db' : '#374151',
                  mb: {
                    xs: 1, // Smaller margin on mobile
                    md: 1.5, // Original margin on medium+ screens
                  },
                  maxWidth: {
                    xs: '300px', // Smaller max width on mobile
                    sm: '400px', // Small screens
                    md: '600px', // Original max width on medium+ screens
                  },
                  margin: {
                    xs: '0 auto 8px', // Smaller margin on mobile
                    md: '0 auto 12px', // Original margin on medium+ screens
                  },
                  lineHeight: 1.4,
                }}
              >
                Your comprehensive platform for deploying, testing, and managing
                AI models. Select a model to get started, or browse our model
                catalog powered by PolarisLLM.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: {
                    xs: 0.3, // Smaller margin on mobile
                    md: 0.5, // Original margin on medium+ screens
                  },
                }}
              >
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(90deg, #6366f1, #9333ea)'
                        : 'linear-gradient(90deg, #7c4dff, #6366f1)',
                    color: 'white',
                    fontSize: {
                      xs: '13px', // Smaller font on mobile
                      sm: '14px', // Small screens
                      md: '15px', // Original size on medium+ screens
                    },
                    fontWeight: 600,
                    padding: {
                      xs: '8px 16px', // Smaller padding on mobile
                      sm: '10px 20px', // Small screens
                      md: '12px 24px', // Original padding on medium+ screens
                    },
                    borderRadius: '8px', // Increased from 6px
                    border: 'none',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 4px 15px rgba(99, 102, 241, 0.3)'
                        : '0 4px 15px rgba(124, 77, 255, 0.25)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px', // Increased back to 8px for better spacing
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 8px 25px rgba(99, 102, 241, 0.4)'
                          : '0 8px 25px rgba(124, 77, 255, 0.35)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '20px',
                      height: '20px',
                      background: `url("data:image/svg+xml,${encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="1"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>',
                      )}") center center/contain no-repeat`,
                      animation: 'mouseClick 3s ease-in-out infinite',
                      zIndex: 10,
                      pointerEvents: 'none',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                    },
                    '@keyframes mouseClick': {
                      '0%': {
                        transform:
                          'translate(-50%, -50%) translateY(-40px) translateX(-40px) scale(1)',
                        opacity: 0,
                      },
                      '20%': {
                        transform:
                          'translate(-50%, -50%) translateY(-20px) translateX(-20px) scale(1)',
                        opacity: 1,
                      },
                      '40%': {
                        transform:
                          'translate(-50%, -50%) translateY(0px) translateX(0px) scale(1.1)',
                        opacity: 1,
                      },
                      '50%': {
                        transform:
                          'translate(-50%, -50%) translateY(2px) translateX(0px) scale(0.9)',
                        opacity: 1,
                      },
                      '60%': {
                        transform:
                          'translate(-50%, -50%) translateY(0px) translateX(0px) scale(1)',
                        opacity: 1,
                      },
                      '80%': {
                        transform:
                          'translate(-50%, -50%) translateY(-20px) translateX(20px) scale(1)',
                        opacity: 1,
                      },
                      '100%': {
                        transform:
                          'translate(-50%, -50%) translateY(-40px) translateX(40px) scale(1)',
                        opacity: 0,
                      },
                    },
                  }}
                >
                  Click to Open Polaris AI Studio
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Features Section - Controlled height */}
        <Box
          sx={{
            flex: '0 0 auto', // Changed from 1 1 auto to fixed height
            height: 'fit-content', // Use only the space needed for content
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.2)'
                : 'rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
            padding: '2px 4px 2px', // Reduced from 6px to 2px
            borderTop: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Changed from center to flex-start
          }}
        >
          <Box
            sx={{
              maxWidth: {
                xs: '100%', // Full width on mobile
                sm: '600px', // Smaller on small screens
                md: '900px', // Original max width on medium+ screens
              },
              margin: '0 auto',
              py: {
                xs: 0.3, // Smaller padding on mobile
                md: 0.5, // Original padding on medium+ screens
              },
              px: {
                xs: 2, // Add horizontal padding on mobile
                md: 0, // No horizontal padding on medium+ screens
              },
            }}
          >
            <Typography
              level="h3"
              sx={{
                fontSize: {
                  xs: '16px', // Smaller on mobile
                  sm: '17px', // Small screens
                  md: '18px', // Original size on medium+ screens
                },
                fontWeight: 600,
                color: 'text.primary',
                mb: {
                  xs: 0.3, // Smaller margin on mobile
                  md: 0.5, // Original margin on medium+ screens
                },
                textAlign: 'center',
              }}
            >
              AI Development Features
            </Typography>

            <Typography
              level="body-sm"
              sx={{
                fontSize: {
                  xs: '11px', // Smaller on mobile
                  sm: '12px', // Small screens
                  md: '13px', // Original size on medium+ screens
                },
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#d1d5db' : '#374151',
                mb: {
                  xs: 0.6, // Smaller margin on mobile
                  md: 1, // Original margin on medium+ screens
                },
                textAlign: 'center',
                maxWidth: {
                  xs: '280px', // Smaller max width on mobile
                  sm: '400px', // Small screens
                  md: '600px', // Original max width on medium+ screens
                },
                margin: {
                  xs: '0 auto 6px', // Smaller margin on mobile
                  md: '0 auto 8px', // Original margin on medium+ screens
                },
              }}
            >
              Powerful tools for building, deploying, and managing AI
              applications powered by PolarisLLM
            </Typography>

            <Grid
              container
              spacing={{
                xs: 0.3, // Smaller spacing on mobile
                sm: 0.4, // Small screens
                md: 0.5, // Original spacing on medium+ screens
              }}
            >
              <Grid xs={12} md={4}>
                <Box
                  sx={{
                    borderRadius: '12px', // Modern rounded corners
                    position: 'relative',
                    height: '140px',
                    minHeight: 'unset',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(45, 45, 48, 0.95)'
                        : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                    // Gradient border effect using pseudo-element
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      padding: '2px',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)'
                          : 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                      borderRadius: '12px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: -1,
                    },

                    // Base shadow
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',

                    // Hover effects
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 8px 32px rgba(99, 102, 241, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                          : '0 8px 32px rgba(99, 102, 241, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(55, 55, 58, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',

                      // Enhanced gradient border on hover
                      '&::before': {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #7c3aed, #a855f7, #f472b6)'
                            : 'linear-gradient(135deg, #7c3aed, #a855f7, #f472b6)',
                        filter: 'saturate(1.2) brightness(1.1)',
                      },
                    },

                    // Active state
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                >
                  {/* Animated Top Section */}
                  <Box
                    sx={{
                      height: '55px', // Increased from 50px
                      background: '#6366f1',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '200%',
                        height: '100%',
                        background:
                          'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                        animation: 'wave 4s linear infinite',
                        transform: 'translateX(-100%)',
                      },
                      '@keyframes wave': {
                        '0%': {
                          transform: 'translateX(-100%) translateY(0)',
                        },
                        '100%': {
                          transform: 'translateX(100%) translateY(0)',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        padding: '10px 12px', // Reduced from 12px 16px
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24, // Reduced from 28
                          height: 24, // Reduced from 28
                          borderRadius: '5px', // Reduced from 6px
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5, // Reduced from 2
                        }}
                      >
                        <Bot size={14} color="white" /> {/* Reduced from 16 */}
                      </Box>
                      <Typography
                        level="body-md"
                        sx={{
                          fontSize: '15px', // Increased from 13px
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        Visual AI Builder
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content Section */}
                  <Box sx={{ padding: '12px', flex: 1, position: 'relative' }}>
                    {/* Colored indicator circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#6366f1',
                        boxShadow: '0 0 8px rgba(99, 102, 241, 0.4)',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '12px',
                        mb: 1.5,
                        lineHeight: 1.4,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#f8f9fa' : '#374151',
                        fontWeight: 500,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Build intelligent AI applications with drag-and-drop
                      interface. No code required.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
                      {' '}
                      {/* Reduced gap from 0.5 */}
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(99, 102, 241, 0.15)'
                              : 'rgba(99, 102, 241, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#a5b4fc'
                              : '#4f46e5',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(99, 102, 241, 0.25)'
                              : '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(99, 102, 241, 0.2)'
                                : 'rgba(99, 102, 241, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Drag & Drop
                      </Chip>
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(99, 102, 241, 0.15)'
                              : 'rgba(99, 102, 241, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#a5b4fc'
                              : '#4f46e5',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(99, 102, 241, 0.25)'
                              : '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(99, 102, 241, 0.2)'
                                : 'rgba(99, 102, 241, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        No Code
                      </Chip>
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(99, 102, 241, 0.15)'
                              : 'rgba(99, 102, 241, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#a5b4fc'
                              : '#4f46e5',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(99, 102, 241, 0.25)'
                              : '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(99, 102, 241, 0.2)'
                                : 'rgba(99, 102, 241, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Templates
                      </Chip>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Box
                  sx={{
                    borderRadius: '12px',
                    position: 'relative',
                    height: '140px',
                    minHeight: 'unset',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(45, 45, 48, 0.95)'
                        : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                    // Gradient border effect
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      padding: '2px',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)'
                          : 'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
                      borderRadius: '12px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: -1,
                    },

                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',

                    // Hover effects
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 8px 32px rgba(139, 92, 246, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                          : '0 8px 32px rgba(139, 92, 246, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(55, 55, 58, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',

                      '&::before': {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #a855f7, #f472b6, #fbbf24)'
                            : 'linear-gradient(135deg, #a855f7, #f472b6, #fbbf24)',
                        filter: 'saturate(1.2) brightness(1.1)',
                      },
                    },

                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                >
                  {/* Animated Top Section */}
                  <Box
                    sx={{
                      height: '55px',
                      background: '#9333ea',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        background:
                          'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                        animation: 'pulse 3s ease-in-out infinite',
                        transform: 'scale(0)',
                        transformOrigin: 'center',
                      },
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(0)', opacity: 1 },
                        '50%': { transform: 'scale(1)', opacity: 0.7 },
                        '100%': { transform: 'scale(1.5)', opacity: 0 },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        padding: '10px 12px', // Reduced from 12px 16px
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24, // Reduced from 28
                          height: 24, // Reduced from 28
                          borderRadius: '5px', // Reduced from 6px
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5, // Reduced from 2
                        }}
                      >
                        <Database size={14} color="white" />{' '}
                        {/* Reduced from 16 */}
                      </Box>
                      <Typography
                        level="body-md"
                        sx={{
                          fontSize: '15px', // Match first card
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        Model Deployment Hub
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content Section */}
                  <Box sx={{ padding: '12px', flex: 1, position: 'relative' }}>
                    {/* Colored indicator circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#8b5cf6',
                        boxShadow: '0 0 8px rgba(139, 92, 246, 0.4)',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '12px',
                        mb: 1.5,
                        lineHeight: 1.4,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#f8f9fa' : '#374151',
                        fontWeight: 500,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Deploy and test AI models with advanced inference
                      management powered by PolarisLLM.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
                      {' '}
                      {/* Reduced gap from 0.5 */}
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(147, 51, 234, 0.15)'
                              : 'rgba(147, 51, 234, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#c4b5fd'
                              : '#7c3aed',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(147, 51, 234, 0.25)'
                              : '1px solid rgba(147, 51, 234, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(147, 51, 234, 0.2)'
                                : 'rgba(147, 51, 234, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Deployment
                      </Chip>
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(147, 51, 234, 0.15)'
                              : 'rgba(147, 51, 234, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#c4b5fd'
                              : '#7c3aed',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(147, 51, 234, 0.25)'
                              : '1px solid rgba(147, 51, 234, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(147, 51, 234, 0.2)'
                                : 'rgba(147, 51, 234, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Testing
                      </Chip>
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(147, 51, 234, 0.15)'
                              : 'rgba(147, 51, 234, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#c4b5fd'
                              : '#7c3aed',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(147, 51, 234, 0.25)'
                              : '1px solid rgba(147, 51, 234, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(147, 51, 234, 0.2)'
                                : 'rgba(147, 51, 234, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Inference
                      </Chip>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Box
                  sx={{
                    borderRadius: '12px',
                    position: 'relative',
                    height: '140px',
                    minHeight: 'unset',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(45, 45, 48, 0.95)'
                        : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                    // Gradient border effect
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      padding: '2px',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #ec4899, #10b981, #6366f1)'
                          : 'linear-gradient(135deg, #ec4899, #10b981, #6366f1)',
                      borderRadius: '12px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: -1,
                    },

                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',

                    // Hover effects
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 8px 32px rgba(236, 72, 153, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.4)'
                          : '0 8px 32px rgba(236, 72, 153, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(55, 55, 58, 0.95)'
                          : 'rgba(255, 255, 255, 0.95)',

                      '&::before': {
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #f472b6, #34d399, #7c3aed)'
                            : 'linear-gradient(135deg, #f472b6, #34d399, #7c3aed)',
                        filter: 'saturate(1.2) brightness(1.1)',
                      },
                    },

                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                >
                  {/* Animated Top Section */}
                  <Box
                    sx={{
                      height: '55px',
                      background: '#ec4899',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '200%',
                        height: '100%',
                        background:
                          'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                        animation: 'wave 4s linear infinite',
                        transform: 'translateX(-100%)',
                      },
                      '@keyframes wave': {
                        '0%': {
                          transform: 'translateX(-100%) translateY(0)',
                        },
                        '100%': {
                          transform: 'translateX(100%) translateY(0)',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        padding: '10px 12px', // Reduced from 12px 16px
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24, // Reduced from 28
                          height: 24, // Reduced from 28
                          borderRadius: '5px', // Reduced from 6px
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 1.5, // Reduced from 2
                        }}
                      >
                        <BarChart3 size={14} color="white" />{' '}
                        {/* Reduced from 16 */}
                      </Box>
                      <Typography
                        level="body-md"
                        sx={{
                          fontSize: '15px', // Match first card
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        Model Catalog & Testing
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content Section */}
                  <Box sx={{ padding: '12px', flex: 1, position: 'relative' }}>
                    {/* Colored indicator circle */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '12px',
                        mb: 1.5,
                        lineHeight: 1.4,
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#f8f9fa' : '#374151',
                        fontWeight: 500,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Browse our comprehensive model catalog and get started
                      with AI projects.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
                      {' '}
                      {/* Reduced gap from 0.5 */}
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(236, 72, 153, 0.15)'
                              : 'rgba(236, 72, 153, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#f9a8d4'
                              : '#db2777',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(236, 72, 153, 0.25)'
                              : '1px solid rgba(236, 72, 153, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(236, 72, 153, 0.2)'
                                : 'rgba(236, 72, 153, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Model Catalog
                      </Chip>
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(236, 72, 153, 0.15)'
                              : 'rgba(236, 72, 153, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#f9a8d4'
                              : '#db2777',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(236, 72, 153, 0.25)'
                              : '1px solid rgba(236, 72, 153, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(236, 72, 153, 0.2)'
                                : 'rgba(236, 72, 153, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Browse Models
                      </Chip>
                      <Chip
                        size="sm"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(236, 72, 153, 0.15)'
                              : 'rgba(236, 72, 153, 0.08)',
                          color: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '#f9a8d4'
                              : '#db2777',
                          fontSize: '10px',
                          fontWeight: 500,
                          height: '22px',
                          border: (theme) =>
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(236, 72, 153, 0.25)'
                              : '1px solid rgba(236, 72, 153, 0.2)',
                          borderRadius: '6px',
                          boxShadow: (theme) =>
                            theme.palette.mode === 'dark'
                              ? 'none'
                              : '0 1px 2px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(236, 72, 153, 0.2)'
                                : 'rgba(236, 72, 153, 0.12)',
                            transform: 'translateY(-0.5px)',
                          },
                        }}
                      >
                        Get Started
                      </Chip>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Compute Provider Section */}
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(0, 0, 0, 0.15)'
                : 'rgba(0, 0, 0, 0.03)',
            backdropFilter: 'blur(10px)',
            padding: '12px 20px 8px', // Reduced from 20px 20px 16px to 12px 20px 8px
            borderTop: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box
            sx={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
          >
            {/* Section Title */}
            <Typography
              level="h3"
              sx={{
                fontSize: {
                  xs: '16px', // Smaller on mobile
                  sm: '18px', // Small screens
                  md: '20px', // Original size on medium+ screens
                },
                fontWeight: 600,
                color: 'text.primary',
                mb: {
                  xs: 0.6, // Smaller margin on mobile
                  md: 1, // Original margin on medium+ screens
                },
              }}
            >
              Join the Polaris Compute Network
            </Typography>

            <Typography
              level="body-sm"
              sx={{
                fontSize: {
                  xs: '12px', // Smaller on mobile
                  sm: '13px', // Small screens
                  md: '14px', // Original size on medium+ screens
                },
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#d1d5db' : '#374151',
                mb: {
                  xs: 1.2, // Smaller margin on mobile
                  md: 2, // Original margin on medium+ screens
                },
                maxWidth: {
                  xs: '280px', // Smaller max width on mobile
                  sm: '400px', // Small screens
                  md: '540px', // Original max width on medium+ screens
                },
                margin: {
                  xs: '0 auto 10px', // Smaller margin on mobile
                  md: '0 auto 16px', // Original margin on medium+ screens
                },
                lineHeight: 1.4,
                px: {
                  xs: 2, // Add horizontal padding on mobile
                  md: 0, // No horizontal padding on medium+ screens
                },
              }}
            >
              Provide your GPU resources to the Polaris network and earn rewards
              by becoming a compute provider in our decentralized AI
              infrastructure.
            </Typography>

            {/* Call to Action Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {' '}
              {/* Reduced from mb: 3 */}
              <Button
                size="md"
                sx={{
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(90deg, #9333ea, #7c3aed)'
                      : 'linear-gradient(90deg, #7c3aed, #9333ea)',
                  color: 'white',
                  fontSize: '12px', // Increased from 10px
                  fontWeight: 600,
                  padding: '8px 16px', // Increased from 5px 12px
                  borderRadius: '5px',
                  border: 'none',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 3px 12px rgba(147, 51, 234, 0.3)'
                      : '0 3px 12px rgba(124, 58, 237, 0.25)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'dark'
                        ? '0 6px 20px rgba(147, 51, 234, 0.4)'
                        : '0 6px 20px rgba(124, 58, 237, 0.35)',
                  },
                }}
              >
                Register as Compute Provider
              </Button>
            </Box>

            {/* Provider Options Cards */}
            <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
              <Grid xs={12} sm={4}>
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '8px',
                    padding: '6px', // Increased from 4px
                    height: '50px', // Increased from 45px
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(99, 102, 241, 0.08)'
                          : 'rgba(99, 102, 241, 0.05)',
                    },
                  }}
                >
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: '13px', // Increased from 11px
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 0.3, // Reduced from 0.5
                    }}
                  >
                    GPU Mining
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontSize: '11px', // Increased from 9px
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    Contribute GPU power and earn POLARIS tokens
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={4}>
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '8px',
                    padding: '4px', // Reduced from 8px
                    height: '45px', // Reduced from 60px
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(147, 51, 234, 0.08)'
                          : 'rgba(147, 51, 234, 0.05)',
                    },
                  }}
                >
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: '13px', // Increased to match first card
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 0.3, // Reduced from 0.5
                    }}
                  >
                    Node Hosting
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontSize: '11px', // Increased to match first card
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    Host inference nodes and serve AI models
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={4}>
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid',
                    borderColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.08)',
                    borderRadius: '8px',
                    padding: '4px', // Reduced from 8px
                    height: '45px', // Reduced from 60px
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(236, 72, 153, 0.08)'
                          : 'rgba(236, 72, 153, 0.05)',
                    },
                  }}
                >
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: '13px', // Increased to match other cards
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 0.3, // Reduced from 0.5
                    }}
                  >
                    Validator Network
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontSize: '11px', // Increased to match other cards
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    Validate network operations and earn rewards
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </Box>
  );
};

export default PolarisWelcome;

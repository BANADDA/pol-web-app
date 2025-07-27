import { Box, Button, Chip, Link, Tooltip, Typography } from '@mui/joy';
import {
  Cpu,
  Download,
  ExternalLink,
  Globe,
  HardDrive,
  Heart,
  HelpCircle,
  Monitor,
  Zap,
} from 'lucide-react';
import React from 'react';
import type { ModelDetailsProps } from '../types/model';

const ModelDetails: React.FC<ModelDetailsProps> = ({ model, onDownload }) => {
  if (!model) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography level="h4" sx={{ mb: 2, color: 'text.secondary' }}>
          Select a Model
        </Typography>
        <Typography sx={{ color: 'text.tertiary' }}>
          Choose a model from the list to view its details and specifications.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Fixed Header Section */}
      <Box
        sx={{
          p: 2,
          pt: 1.5,
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.body',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Model Name with Badges and HF Link */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            mb: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              level="h3"
              sx={{ fontWeight: 600, fontSize: '18px', lineHeight: 1.2 }}
            >
              {model.name}
            </Typography>
            <Chip
              variant="solid"
              color="primary"
              size="sm"
              sx={{
                fontSize: '10px',
                fontWeight: 600,
                px: 1,
                py: 0.25,
                textTransform: 'uppercase',
              }}
            >
              GGUF
            </Chip>
            <Tooltip
              title="GGUF is a file format for storing models for inference with GGML and executors based on GGML. It's designed for fast loading and saving."
              placement="bottom"
              variant="soft"
            >
              <HelpCircle
                size={12}
                style={{
                  color: 'var(--joy-palette-text-tertiary)',
                  cursor: 'help',
                  marginLeft: '4px',
                }}
              />
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link
              href={`https://huggingface.co/${model.author}/${model.name.replace(/\s+/g, '-')}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.500',
                },
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginRight: 4 }}
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a10 10 0 110 20 10 10 0 010-20zm-1 5v6l5-3-5-3z" />
              </svg>
              Hugging Face
              <ExternalLink size={12} />
            </Link>
            {model.comingSoon && (
              <Chip
                color="warning"
                variant="soft"
                sx={{ fontWeight: 600, fontSize: '11px' }}
              >
                Coming Soon
              </Chip>
            )}
          </Box>
        </Box>

        {/* Description */}
        <Typography
          sx={{
            mb: 2,
            lineHeight: 1.4,
            color: 'text.primary',
            fontSize: '13px',
          }}
        >
          {model.description}
        </Typography>

        {/* Stats Row - Exact HF Layout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
          {/* Architecture */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              level="body-xs"
              sx={{
                color: 'text.secondary',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              Architecture:
            </Typography>
            <Chip
              variant="outlined"
              size="sm"
              sx={{
                fontSize: '10px',
                px: 0.75,
                py: 0.25,
                borderColor: 'neutral.400',
                color: 'text.primary',
              }}
            >
              {model.compatibility.architecture}
            </Chip>
          </Box>

          {/* Params */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              level="body-xs"
              sx={{
                color: 'text.secondary',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              Params:
            </Typography>
            <Chip
              variant="outlined"
              size="sm"
              sx={{
                fontSize: '10px',
                px: 0.75,
                py: 0.25,
                borderColor: 'neutral.400',
                color: 'text.primary',
              }}
            >
              {model.technicalDetails.parameters}
            </Chip>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              level="body-xs"
              sx={{
                color: 'text.secondary',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              Stats:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <Heart size={12} />
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {model.stats.likes}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                <Download size={12} />
                <Typography
                  level="body-xs"
                  sx={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {model.stats.downloads}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Last Updated */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              level="body-xs"
              sx={{
                color: 'text.secondary',
                fontSize: '11px',
                fontWeight: 500,
              }}
            >
              Last updated:
            </Typography>
            <Typography
              level="body-xs"
              sx={{ fontSize: '12px', color: 'text.primary' }}
            >
              {model.stats.lastUpdated}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 1.5, // Reduced from 3
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'neutral.300',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'neutral.400',
          },
        }}
      >
        {/* Technical Details - Clean Table */}
        <Box sx={{ mb: 2 }}>
          <Typography
            level="title-md"
            sx={{
              mb: 1.5,
              fontWeight: 600,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Cpu size={16} />
            Technical Details
            <Tooltip
              title="Key specifications including model parameters, precision, memory requirements, and context window size for understanding model capabilities and hardware needs."
              placement="right"
              variant="soft"
            >
              <HelpCircle
                size={12}
                style={{
                  color: 'var(--joy-palette-text-tertiary)',
                  cursor: 'help',
                }}
              />
            </Tooltip>
          </Typography>

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 'sm',
              overflow: 'hidden',
              width: 'fit-content',
            }}
          >
            {/* Table Header */}
            <Box
              sx={{
                display: 'flex',
                backgroundColor: 'background.level1',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '100px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontWeight: 600, fontSize: '12px' }}
                >
                  Parameters
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '80px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontWeight: 600, fontSize: '12px' }}
                >
                  Precision
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '110px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography
                    level="body-sm"
                    sx={{ fontWeight: 600, fontSize: '12px' }}
                  >
                    Context Window
                  </Typography>
                  <Tooltip
                    title="The maximum number of tokens the model can process at once. Larger context windows allow for longer conversations and documents."
                    placement="top"
                    variant="soft"
                  >
                    <HelpCircle
                      size={10}
                      style={{
                        color: 'var(--joy-palette-text-tertiary)',
                        cursor: 'help',
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '90px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontWeight: 600, fontSize: '12px' }}
                >
                  Model Size
                </Typography>
              </Box>
              {model.technicalDetails.minVram && (
                <Box sx={{ px: 2, py: 1.5, minWidth: '85px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      level="body-sm"
                      sx={{ fontWeight: 600, fontSize: '12px' }}
                    >
                      Min VRAM
                    </Typography>
                    <Tooltip
                      title="Minimum Video RAM (GPU memory) required to run this model efficiently. Higher VRAM allows for faster inference and larger batch sizes."
                      placement="top"
                      variant="soft"
                    >
                      <HelpCircle
                        size={10}
                        style={{
                          color: 'var(--joy-palette-text-tertiary)',
                          cursor: 'help',
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Table Data Row */}
            <Box
              sx={{
                display: 'flex',
                '&:hover': {
                  backgroundColor: 'background.level1',
                },
              }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '100px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {model.technicalDetails.parameters}
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '80px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {model.technicalDetails.precision}
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '110px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {model.technicalDetails.contextWindow}
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  minWidth: '90px',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{ fontSize: '12px', fontWeight: 500 }}
                >
                  {model.stats.size}
                </Typography>
              </Box>
              {model.technicalDetails.minVram && (
                <Box sx={{ px: 2, py: 1.5, minWidth: '85px' }}>
                  <Typography
                    level="body-sm"
                    sx={{ fontSize: '12px', fontWeight: 500 }}
                  >
                    {model.technicalDetails.minVram}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Requirements and Capabilities - Side by Side */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {/* System Requirements */}
          <Box sx={{ flex: 1 }}>
            <Typography
              level="title-md"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <HardDrive size={16} />
              Requirements
              <Tooltip
                title="Hardware and software requirements needed to run this model, including GPU specifications and supported frameworks."
                placement="right"
                variant="soft"
              >
                <HelpCircle
                  size={12}
                  style={{
                    color: 'var(--joy-palette-text-tertiary)',
                    cursor: 'help',
                  }}
                />
              </Tooltip>
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  GPU Required:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {model.technicalDetails.requiresGpu ? (
                    <Zap size={12} color="#f59e0b" />
                  ) : (
                    <Monitor size={12} color="#10b981" />
                  )}
                  <Typography
                    level="body-sm"
                    sx={{ fontWeight: 600, fontSize: '12px' }}
                  >
                    {model.technicalDetails.requiresGpu ? 'Yes' : 'No'}
                  </Typography>
                </Box>
              </Box>

              {model.technicalDetails.requiresGpu && (
                <>
                  {/* Minimum VRAM */}
                  {model.technicalDetails.minVram && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}
                      >
                        Minimum VRAM:
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{
                          fontWeight: 600,
                          fontSize: '12px',
                          color: '#f59e0b',
                        }}
                      >
                        {model.technicalDetails.minVram}
                      </Typography>
                    </Box>
                  )}

                  {/* Recommended GPUs */}
                  <Box>
                    <Typography
                      level="body-sm"
                      sx={{
                        color: 'text.secondary',
                        mb: 0.75,
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        Recommended GPUs:
                        <Tooltip
                          title="GPUs with sufficient VRAM and performance for optimal model inference. Green chips indicate consumer-grade options, blue chips are professional/server-grade."
                          placement="top"
                          variant="soft"
                        >
                          <HelpCircle
                            size={10}
                            style={{
                              color: 'var(--joy-palette-text-tertiary)',
                              cursor: 'help',
                            }}
                          />
                        </Tooltip>
                      </Box>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {model.technicalDetails.minVram === '24GB' && (
                        <>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="success"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            RTX 4090
                          </Chip>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="success"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            RTX A6000
                          </Chip>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="primary"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            H100
                          </Chip>
                        </>
                      )}
                      {model.technicalDetails.minVram === '16GB' && (
                        <>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="success"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            RTX 4080
                          </Chip>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="success"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            RTX 4090
                          </Chip>
                        </>
                      )}
                      {model.technicalDetails.minVram === '8GB' && (
                        <>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="success"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            RTX 4070
                          </Chip>
                          <Chip
                            size="sm"
                            variant="soft"
                            color="success"
                            sx={{
                              fontSize: '10px',
                              fontWeight: 500,
                              px: 1,
                              py: 0.25,
                            }}
                          >
                            RTX 4080
                          </Chip>
                        </>
                      )}
                    </Box>
                  </Box>

                  {/* Performance Note */}
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: 'warning.50',
                      borderRadius: 'sm',
                      border: '1px solid',
                      borderColor: 'warning.200',
                    }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        fontSize: '11px',
                        color: 'warning.800',
                        fontWeight: 500,
                      }}
                    >
                      💡 Lower VRAM GPUs may work with quantized versions at
                      reduced performance
                    </Typography>
                  </Box>
                </>
              )}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  level="body-sm"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  Architecture:
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    textTransform: 'lowercase',
                  }}
                >
                  {model.compatibility.architecture}
                </Typography>
              </Box>

              <Box>
                <Typography
                  level="body-sm"
                  sx={{
                    color: 'text.secondary',
                    mb: 1,
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  Frameworks:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.1 }}>
                  {model.compatibility.framework.map((fw) => (
                    <Chip
                      key={fw}
                      size="sm"
                      variant="soft"
                      sx={{
                        fontSize: '10px',
                        fontWeight: 500,
                        px: 1,
                        py: 0.25,
                      }}
                    >
                      {fw}
                    </Chip>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Capabilities */}
          <Box sx={{ flex: 1 }}>
            <Typography
              level="title-md"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Zap size={16} />
              Capabilities
              <Tooltip
                title="Capabilities of the model, such as its language, intended use, and any specific features it provides."
                placement="right"
                variant="soft"
              >
                <HelpCircle
                  size={12}
                  style={{
                    color: 'var(--joy-palette-text-tertiary)',
                    cursor: 'help',
                  }}
                />
              </Tooltip>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {model.technicalDetails.capabilities.map((capability) => (
                <Chip
                  key={capability}
                  variant="soft"
                  color="primary"
                  size="sm"
                  sx={{
                    fontSize: '11px',
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.5,
                  }}
                >
                  {capability}
                </Chip>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Languages and Tags - Side by Side */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              level="title-md"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Globe size={16} />
              Languages
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {model.technicalDetails.languages.map((language) => (
                <Chip
                  key={language}
                  variant="outlined"
                  size="sm"
                  sx={{
                    fontSize: '11px',
                    fontWeight: 500,
                    px: 1.25,
                    py: 0.5,
                  }}
                >
                  {language}
                </Chip>
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              level="title-md"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                fontSize: '15px',
              }}
            >
              Tags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {model.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="outlined"
                  size="sm"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 500,
                    px: 1,
                    py: 0.25,
                    color: 'text.secondary',
                  }}
                >
                  {tag}
                </Chip>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fixed Download Section - Similar to Header */}
      <Box
        sx={{
          px: 2,
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.body',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Button
          startDecorator={<Download size={14} />}
          onClick={() => onDownload(model)}
          disabled={!model.available || model.deployed}
          size="sm"
          sx={{
            fontSize: '11px',
            fontWeight: 600,
            minWidth: 120,
            ...(model.deployed && {
              backgroundColor: 'success.100',
              color: 'success.700',
              borderColor: 'success.300',
              '&:hover': {
                backgroundColor: 'success.100',
              },
            }),
            '&:disabled': {
              backgroundColor: model.deployed ? 'success.100' : 'neutral.200',
              color: model.deployed ? 'success.700' : 'neutral.500',
              borderColor: model.deployed ? 'success.300' : 'transparent',
            },
          }}
        >
          {model.deployed ? 'Already Deployed' : `Download ${model.stats.size}`}
        </Button>
      </Box>
    </Box>
  );
};

export default ModelDetails;

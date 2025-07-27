import { Box, Button, Card, Chip, Link, Typography } from '@mui/joy';
import { ChevronDown, ExternalLink } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import type { ModelSelectorProps } from '../../types';
import ModelIcon from '../UI/ModelIcon';

const ModelSelector: React.FC<ModelSelectorProps> = ({
  label,
  models,
  selectedModel,
  onModelSelect,
  onModelDeploy,
  showDropdown,
  setShowDropdown,
  buttonStyle = '',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown, setShowDropdown]);

  return (
    <Box sx={{ position: 'relative' }} ref={dropdownRef}>
      {/* Selector Button */}
      <Button
        variant="outlined"
        onClick={() => setShowDropdown(!showDropdown)}
        startDecorator={
          <ModelIcon
            type={selectedModel?.iconType}
            multimodal={selectedModel?.multimodal}
            className="w-4 h-4"
          />
        }
        endDecorator={
          <ChevronDown
            size={14}
            style={{
              transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        }
        sx={{
          minWidth: 120,
          justifyContent: 'space-between',
          fontSize: '13px',
          fontWeight: 500,
          textTransform: 'none',
          ...buttonStyle,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography level="body-xs" sx={{ fontSize: '10px', opacity: 0.8 }}>
            {label}:
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
            {selectedModel?.name || 'Select'}
          </Typography>
        </Box>
      </Button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <Card
          variant="outlined"
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            mt: 0.5,
            width: 320,
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: 'lg',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography level="title-sm" sx={{ fontWeight: 600 }}>
              Select {label} Model
            </Typography>
          </Box>

          {/* Model List */}
          <Box>
            {models.map((model) => (
              <Box
                key={model.id}
                onClick={() => {
                  if (model.deployed && model.id !== selectedModel?.id) {
                    onModelSelect(model);
                  } else if (!model.deployed) {
                    onModelDeploy(model);
                  }
                }}
                sx={{
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  opacity: model.deployed ? 1 : 0.7,
                  backgroundColor:
                    model.id === selectedModel?.id
                      ? 'primary.50'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      model.id === selectedModel?.id
                        ? 'primary.100'
                        : 'neutral.50',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  {/* Model Icon */}
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 'sm',
                      backgroundColor: 'neutral.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ModelIcon
                      type={model.iconType}
                      multimodal={model.multimodal}
                      className="w-4 h-4"
                    />
                  </Box>

                  {/* Model Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        level="title-sm"
                        sx={{ fontWeight: 600, fontSize: '13px' }}
                      >
                        {model.name}
                      </Typography>
                      <Chip
                        size="sm"
                        variant="soft"
                        sx={{ fontSize: '9px', py: 0.25, px: 0.75 }}
                      >
                        {model.parameters}
                      </Chip>
                      {model.multimodal && (
                        <Chip
                          size="sm"
                          color="warning"
                          variant="soft"
                          sx={{ fontSize: '9px', py: 0.25, px: 0.75 }}
                        >
                          Image
                        </Chip>
                      )}
                    </Box>
                    <Typography
                      level="body-xs"
                      sx={{ color: 'text.secondary', fontSize: '11px', mb: 1 }}
                    >
                      {model.description}
                    </Typography>
                  </Box>

                  {/* Action Button */}
                  <Button
                    size="sm"
                    variant={
                      model.id === selectedModel?.id && model.deployed
                        ? 'soft'
                        : model.deployed
                          ? 'solid'
                          : 'outlined'
                    }
                    color={
                      model.id === selectedModel?.id && model.deployed
                        ? 'neutral'
                        : model.deployed
                          ? 'primary'
                          : 'primary'
                    }
                    disabled={model.id === selectedModel?.id && model.deployed}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (model.deployed && model.id !== selectedModel?.id) {
                        onModelSelect(model);
                      } else if (!model.deployed) {
                        onModelDeploy(model);
                      }
                    }}
                    sx={{ fontSize: '10px', minWidth: 60 }}
                  >
                    {model.id === selectedModel?.id && model.deployed
                      ? 'Selected'
                      : model.deployed
                        ? 'Select'
                        : 'Deploy'}
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Footer */}
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Link
              level="body-xs"
              onClick={() => {
                // Navigate to model catalog
                setShowDropdown(false);
              }}
              sx={{ fontSize: '10px' }}
            >
              Browse full model catalog <ExternalLink size={10} />
            </Link>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ModelSelector;

import { Box, Divider, Input, Option, Select, Typography } from '@mui/joy';
import { Search } from 'lucide-react';
import React from 'react';
import { modelFamilies } from '../data/models';
import type { ModelListProps } from '../types/model';
import ModelCard from './ModelCard';

const ModelList: React.FC<ModelListProps> = ({
  models,
  selectedModelId,
  onModelSelect,
  searchTerm,
  selectedFamily,
  onSearchChange,
  onFamilyChange,
}) => {
  return (
    <Box
      sx={{
        width: 380,
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Compact Header */}
      <Box sx={{ p: 2, pb: 0.5 }}>
        {/* Search */}
        <Input
          placeholder="Search models"
          startDecorator={<Search size={16} />}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="sm"
          sx={{
            mb: 1.5,
            '& input': {
              fontSize: '13px',
            },
          }}
        />

        {/* Family Filter */}
        <Select
          value={selectedFamily || 'All Models'}
          onChange={(_, value) => onFamilyChange(value as string)}
          size="sm"
          sx={{
            mb: 1,
            '& .MuiSelect-button': {
              fontSize: '13px',
            },
          }}
        >
          {modelFamilies.map((family) => (
            <Option key={family} value={family}>
              {family}
            </Option>
          ))}
        </Select>
      </Box>

      <Divider />

      {/* Model List */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 1.5,
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
        {models.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              textAlign: 'center',
            }}
          >
            <Typography
              level="body-sm"
              sx={{ color: 'text.secondary', fontSize: '13px' }}
            >
              No models found
            </Typography>
            <Typography
              level="body-xs"
              sx={{ color: 'text.tertiary', fontSize: '11px', mt: 0.5 }}
            >
              Try adjusting your search or filter
            </Typography>
          </Box>
        ) : (
          models.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              isSelected={selectedModelId === model.id}
              onClick={onModelSelect}
            />
          ))
        )}
      </Box>

      {/* Compact Footer Info */}
      <Box
        sx={{
          p: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.level1',
        }}
      >
        <Typography
          level="body-xs"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: '11px',
          }}
        >
          Browse thousands of AI models from the community
        </Typography>
      </Box>
    </Box>
  );
};

export default ModelList;

import { Box } from '@mui/joy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ModelDetails, ModelList } from './components';
import { getModelsByFamily, searchModels } from './data/models';
import type { Model } from './types/model';

const ModelCatalogue: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string | null>(
    'All Models',
  );

  // Filter and search models
  const filteredModels = useMemo(() => {
    let models = getModelsByFamily(selectedFamily);
    if (searchTerm.trim()) {
      models = searchModels(models, searchTerm);
    }
    return models;
  }, [selectedFamily, searchTerm]);

  // Auto-select first model when component mounts or filtered models change
  useEffect(() => {
    if (filteredModels.length > 0 && !selectedModel) {
      setSelectedModel(filteredModels[0]);
    }
  }, [filteredModels, selectedModel]);

  // Reset selection when no models match filters
  useEffect(() => {
    if (filteredModels.length === 0) {
      setSelectedModel(null);
    } else if (
      selectedModel &&
      !filteredModels.find((m) => m.id === selectedModel.id)
    ) {
      // If current selection is not in filtered list, select first available
      setSelectedModel(filteredModels[0]);
    }
  }, [filteredModels, selectedModel]);

  const handleModelSelect = useCallback((model: Model) => {
    setSelectedModel(model);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFamilyChange = useCallback((family: string | null) => {
    setSelectedFamily(family);
  }, []);

  const handleDeploy = useCallback((model: Model) => {
    console.log('Deploy model:', model.name);
    // TODO: Implement deploy logic
  }, []);

  const handleDownload = useCallback((model: Model) => {
    console.log('Download model:', model.name);
    // TODO: Implement download logic
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Left Panel - Model List */}
      <ModelList
        models={filteredModels}
        selectedModelId={selectedModel?.id || null}
        onModelSelect={handleModelSelect}
        searchTerm={searchTerm}
        selectedFamily={selectedFamily}
        onSearchChange={handleSearchChange}
        onFamilyChange={handleFamilyChange}
      />

      {/* Right Panel - Model Details */}
      <ModelDetails
        model={selectedModel}
        onDeploy={handleDeploy}
        onDownload={handleDownload}
      />
    </Box>
  );
};

export default ModelCatalogue;

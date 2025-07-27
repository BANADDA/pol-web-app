export interface ModelStats {
  downloads: string;
  likes: number;
  size: string;
  lastUpdated: string;
}

export interface ModelCompatibility {
  architecture: string;
  framework: string[];
  quantization?: string;
  contextLength?: number;
}

export interface ModelTechnicalDetails {
  parameters: string;
  precision: string;
  contextWindow: string;
  languages: string[];
  capabilities: string[];
  requiresGpu: boolean;
  minVram?: string;
}

export interface Model {
  id: string;
  name: string;
  author: string;
  description: string;
  category: 'llm' | 'embedding' | 'multimodal' | 'code' | 'chat' | 'instruct';
  tags: string[];
  stats: ModelStats;
  compatibility: ModelCompatibility;
  technicalDetails: ModelTechnicalDetails;
  featured: boolean;
  available: boolean;
  deployed?: boolean;
  comingSoon?: boolean;
  readme?: string;
  modelCard?: string;
}

export interface ModelCatalogueProps {
  darkMode?: boolean;
}

export interface ModelListProps {
  models: Model[];
  selectedModelId: string | null;
  onModelSelect: (model: Model) => void;
  searchTerm: string;
  selectedFamily: string | null;
  onSearchChange: (term: string) => void;
  onFamilyChange: (family: string | null) => void;
}

export interface ModelDetailsProps {
  model: Model | null;
  onDeploy: (model: Model) => void;
  onDownload: (model: Model) => void;
}

export interface ModelCardProps {
  model: Model;
  isSelected: boolean;
  onClick: (model: Model) => void;
}

export interface ModelFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
}

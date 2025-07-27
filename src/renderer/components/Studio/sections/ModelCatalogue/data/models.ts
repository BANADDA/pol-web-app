import type { Model } from '../types/model';

export const sampleModels: Model[] = [
  {
    id: 'qwen3-32b',
    name: 'Qwen3 32B',
    author: 'Qwen',
    description:
      'The 32B parameter version of the Qwen3 model family. Advanced reasoning capabilities with enhanced performance.',
    category: 'instruct',
    tags: ['transformers', 'pytorch', 'qwen', 'text-generation', 'chat'],
    stats: {
      downloads: '19268',
      likes: 10,
      size: '17.33 GB',
      lastUpdated: '84 days ago',
    },
    compatibility: {
      architecture: 'qwen',
      framework: ['pytorch', 'transformers'],
      quantization: 'GGUF',
      contextLength: 131072,
    },
    technicalDetails: {
      parameters: '32B',
      precision: 'fp16',
      contextWindow: '131k tokens',
      languages: ['English', 'Chinese', 'Japanese', 'Korean'],
      capabilities: ['Chat', 'Code Generation', 'Reasoning', 'Math'],
      requiresGpu: true,
      minVram: '24GB',
    },
    featured: true,
    available: true,
    deployed: true,
    readme:
      'Community model highlights program. Highlighting new & noteworthy models by the community.',
  },
  {
    id: 'llama-3.2-3b-instruct',
    name: 'Llama 3.2 3B Instruct',
    author: 'Meta',
    description:
      'Meta developed and released the Llama 3.2 family of large language models (LLMs), a collection of pretrained and instruction-tuned generative text models.',
    category: 'instruct',
    tags: ['llama', 'meta', 'instruct', 'pytorch', 'transformers'],
    stats: {
      downloads: '1.2M',
      likes: 156,
      size: '6.2 GB',
      lastUpdated: '2 months ago',
    },
    compatibility: {
      architecture: 'llama',
      framework: ['pytorch', 'transformers', 'gguf'],
      contextLength: 8192,
    },
    technicalDetails: {
      parameters: '3.2B',
      precision: 'bf16',
      contextWindow: '8k tokens',
      languages: [
        'English',
        'German',
        'French',
        'Italian',
        'Portuguese',
        'Hindi',
        'Spanish',
        'Thai',
      ],
      capabilities: ['Instruction Following', 'Chat', 'Tool Use'],
      requiresGpu: false,
      minVram: '4GB',
    },
    featured: false,
    available: true,
  },
  {
    id: 'mistral-7b-instruct-v0.3',
    name: 'Mistral 7B Instruct v0.3',
    author: 'Mistral AI',
    description:
      'The Mistral-7B-Instruct-v0.3 Large Language Model (LLM) is an instruct fine-tuned version of the Mistral-7B-v0.3.',
    category: 'instruct',
    tags: ['mistral', 'instruct', 'fine-tuned', 'pytorch'],
    stats: {
      downloads: '2.1M',
      likes: 243,
      size: '14.5 GB',
      lastUpdated: '5 months ago',
    },
    compatibility: {
      architecture: 'mistral',
      framework: ['pytorch', 'transformers'],
      contextLength: 32768,
    },
    technicalDetails: {
      parameters: '7.24B',
      precision: 'fp16',
      contextWindow: '32k tokens',
      languages: ['English', 'French', 'German', 'Spanish', 'Italian'],
      capabilities: ['Instruction Following', 'Code Generation', 'Reasoning'],
      requiresGpu: true,
      minVram: '8GB',
    },
    featured: false,
    available: true,
  },
  {
    id: 'gemma-2-9b-it',
    name: 'Gemma 2 9B IT',
    author: 'Google',
    description:
      'Gemma 2 9B is a 9-billion-parameter, decoder-only large language model created by Google DeepMind, trained on 13 trillion tokens.',
    category: 'instruct',
    tags: ['google', 'gemma', 'instruct', 'pytorch', 'safetensors'],
    stats: {
      downloads: '891K',
      likes: 89,
      size: '18.9 GB',
      lastUpdated: '6 months ago',
    },
    compatibility: {
      architecture: 'gemma2',
      framework: ['pytorch', 'transformers'],
      contextLength: 8192,
    },
    technicalDetails: {
      parameters: '9.24B',
      precision: 'bf16',
      contextWindow: '8k tokens',
      languages: ['English'],
      capabilities: ['Chat', 'Instruction Following', 'Code'],
      requiresGpu: true,
      minVram: '12GB',
    },
    featured: false,
    available: true,
  },
  {
    id: 'all-minilm-l6-v2',
    name: 'all-MiniLM-L6-v2',
    author: 'sentence-transformers',
    description:
      'This is a sentence-transformers model: It maps sentences & paragraphs to a 384 dimensional dense vector space.',
    category: 'embedding',
    tags: [
      'sentence-transformers',
      'pytorch',
      'embeddings',
      'sentence-similarity',
    ],
    stats: {
      downloads: '50M',
      likes: 1205,
      size: '90.9 MB',
      lastUpdated: '2 years ago',
    },
    compatibility: {
      architecture: 'bert',
      framework: ['sentence-transformers', 'pytorch'],
      contextLength: 256,
    },
    technicalDetails: {
      parameters: '22.7M',
      precision: 'fp32',
      contextWindow: '256 tokens',
      languages: ['English'],
      capabilities: ['Sentence Embeddings', 'Similarity Search', 'Clustering'],
      requiresGpu: false,
    },
    featured: false,
    available: true,
  },
  {
    id: 'code-llama-7b-instruct',
    name: 'Code Llama 7B Instruct',
    author: 'codellama',
    description:
      'Code Llama is a family of large language models for code based on Llama 2 providing state-of-the-art performance, infilling capabilities, support for large input contexts.',
    category: 'code',
    tags: ['code', 'llama', 'meta', 'programming', 'instruct'],
    stats: {
      downloads: '3.2M',
      likes: 421,
      size: '13.5 GB',
      lastUpdated: '1 year ago',
    },
    compatibility: {
      architecture: 'llama',
      framework: ['pytorch', 'transformers'],
      contextLength: 16384,
    },
    technicalDetails: {
      parameters: '6.74B',
      precision: 'fp16',
      contextWindow: '16k tokens',
      languages: ['English'],
      capabilities: [
        'Code Generation',
        'Code Completion',
        'Code Explanation',
        'Debugging',
      ],
      requiresGpu: true,
      minVram: '8GB',
    },
    featured: false,
    available: true,
  },
  {
    id: 'llava-v1.6-mistral-7b',
    name: 'LLaVA-v1.6-Mistral-7B',
    author: 'liuhaotian',
    description:
      'LLaVA-v1.6-Mistral-7B is a multimodal model that combines vision and language understanding capabilities.',
    category: 'multimodal',
    tags: ['multimodal', 'vision', 'language', 'mistral', 'llava'],
    stats: {
      downloads: '456K',
      likes: 78,
      size: '26.7 GB',
      lastUpdated: '8 months ago',
    },
    compatibility: {
      architecture: 'llava-mistral',
      framework: ['pytorch', 'transformers'],
      contextLength: 4096,
    },
    technicalDetails: {
      parameters: '7B',
      precision: 'fp16',
      contextWindow: '4k tokens',
      languages: ['English'],
      capabilities: [
        'Vision-Language Understanding',
        'Image Captioning',
        'Visual QA',
      ],
      requiresGpu: true,
      minVram: '16GB',
    },
    featured: false,
    available: true,
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    author: 'Anthropic',
    description:
      'Claude 3 Haiku is the fastest and most compact model for near-instant responsiveness.',
    category: 'chat',
    tags: ['anthropic', 'claude', 'chat', 'fast', 'compact'],
    stats: {
      downloads: '12K',
      likes: 156,
      size: 'API Only',
      lastUpdated: '9 months ago',
    },
    compatibility: {
      architecture: 'claude',
      framework: ['api'],
      contextLength: 200000,
    },
    technicalDetails: {
      parameters: 'Unknown',
      precision: 'N/A',
      contextWindow: '200k tokens',
      languages: [
        'English',
        'Spanish',
        'Japanese',
        'French',
        'German',
        'Portuguese',
        'Italian',
        'Russian',
        'Korean',
        'Chinese',
      ],
      capabilities: ['Chat', 'Analysis', 'Vision', 'Code Generation'],
      requiresGpu: false,
    },
    featured: false,
    available: false,
    comingSoon: true,
  },
  {
    id: 'gpt-4-turbo-preview',
    name: 'GPT-4 Turbo Preview',
    author: 'OpenAI',
    description:
      'The latest GPT-4 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more.',
    category: 'chat',
    tags: ['openai', 'gpt-4', 'turbo', 'chat', 'api'],
    stats: {
      downloads: '8.9K',
      likes: 234,
      size: 'API Only',
      lastUpdated: '6 months ago',
    },
    compatibility: {
      architecture: 'gpt-4',
      framework: ['api'],
      contextLength: 128000,
    },
    technicalDetails: {
      parameters: '1.76T',
      precision: 'N/A',
      contextWindow: '128k tokens',
      languages: [
        'English',
        'Spanish',
        'French',
        'German',
        'Italian',
        'Portuguese',
        'Russian',
        'Japanese',
        'Korean',
        'Chinese',
      ],
      capabilities: [
        'Chat',
        'Code Generation',
        'Analysis',
        'Vision',
        'Function Calling',
      ],
      requiresGpu: false,
    },
    featured: true,
    available: false,
    comingSoon: true,
  },
];

// Model families for filtering
export const modelFamilies = [
  'All Models',
  'Qwen',
  'Llama',
  'Mistral',
  'Gemma',
  'Claude',
  'GPT',
  'Code Models',
  'Embedding Models',
];

export const getModelsByFamily = (family: string | null): Model[] => {
  if (!family || family === 'All Models') {
    return sampleModels;
  }

  return sampleModels.filter((model) => {
    switch (family.toLowerCase()) {
      case 'qwen':
        return (
          model.author.toLowerCase().includes('qwen') ||
          model.name.toLowerCase().includes('qwen')
        );
      case 'llama':
        return (
          model.author.toLowerCase().includes('meta') ||
          model.name.toLowerCase().includes('llama') ||
          model.tags.includes('llama')
        );
      case 'mistral':
        return (
          model.author.toLowerCase().includes('mistral') ||
          model.name.toLowerCase().includes('mistral') ||
          model.tags.includes('mistral')
        );
      case 'gemma':
        return (
          model.author.toLowerCase().includes('google') ||
          model.name.toLowerCase().includes('gemma') ||
          model.tags.includes('gemma')
        );
      case 'claude':
        return (
          model.author.toLowerCase().includes('anthropic') ||
          model.name.toLowerCase().includes('claude') ||
          model.tags.includes('claude')
        );
      case 'gpt':
        return (
          model.author.toLowerCase().includes('openai') ||
          model.name.toLowerCase().includes('gpt') ||
          model.tags.includes('gpt-4')
        );
      case 'code models':
        return model.category === 'code';
      case 'embedding models':
        return model.category === 'embedding';
      default:
        return false;
    }
  });
};

export const modelCategories = [
  'All Models',
  'LLM',
  'Instruct',
  'Chat',
  'Code',
  'Embedding',
  'Multimodal',
];

export const getModelsByCategory = (category: string | null): Model[] => {
  if (!category || category === 'All Models') {
    return sampleModels;
  }
  return sampleModels.filter(
    (model) => model.category === category.toLowerCase(),
  );
};

export const searchModels = (models: Model[], searchTerm: string): Model[] => {
  if (!searchTerm.trim()) {
    return models;
  }

  const term = searchTerm.toLowerCase();
  return models.filter(
    (model) =>
      model.name.toLowerCase().includes(term) ||
      model.author.toLowerCase().includes(term) ||
      model.description.toLowerCase().includes(term) ||
      model.tags.some((tag) => tag.toLowerCase().includes(term)),
  );
};

export const getFeaturedModels = (): Model[] => {
  return sampleModels.filter((model) => model.featured);
};

export const getAvailableModels = (): Model[] => {
  return sampleModels.filter((model) => model.available);
};

export const getComingSoonModels = (): Model[] => {
  return sampleModels.filter((model) => model.comingSoon);
};

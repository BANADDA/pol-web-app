import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  Input,
  Sheet,
  Switch,
  Textarea,
  Typography,
} from '@mui/joy';
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Copy,
  History,
  Mic,
  Paperclip,
  Plus,
  Send,
  Trash2,
  User,
  X,
  Zap,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ChatMessage, Model } from './types';
import { AVAILABLE_MODELS, SAMPLE_PROMPTS } from './utils/constants';

interface PlaygroundProps {
  darkMode: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

const Playground: React.FC<PlaygroundProps> = ({
  darkMode,
  onNavigateToSection = undefined,
}) => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(
    AVAILABLE_MODELS[0],
  );
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [modelSearchTerm, setModelSearchTerm] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);
  const [attachedImage, setAttachedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showChatHistory, setShowChatHistory] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock chat history data with sample conversations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatHistory] = useState([
    {
      id: '1',
      title: 'Physics concepts',
      timestamp: '2 hours ago',
      preview: 'Can you explain time dilation...',
      messages: [
        {
          id: '1-1',
          role: 'user' as const,
          content: 'Can you explain time dilation in simple terms?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: '1-2',
          role: 'assistant' as const,
          content:
            "Time dilation is a fascinating concept from Einstein's theory of relativity. Imagine you're traveling very fast or in a strong gravitational field - time actually slows down relative to someone who isn't experiencing those conditions.\n\nThink of it like this: if you travel at 90% the speed of light for what feels like 1 year to you, about 2.3 years would pass for someone on Earth. The faster you go, the more pronounced this effect becomes.\n\nThis isn't just theoretical - GPS satellites have to account for time dilation because they're moving fast and experiencing weaker gravity than we do on Earth's surface.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000),
        },
      ],
    },
    {
      id: '2',
      title: 'Paris travel guide',
      timestamp: '1 day ago',
      preview: 'What are popular attractions...',
      messages: [
        {
          id: '2-1',
          role: 'user' as const,
          content:
            'What are popular attractions to visit in Paris for a first-time visitor?',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
        {
          id: '2-2',
          role: 'assistant' as const,
          content:
            'Paris has so many incredible attractions! Here are the must-see spots for first-time visitors:\n\n🗼 **Eiffel Tower** - The iconic symbol of Paris. Visit during both day and night for different experiences.\n\n🏛️ **Louvre Museum** - Home to the Mona Lisa and countless masterpieces. Book tickets in advance!\n\n⛪ **Notre-Dame Cathedral** - Currently under restoration but still worth seeing from the outside.\n\n🎨 **Montmartre & Sacré-Cœur** - Artistic quarter with stunning city views.\n\n🌳 **Champs-Élysées & Arc de Triomphe** - Perfect for shopping and people-watching.\n\n🏰 **Palace of Versailles** - A day trip just outside Paris, absolutely magnificent.\n\nPro tip: Get a Paris Museum Pass to skip lines and save money!',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 45000),
        },
      ],
    },
    {
      id: '3',
      title: 'Gothic architecture',
      timestamp: '3 days ago',
      preview: 'Features of Gothic style...',
      messages: [
        {
          id: '3-1',
          role: 'user' as const,
          content: 'What are the key features of Gothic architecture?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          id: '3-2',
          role: 'assistant' as const,
          content:
            'Gothic architecture emerged in 12th-century France and has several distinctive features:\n\n🏛️ **Pointed Arches** - Unlike rounded Roman arches, Gothic arches come to a point, distributing weight more efficiently.\n\n🏗️ **Flying Buttresses** - External supports that allow for thinner walls and larger windows.\n\n🪟 **Large Windows** - Made possible by the structural innovations, often filled with beautiful stained glass.\n\n⛪ **Rose Windows** - Circular windows with intricate stone tracery, often found on cathedral facades.\n\n🏛️ **Ribbed Vaults** - Ceiling structures that channel weight to specific points rather than distributing it evenly.\n\n⬆️ **Vertical Emphasis** - Gothic buildings reach skyward, creating a sense of aspiration and grandeur.\n\nFamous examples include Notre-Dame de Paris, Chartres Cathedral, and Westminster Abbey. The style emphasized light, height, and spiritual transcendence.',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60000),
        },
      ],
    },
    {
      id: '4',
      title: 'JavaScript async/await',
      timestamp: '5 days ago',
      preview: 'How does async await work...',
      messages: [
        {
          id: '4-1',
          role: 'user' as const,
          content: 'How does async/await work in JavaScript?',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: '4-2',
          role: 'assistant' as const,
          content:
            'Async/await is syntactic sugar over Promises that makes asynchronous code look and behave more like synchronous code...',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30000),
        },
      ],
    },
    {
      id: '5',
      title: 'Recipe for chocolate cake',
      timestamp: '1 week ago',
      preview: 'Best chocolate cake recipe...',
      messages: [
        {
          id: '5-1',
          role: 'user' as const,
          content: 'Can you give me a recipe for the best chocolate cake?',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: '5-2',
          role: 'assistant' as const,
          content:
            "Here's a delicious chocolate cake recipe that's moist and rich...",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 45000),
        },
      ],
    },
    {
      id: '6',
      title: 'Machine learning basics',
      timestamp: '1 week ago',
      preview: 'What is supervised learning...',
      messages: [
        {
          id: '6-1',
          role: 'user' as const,
          content:
            'What is the difference between supervised and unsupervised learning?',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        },
        {
          id: '6-2',
          role: 'assistant' as const,
          content:
            'Great question! The main difference lies in whether the algorithm learns from labeled data...',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000 + 40000),
        },
      ],
    },
    {
      id: '7',
      title: 'Climate change solutions',
      timestamp: '2 weeks ago',
      preview: 'Renewable energy options...',
      messages: [
        {
          id: '7-1',
          role: 'user' as const,
          content:
            'What are the most effective solutions to combat climate change?',
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        },
        {
          id: '7-2',
          role: 'assistant' as const,
          content:
            'Climate change requires a multi-faceted approach. Here are some key solutions...',
          timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 50000),
        },
      ],
    },
    {
      id: '8',
      title: 'Stock market investing',
      timestamp: '2 weeks ago',
      preview: 'Beginner investment tips...',
      messages: [
        {
          id: '8-1',
          role: 'user' as const,
          content:
            'What are some beginner-friendly stock market investment strategies?',
          timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        },
        {
          id: '8-2',
          role: 'assistant' as const,
          content:
            'Starting with investing can seem overwhelming, but here are some solid beginner strategies...',
          timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000 + 35000),
        },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);
  const modelButtonRef = useRef<HTMLButtonElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown position state
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Filter models based on search term
  const filteredModels = AVAILABLE_MODELS.filter(
    (model) =>
      model.name.toLowerCase().includes(modelSearchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(modelSearchTerm.toLowerCase()),
  );

  // Calculate dropdown position
  const calculateDropdownPosition = useCallback(() => {
    if (modelButtonRef.current) {
      const rect = modelButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Calculate position when dropdown opens
  useEffect(() => {
    if (showModelDropdown) {
      calculateDropdownPosition();
    }
  }, [showModelDropdown, calculateDropdownPosition]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node) &&
        modelButtonRef.current &&
        !modelButtonRef.current.contains(event.target as Node)
      ) {
        setShowModelDropdown(false);
        setModelSearchTerm('');
      }
    };

    if (showModelDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return undefined;
  }, [showModelDropdown]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Model selection handlers
  const handleModelSelect = useCallback((model: Model) => {
    setSelectedModel(model);
    setShowModelDropdown(false);
    setModelSearchTerm('');
  }, []);

  // Chat history handlers
  const handleNewChat = useCallback(() => {
    setChatMessages([]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if ((!userInput.trim() && !attachedImage) || isProcessing || !selectedModel)
      return;

    const currentInput = userInput;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: currentInput,
      timestamp: new Date(),
      ...(imagePreview && { imageUrl: imagePreview }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setAttachedImage(null);
    setImagePreview(null);
    setIsProcessing(true);

    // Add assistant placeholder
    const assistantId = `assistant-${Date.now()}`;
    setChatMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
        model: selectedModel.name,
      },
    ]);

    try {
      // Simulate API call - replace with actual implementation
      const sleep = (ms: number) =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, ms);
        });
      await sleep(500);

      const responses = [
        "I understand you'd like to explore this topic. Let me provide you with a comprehensive response that covers the key aspects you're interested in.",
        'This is a fascinating question! Let me break this down into several important points that will help clarify the concept.',
        "Great question! I'll walk you through this step by step, providing examples and explanations along the way.",
        "I'd be happy to help you with this. Here's what you need to know about this topic, along with some practical insights.",
      ];

      const response = responses[Math.floor(Math.random() * responses.length)];

      // Simulate streaming response with better approach
      const words = response.split(' ');
      let wordIndex = 0;

      const streamInterval = setInterval(() => {
        if (wordIndex >= words.length) {
          clearInterval(streamInterval);
          // Finalize message
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, isStreaming: false } : msg,
            ),
          );
          setIsProcessing(false);
          return;
        }

        const currentContent = words.slice(0, wordIndex + 1).join(' ');
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: currentContent } : msg,
          ),
        );
        wordIndex++;
      }, 50);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content: 'Sorry, I encountered an error. Please try again.',
                isStreaming: false,
                error: true,
              }
            : msg,
        ),
      );
      setIsProcessing(false);
    }
  }, [userInput, attachedImage, imagePreview, selectedModel, isProcessing]);

  const handleImageAttach = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setAttachedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSamplePrompt = (prompt: string) => {
    setUserInput(prompt);
    textareaRef.current?.focus();
  };

  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Helper functions for styling
  const getAvatarBgColor = (role: string) => {
    if (role === 'user') {
      return darkMode ? 'primary.500' : 'primary.600';
    }
    return darkMode ? 'neutral.800' : 'neutral.100';
  };

  const getAvatarColor = (role: string) => {
    if (role === 'user') {
      return 'white';
    }
    return darkMode ? 'primary.300' : 'primary.600';
  };

  const getCardBgColor = (role: string) => {
    if (role === 'user') {
      return darkMode
        ? 'rgba(59, 130, 246, 0.15)' // Bluish transparent
        : 'rgba(59, 130, 246, 0.08)';
    }
    return darkMode ? 'background.surface' : 'background.body';
  };

  const getCardBorderColor = (role: string) => {
    if (role === 'user') {
      return darkMode
        ? 'rgba(147, 51, 234, 0.4)' // Purple border with transparency
        : 'primary.200';
    }
    return darkMode ? 'divider' : 'neutral.200';
  };

  const getTextColor = (role: string) => {
    if (role === 'user') {
      return darkMode
        ? 'white' // White text for dark mode
        : 'rgba(30, 58, 138, 0.9)'; // Dark blue for light mode
    }
    return 'text.secondary';
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        // Add subtle dot pattern background
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle, ${
            darkMode ? 'rgba(147, 51, 234, 0.1)' : 'rgba(99, 102, 241, 0.05)'
          } 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <Sheet
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(147, 51, 234, 0.3)'
              : 'rgba(99, 102, 241, 0.2)',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(15, 23, 42, 0.9)'
              : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Centered Model Selector - Updated styling */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Polaris AI Studio Icon */}
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: 'primary.500',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              border: '1px solid',
              borderColor: 'primary.400',
            }}
          >
            P
          </Box>

          {/* Model Selector Button */}
          <Button
            ref={modelButtonRef}
            variant="outlined"
            size="sm"
            onClick={() => {
              setShowModelDropdown(!showModelDropdown);
              calculateDropdownPosition();
            }}
            onMouseEnter={() => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                setHoverTimeout(null);
              }
              if (!showModelDropdown) {
                setShowModelDropdown(true);
                calculateDropdownPosition();
              }
            }}
            onMouseLeave={() => {
              const timeout = window.setTimeout(() => {
                setShowModelDropdown(false);
                setModelSearchTerm('');
              }, 300);
              setHoverTimeout(timeout);
            }}
            endDecorator={<ChevronDown size={14} />}
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              borderColor: 'divider',
              color: 'text.primary',
              bgcolor: 'background.level1',
              '&:hover': {
                borderColor: 'primary.300',
                bgcolor: 'primary.50',
              },
            }}
          >
            {selectedModel ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: selectedModel.deployed
                      ? 'linear-gradient(45deg, #10b981, #059669)'
                      : 'linear-gradient(45deg, #f59e0b, #d97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'white',
                    }}
                  />
                </Box>
                <Typography level="body-xs" sx={{ fontWeight: 500 }}>
                  {selectedModel.name}
                </Typography>
              </Box>
            ) : (
              'Select Model'
            )}
          </Button>

          {/* AI Playground Label */}
          <Typography
            level="body-sm"
            sx={{
              color: 'text.secondary',
              fontSize: '11px',
              fontWeight: 500,
            }}
          >
            AI Playground
          </Typography>
        </Box>

        {/* Model Dropdown Menu */}
        {showModelDropdown &&
          createPortal(
            <Card
              ref={modelDropdownRef}
              variant="outlined"
              onMouseEnter={() => {
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout);
                  setHoverTimeout(null);
                }
              }}
              onMouseLeave={() => {
                const timeout = window.setTimeout(() => {
                  setShowModelDropdown(false);
                  setModelSearchTerm('');
                }, 300);
                setHoverTimeout(timeout);
              }}
              sx={{
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: Math.max(dropdownPosition.width, 380),
                minWidth: 380,
                maxWidth: 450,
                zIndex: 9999,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                bgcolor: 'background.surface',
                borderColor: 'divider',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderRadius: '16px',
                maxHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  px: 1.5,
                  pt: 1.5,
                  pb: 1,
                  flexShrink: 0,
                }}
              >
                <Typography
                  level="title-sm"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: '14px',
                  }}
                >
                  Select Base Model
                </Typography>
              </Box>
              {/* Search Header */}
              <Box
                sx={{
                  px: 1.5,
                  pb: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  flexShrink: 0,
                }}
              >
                <Input
                  placeholder="Filter models..."
                  value={modelSearchTerm}
                  onChange={(e) => setModelSearchTerm(e.target.value)}
                  size="sm"
                  startDecorator={<Bot size={14} style={{ opacity: 0.5 }} />}
                  endDecorator={
                    modelSearchTerm && (
                      <IconButton
                        size="sm"
                        variant="plain"
                        onClick={() => setModelSearchTerm('')}
                        sx={{
                          borderRadius: '50%',
                          '&:hover': {
                            bgcolor: 'danger.100',
                            color: 'danger.500',
                          },
                        }}
                      >
                        <X size={12} />
                      </IconButton>
                    )
                  }
                  sx={{
                    bgcolor: 'background.body',
                    borderColor: 'neutral.200',
                    '--Input-focusedHighlight': 'primary.400',
                    fontSize: '13px',
                    height: '32px',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: 'primary.200',
                    },
                    '&:focus-within': {
                      borderColor: 'primary.400',
                      boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.1)',
                    },
                  }}
                />
              </Box>

              {/* Model List */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: 1.5,
                  '&::-webkit-scrollbar': { width: '6px' },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '3px',
                    mr: 1,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    borderRadius: '3px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                    },
                  },
                }}
              >
                {filteredModels.length === 0 ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Bot
                      size={24}
                      style={{ opacity: 0.3, marginBottom: '8px' }}
                    />
                    <Typography
                      level="body-sm"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '13px',
                        fontWeight: 500,
                      }}
                    >
                      No models found
                    </Typography>
                    <Typography
                      level="body-xs"
                      sx={{
                        color: 'text.tertiary',
                        fontSize: '11px',
                        mt: 0.5,
                      }}
                    >
                      Try adjusting your search terms
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.75,
                    }}
                  >
                    {filteredModels.map((model) => {
                      const isSelected = model.id === selectedModel?.id;

                      // Icon mapping for different models
                      const getModelIcon = (modelName: string) => {
                        if (modelName.includes('Qwen')) {
                          return (
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                background:
                                  'linear-gradient(45deg, #00d2ff, #3a7bd5)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  background: 'white',
                                  borderRadius: '1px',
                                  transform: 'rotate(45deg)',
                                }}
                              />
                            </Box>
                          );
                        }
                        if (modelName.includes('DeepSeek')) {
                          return (
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                background:
                                  'linear-gradient(45deg, #ff6b9d, #c44569)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  background: 'white',
                                  borderRadius: '50%',
                                }}
                              />
                            </Box>
                          );
                        }
                        return (
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              background:
                                'linear-gradient(45deg, #a8edea, #fed6e3)',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Bot size={10} style={{ color: '#666' }} />
                          </Box>
                        );
                      };

                      return (
                        <Box
                          key={model.id}
                          onClick={() => handleModelSelect(model)}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: '8px',
                            position: 'relative',

                            // Beautiful hover effects
                            '&:hover': {
                              bgcolor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(147, 51, 234, 0.1)'
                                  : 'rgba(99, 102, 241, 0.05)',
                              transform: 'translateY(-4px) scale(1.02)',
                              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',

                              // Gradient border effect on hover
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: '-2px',
                                padding: '2px',
                                background:
                                  'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                                borderRadius: '10px',
                                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                maskComposite: 'xor',
                                WebkitMask:
                                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                zIndex: -1,
                              },
                            },

                            // Active state
                            '&:active': {
                              transform: 'translateY(-2px) scale(0.98)',
                              transition:
                                'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1.5,
                            }}
                          >
                            {/* Model Icon */}
                            <Box sx={{ mt: 0.25, flexShrink: 0 }}>
                              {getModelIcon(model.name)}
                            </Box>

                            {/* Model Info */}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.75,
                                  mb: 0.5,
                                }}
                              >
                                <Typography
                                  level="body-sm"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    color: 'text.primary',
                                    lineHeight: 1,
                                  }}
                                >
                                  {model.name}
                                </Typography>
                                <Chip
                                  size="sm"
                                  variant="soft"
                                  color="neutral"
                                  sx={{
                                    fontSize: '9px',
                                    py: 0.125,
                                    px: 0.5,
                                    fontWeight: 500,
                                    borderRadius: '3px',
                                    minHeight: 'auto',
                                    height: 'auto',
                                  }}
                                >
                                  {model.parameters}
                                </Chip>
                                {model.multimodal && (
                                  <Chip
                                    size="sm"
                                    variant="soft"
                                    color="warning"
                                    sx={{
                                      fontSize: '9px',
                                      py: 0.125,
                                      px: 0.5,
                                      fontWeight: 500,
                                      borderRadius: '3px',
                                      minHeight: 'auto',
                                      height: 'auto',
                                    }}
                                  >
                                    Image
                                  </Chip>
                                )}
                              </Box>
                              <Typography
                                level="body-xs"
                                sx={{
                                  color: 'text.secondary',
                                  fontSize: '11px',
                                  lineHeight: 1.3,
                                  fontWeight: 400,
                                }}
                              >
                                {model.description}
                              </Typography>
                            </Box>

                            {/* Select Button */}
                            <Box sx={{ mt: 0.25, flexShrink: 0 }}>
                              {isSelected ? (
                                <Chip
                                  size="sm"
                                  variant="soft"
                                  color="primary"
                                  sx={{
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    px: 1,
                                    py: 0.25,
                                    borderRadius: '4px',
                                    minHeight: 'auto',
                                    height: 'auto',
                                  }}
                                >
                                  Selected
                                </Chip>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="soft"
                                  color="success"
                                  sx={{
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    px: 1.25,
                                    py: 0.375,
                                    minHeight: 'auto',
                                    borderRadius: '4px',
                                    height: 'auto',
                                  }}
                                >
                                  Select
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>

              {/* Browse Model Catalog Link - Fixed at Bottom */}
              <Box
                sx={{
                  p: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  flexShrink: 0,
                  bgcolor: 'background.surface',
                }}
              >
                <Typography
                  level="body-xs"
                  onClick={() => {
                    if (onNavigateToSection) {
                      onNavigateToSection('catalogue');
                      setShowModelDropdown(false);
                      setModelSearchTerm('');
                    }
                  }}
                  sx={{
                    color: 'primary.600',
                    fontSize: '11px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Browse full model catalog →
                </Typography>
              </Box>
            </Card>,
            document.body,
          )}

        {/* Chat History Toggle */}
        <IconButton
          variant="outlined"
          size="sm"
          onClick={() => setShowChatHistory(!showChatHistory)}
          sx={{
            position: 'absolute',
            right: 16,
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'primary.300',
              bgcolor: 'primary.50',
            },
          }}
        >
          <History size={16} />
        </IconButton>
      </Sheet>

      {/* Main Content - Fixed height structure */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          minHeight: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Chat Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            transition: 'margin-right 0.3s ease',
            marginRight: showChatHistory ? { xs: 0, md: '320px' } : 0,
          }}
        >
          {/* Chat Content */}
          <Box
            sx={{
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                p: { xs: 2, sm: 3 },
                pb: 0,
              }}
            >
              {chatMessages.length === 0 ? (
                // Empty state with sample prompts - Updated styling
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                  }}
                >
                  {/* Welcome Message */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      level="h3"
                      sx={{
                        fontSize: { xs: '20px', sm: '24px' },
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 1,
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, #c4b5fd 0%, #7c4dff 100%)'
                            : 'linear-gradient(135deg, #6366f1 0%, #7c4dff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Welcome to Polaris AI Studio
                    </Typography>
                    <Typography
                      level="body-md"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '14px',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                      }}
                    >
                      Start a conversation with your selected AI model to
                      explore its capabilities for development, coding, and
                      problem-solving tasks.
                    </Typography>
                  </Box>

                  {/* Sample Prompts */}
                  <Typography
                    level="body-sm"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '12px',
                      mb: 2,
                      fontWeight: 500,
                    }}
                  >
                    Try one of these examples to get started:
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 1.5,
                      maxWidth: '700px',
                      width: '100%',
                    }}
                  >
                    {SAMPLE_PROMPTS.map((prompt) => (
                      <Card
                        key={prompt.id}
                        variant="outlined"
                        onClick={() => handleSamplePrompt(prompt.title)}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderColor: 'divider',
                          bgcolor: 'background.surface',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '12px',
                          position: 'relative',

                          // Beautiful hover effects
                          '&:hover': {
                            transform: 'translateY(-4px) scale(1.02)',
                            borderColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(59, 130, 246, 0.4)'
                                : 'primary.300',
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(59, 130, 246, 0.08)'
                                : 'primary.50',
                            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',

                            // Gradient border effect on hover
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              inset: '-2px',
                              padding: '2px',
                              background:
                                'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                              borderRadius: '14px',
                              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              maskComposite: 'xor',
                              WebkitMask:
                                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              zIndex: -1,
                            },
                          },

                          // Active state
                          '&:active': {
                            transform: 'translateY(-2px) scale(0.98)',
                            transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            level="body-sm"
                            sx={{
                              flex: 1,
                              textAlign: 'left',
                              fontSize: '13px',
                              fontWeight: 500,
                              color: 'text.primary',
                            }}
                          >
                            {prompt.title}
                          </Typography>
                          <ArrowRight
                            size={14}
                            style={{
                              opacity: 0.6,
                            }}
                          />
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Box>
              ) : (
                // Chat Messages - Updated styling
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    pb: 3,
                  }}
                >
                  {chatMessages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: {
                          xs: 'column',
                          sm: message.role === 'user' ? 'row-reverse' : 'row',
                        },
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Avatar */}
                      <Avatar
                        size="sm"
                        sx={{
                          bgcolor: getAvatarBgColor(message.role),
                          color: getAvatarColor(message.role),
                          border: '2px solid',
                          borderColor: darkMode
                            ? 'rgba(147, 51, 234, 0.3)'
                            : 'rgba(99, 102, 241, 0.2)',
                        }}
                      >
                        {message.role === 'user' ? (
                          <User size={14} />
                        ) : (
                          <Bot size={14} />
                        )}
                      </Avatar>

                      {/* Message Card */}
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2.5,
                          flex: 1,
                          maxWidth: { xs: '100%', sm: '75%' },
                          bgcolor: getCardBgColor(message.role),
                          borderColor: getCardBorderColor(message.role),
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {/* Message Header */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 1,
                          }}
                        >
                          <Typography
                            level="body-xs"
                            sx={{
                              fontWeight: 600,
                              color: (() => {
                                if (message.role === 'user') {
                                  return darkMode
                                    ? '#ffffff !important'
                                    : 'rgba(30, 58, 138, 0.9)';
                                }
                                return 'text.secondary';
                              })(),
                              fontSize: '11px',
                            }}
                          >
                            {message.role === 'user'
                              ? 'You'
                              : message.model || 'AI Assistant'}
                            {message.isStreaming && (
                              <Zap
                                size={12}
                                style={{ marginLeft: 4, opacity: 0.6 }}
                              />
                            )}
                          </Typography>

                          {message.content && !message.isStreaming && (
                            <IconButton
                              size="sm"
                              variant="plain"
                              onClick={() => copyMessage(message.content)}
                              sx={{
                                opacity: 0.6,
                                '&:hover': { opacity: 1 },
                                color: 'text.secondary',
                              }}
                            >
                              <Copy size={12} />
                            </IconButton>
                          )}
                        </Box>

                        {/* Message Image */}
                        {message.imageUrl && (
                          <Box sx={{ mb: 1.5 }}>
                            <img
                              src={message.imageUrl}
                              alt="Uploaded content"
                              style={{
                                maxWidth: '100%',
                                maxHeight: 200,
                                borderRadius: 8,
                                objectFit: 'cover',
                                border: '1px solid var(--joy-palette-divider)',
                              }}
                            />
                          </Box>
                        )}

                        {/* Message Content */}
                        <Typography
                          level="body-sm"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            fontSize: '13px',
                            lineHeight: 1.5,
                            color: (() => {
                              if (message.role === 'user') {
                                return darkMode
                                  ? 'white' // White text for dark mode
                                  : 'rgba(30, 58, 138, 0.9)'; // Dark blue for light mode
                              }
                              return 'text.primary';
                            })(),
                          }}
                        >
                          {message.content}
                          {message.isStreaming && (
                            <Box
                              component="span"
                              sx={{
                                ml: 1,
                                animation: 'pulse 1.5s infinite',
                                color: 'primary.400',
                              }}
                            >
                              ▋
                            </Box>
                          )}
                        </Typography>
                      </Card>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Chat History Sidebar */}
        <Sheet
          sx={{
            position: { xs: 'fixed', md: 'absolute' },
            top: { xs: 60, md: 0 },
            right: showChatHistory ? 0 : { xs: '-100%', md: '-320px' },
            width: { xs: '100%', sm: '400px', md: '280px' },
            height: { xs: 'calc(100% - 120px)', md: '100%' },
            bottom: { xs: 'auto', md: 0 },
            bgcolor: 'background.surface',
            borderLeft: '1px solid',
            borderColor: 'divider',
            transition: 'right 0.3s ease',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: '12px 16px',
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'background.level1',
            }}
          >
            <Typography
              level="title-sm"
              sx={{
                color: 'text.primary',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <History size={16} />
              Chat History
            </Typography>
            <IconButton
              size="sm"
              variant="plain"
              onClick={() => setShowChatHistory(!showChatHistory)}
              sx={{
                color: 'text.secondary',
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'background.level2',
                  color: 'text.primary',
                },
              }}
            >
              <X size={16} />
            </IconButton>
          </Box>

          {/* Search */}
          <Box
            sx={{
              p: '12px 16px',
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.level1',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Input
                placeholder="Search conversations..."
                size="sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: '100%',
                  fontSize: '12px',
                  bgcolor: 'background.body',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '6px',
                  color: 'text.primary',
                  transition: 'all 0.2s',
                  '&:focus-within': {
                    borderColor: 'primary.400',
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.1)',
                  },
                  '&::placeholder': {
                    color: 'text.tertiary',
                  },
                }}
              />
            </Box>
          </Box>

          {/* Action Buttons Row */}
          <Box
            sx={{
              margin: '12px 16px',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {/* New Chat Button */}
            <Button
              onClick={handleNewChat}
              sx={{
                flex: 1,
                padding: '8px 12px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                justifyContent: 'center',
                position: 'relative',
                minHeight: '32px',

                // Beautiful hover effects
                '&:hover': {
                  background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.25)',

                  // Gradient border effect on hover
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-1px',
                    padding: '1px',
                    background:
                      'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                    borderRadius: '7px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    zIndex: -1,
                  },
                },

                // Active state
                '&:active': {
                  transform: 'translateY(-1px) scale(0.98)',
                  transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                },
              }}
            >
              <Plus size={14} />
              New Chat
            </Button>

            {/* Clear All Button */}
            <Button
              variant="outlined"
              onClick={() => {
                console.log('Clear all chats');
              }}
              sx={{
                flex: 1,
                padding: '8px 12px',
                background: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '6px',
                color: 'text.secondary',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: '32px',

                // Beautiful hover effects
                '&:hover': {
                  bgcolor: 'background.level2',
                  color: 'text.primary',
                  borderColor: 'primary.300',
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.15)',

                  // Gradient border effect on hover
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-1px',
                    padding: '1px',
                    background:
                      'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
                    borderRadius: '7px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    zIndex: -1,
                  },
                },

                // Active state
                '&:active': {
                  transform: 'translateY(-1px) scale(0.98)',
                  transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                },
              }}
            >
              Clear All
            </Button>
          </Box>

          {/* Chat List */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              padding: '0 8px',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'divider',
                borderRadius: '2px',
              },
            }}
          >
            {/* Today */}
            {(!searchTerm ||
              'Physics concepts'
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              'Can you explain time dilation in simple terms?'
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) && (
              <Box sx={{ marginBottom: '16px' }}>
                <Typography
                  level="body-xs"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'text.tertiary',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '6px 8px 4px 8px',
                    marginBottom: '2px',
                  }}
                >
                  Today
                </Typography>

                <Box
                  sx={{
                    padding: '6px 8px',
                    borderRadius: '6px',
                    marginBottom: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    bgcolor: 'background.level2',
                    borderLeft: '2px solid',
                    borderLeftColor: 'primary.500',

                    // Beautiful hover effects
                    '&:hover': {
                      bgcolor: 'background.level3',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',

                      // Gradient border effect on hover
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-2px',
                        padding: '2px',
                        background:
                          'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                        borderRadius: '10px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        zIndex: -1,
                      },
                    },

                    // Active state
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                  onClick={() => {
                    // Load physics concepts chat
                    const physicsChat: ChatMessage[] = [
                      {
                        id: '1',
                        role: 'user' as const,
                        content:
                          'Can you explain time dilation in simple terms?',
                        timestamp: new Date(),
                      },
                      {
                        id: '2',
                        role: 'assistant' as const,
                        content:
                          "Time dilation is a fascinating concept from Einstein's theory of relativity. Imagine you're traveling very fast or in a strong gravitational field - time actually slows down relative to someone who isn't experiencing those conditions.\n\nThink of it like this: if you travel at 90% the speed of light for what feels like 1 year to you, about 2.3 years would pass for someone on Earth. The faster you go, the more pronounced this effect becomes.\n\nThis isn't just theoretical - GPS satellites have to account for time dilation because they're moving fast and experiencing weaker gravity than we do on Earth's surface.",
                        timestamp: new Date(),
                        model: 'Qwen 2.5 7B',
                      },
                    ];
                    setChatMessages(physicsChat);
                  }}
                >
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      marginTop: '6px',
                      flexShrink: 0,
                      bgcolor: 'success.500',
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2px',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: '11px',
                          fontWeight: 500,
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                        }}
                      >
                        Physics concepts
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '9px',
                          color: 'text.tertiary',
                          fontFamily: 'SF Mono, Monaco, monospace',
                          marginLeft: '6px',
                          flexShrink: 0,
                        }}
                      >
                        2h ago
                      </Typography>
                    </Box>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.secondary',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Can you explain time dilation in simple terms?
                    </Typography>
                  </Box>
                </Box>

                {/* React hooks tutorial */}
                <Box
                  sx={{
                    padding: '6px 8px',
                    borderRadius: '6px',
                    marginBottom: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    '&:hover': {
                      bgcolor: 'background.level2',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-2px',
                        padding: '2px',
                        background:
                          'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                        borderRadius: '8px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        zIndex: -1,
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                  onClick={() => {
                    const reactChat: ChatMessage[] = [
                      {
                        id: '1',
                        role: 'user' as const,
                        content: 'Explain React hooks basics',
                        timestamp: new Date(),
                      },
                      {
                        id: '2',
                        role: 'assistant' as const,
                        content:
                          'React hooks are functions that let you use state and other React features...',
                        timestamp: new Date(),
                        model: 'Qwen 2.5 7B',
                      },
                    ];
                    setChatMessages(reactChat);
                  }}
                >
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      marginTop: '6px',
                      flexShrink: 0,
                      bgcolor: 'info.500',
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2px',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: '11px',
                          fontWeight: 500,
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                        }}
                      >
                        React hooks tutorial
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '9px',
                          color: 'text.tertiary',
                          fontFamily: 'SF Mono, Monaco, monospace',
                          marginLeft: '6px',
                          flexShrink: 0,
                        }}
                      >
                        4h ago
                      </Typography>
                    </Box>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.secondary',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Explain React hooks basics
                    </Typography>
                  </Box>
                </Box>

                {/* CSS Grid layout */}
                <Box
                  sx={{
                    padding: '6px 8px',
                    borderRadius: '6px',
                    marginBottom: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    '&:hover': {
                      bgcolor: 'background.level2',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-2px',
                        padding: '2px',
                        background:
                          'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                        borderRadius: '8px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        zIndex: -1,
                      },
                    },
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                  onClick={() => {
                    const cssChat: ChatMessage[] = [
                      {
                        id: '1',
                        role: 'user' as const,
                        content: 'CSS Grid vs Flexbox comparison',
                        timestamp: new Date(),
                      },
                      {
                        id: '2',
                        role: 'assistant' as const,
                        content:
                          'Both CSS Grid and Flexbox are powerful layout systems...',
                        timestamp: new Date(),
                        model: 'Qwen 2.5 7B',
                      },
                    ];
                    setChatMessages(cssChat);
                  }}
                >
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      marginTop: '6px',
                      flexShrink: 0,
                      bgcolor: 'warning.500',
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2px',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: '11px',
                          fontWeight: 500,
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                        }}
                      >
                        CSS Grid layout
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '9px',
                          color: 'text.tertiary',
                          fontFamily: 'SF Mono, Monaco, monospace',
                          marginLeft: '6px',
                          flexShrink: 0,
                        }}
                      >
                        6h ago
                      </Typography>
                    </Box>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.secondary',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      CSS Grid vs Flexbox comparison
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Yesterday */}
            {(!searchTerm ||
              'Paris travel guide'
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              'What are popular attractions'
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) && (
              <Box sx={{ marginBottom: '16px' }}>
                <Typography
                  level="body-xs"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'text.tertiary',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '6px 8px 4px 8px',
                    marginBottom: '2px',
                  }}
                >
                  Yesterday
                </Typography>

                <Box
                  sx={{
                    padding: '6px 8px',
                    borderRadius: '6px',
                    marginBottom: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',

                    // Beautiful hover effects
                    '&:hover': {
                      bgcolor: 'background.level2',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',

                      // Gradient border effect on hover
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-2px',
                        padding: '2px',
                        background:
                          'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
                        borderRadius: '8px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        zIndex: -1,
                      },
                    },

                    // Active state
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                  onClick={() => {
                    // Load Paris travel chat
                    const parisChat: ChatMessage[] = [
                      {
                        id: '1',
                        role: 'user' as const,
                        content:
                          'What are popular attractions and hidden gems in Paris for first-time visitors?',
                        timestamp: new Date(),
                      },
                      {
                        id: '2',
                        role: 'assistant' as const,
                        content:
                          "For first-time visitors to Paris, I'd recommend a mix of iconic landmarks and local favorites:\n\n**Must-See Attractions:**\n- Eiffel Tower (visit at sunset for best photos)\n- Louvre Museum (book skip-the-line tickets)\n- Notre-Dame area and Sainte-Chapelle\n- Arc de Triomphe and Champs-Élysées\n\n**Hidden Gems:**\n- Musée Rodin with its beautiful sculpture garden\n- The covered passages like Galerie Vivienne\n- Père Lachaise Cemetery for a peaceful walk\n- The Marais district for authentic bistros and vintage shops\n\n**Local Tips:**\n- Visit markets like Marché des Enfants Rouges\n- Take a Seine river cruise at dusk\n- Explore Montmartre beyond just Sacré-Cœur",
                        timestamp: new Date(),
                        model: 'Qwen 2.5 7B',
                      },
                    ];
                    setChatMessages(parisChat);
                  }}
                >
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      marginTop: '6px',
                      flexShrink: 0,
                      bgcolor: 'warning.500',
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2px',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: '11px',
                          fontWeight: 500,
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                        }}
                      >
                        Paris travel guide
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '9px',
                          color: 'text.tertiary',
                          fontFamily: 'SF Mono, Monaco, monospace',
                          marginLeft: '6px',
                          flexShrink: 0,
                        }}
                      >
                        1d ago
                      </Typography>
                    </Box>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.secondary',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      What are popular attractions...
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* This Week */}
            {(!searchTerm ||
              'Gothic architecture'
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              'Features of Gothic style'
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) && (
              <Box sx={{ marginBottom: '16px' }}>
                <Typography
                  level="body-xs"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'text.tertiary',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '6px 8px 4px 8px',
                    marginBottom: '2px',
                  }}
                >
                  This Week
                </Typography>

                <Box
                  sx={{
                    padding: '6px 8px',
                    borderRadius: '6px',
                    marginBottom: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',

                    // Beautiful hover effects
                    '&:hover': {
                      bgcolor: 'background.level2',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 8px 32px rgba(236, 72, 153, 0.15)',

                      // Gradient border effect on hover
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-2px',
                        padding: '2px',
                        background:
                          'linear-gradient(135deg, #ec4899, #10b981, #6366f1)',
                        borderRadius: '8px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMask:
                          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        zIndex: -1,
                      },
                    },

                    // Active state
                    '&:active': {
                      transform: 'translateY(-2px) scale(0.98)',
                      transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                  }}
                  onClick={() => {
                    // Load Gothic architecture chat
                    const gothicChat: ChatMessage[] = [
                      {
                        id: '1',
                        role: 'user' as const,
                        content:
                          'Features of Gothic style and its influence on modern buildings',
                        timestamp: new Date(),
                      },
                      {
                        id: '2',
                        role: 'assistant' as const,
                        content:
                          'Gothic architecture, which emerged in 12th century France, is characterized by several distinctive features:\n\n**Key Gothic Features:**\n- Pointed arches that distribute weight more efficiently\n- Flying buttresses for external structural support\n- Large windows with intricate tracery\n- Ribbed vaulting for height and lightness\n- Rose windows and elaborate stone carving\n\n**Modern Influence:**\nGothic elements continue to inspire contemporary architecture:\n- Neo-Gothic revival in universities and churches\n- Structural innovations like steel frame construction\n- Emphasis on vertical lines and natural light\n- Decorative elements in Art Deco and modern buildings\n\nFamous examples include Notre-Dame de Paris, Westminster Abbey, and modern interpretations like the Tribune Tower in Chicago.',
                        timestamp: new Date(),
                        model: 'Qwen 2.5 7B',
                      },
                    ];
                    setChatMessages(gothicChat);
                  }}
                >
                  <Box
                    sx={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      marginTop: '6px',
                      flexShrink: 0,
                      bgcolor: 'secondary.500',
                    }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2px',
                      }}
                    >
                      <Typography
                        level="body-sm"
                        sx={{
                          fontSize: '13px',
                          fontWeight: 400,
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1,
                        }}
                      >
                        Gothic architecture
                      </Typography>
                      <Typography
                        level="body-xs"
                        sx={{
                          fontSize: '10px',
                          color: 'text.tertiary',
                          fontFamily: 'SF Mono, Monaco, monospace',
                          marginLeft: '8px',
                          flexShrink: 0,
                        }}
                      >
                        3d ago
                      </Typography>
                    </Box>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '11px',
                        color: 'text.secondary',
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Features of Gothic style...
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* EARLIER */}
            <Box sx={{ marginBottom: '16px' }}>
              <Typography
                level="body-xs"
                sx={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'text.tertiary',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  padding: '6px 8px 4px 8px',
                  marginBottom: '2px',
                }}
              >
                EARLIER
              </Typography>

              {/* JavaScript async/await */}
              <Box
                sx={{
                  padding: '6px 8px',
                  borderRadius: '6px',
                  marginBottom: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  '&:hover': {
                    bgcolor: 'background.level2',
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.15)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-1px',
                      padding: '1px',
                      background:
                        'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                      borderRadius: '7px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: -1,
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                    transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    marginTop: '6px',
                    flexShrink: 0,
                    bgcolor: 'danger.500',
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2px',
                    }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1,
                      }}
                    >
                      JavaScript async/await
                    </Typography>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.tertiary',
                        fontFamily: 'SF Mono, Monaco, monospace',
                        marginLeft: '6px',
                        flexShrink: 0,
                      }}
                    >
                      5d ago
                    </Typography>
                  </Box>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontSize: '9px',
                      color: 'text.secondary',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    How does async await work...
                  </Typography>
                </Box>
              </Box>

              {/* Recipe for chocolate cake */}
              <Box
                sx={{
                  padding: '6px 8px',
                  borderRadius: '6px',
                  marginBottom: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  '&:hover': {
                    bgcolor: 'background.level2',
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.15)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-1px',
                      padding: '1px',
                      background:
                        'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
                      borderRadius: '7px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: -1,
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                    transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    marginTop: '6px',
                    flexShrink: 0,
                    bgcolor: 'secondary.500',
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2px',
                    }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1,
                      }}
                    >
                      Recipe for chocolate cake
                    </Typography>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.tertiary',
                        fontFamily: 'SF Mono, Monaco, monospace',
                        marginLeft: '6px',
                        flexShrink: 0,
                      }}
                    >
                      1w ago
                    </Typography>
                  </Box>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontSize: '9px',
                      color: 'text.secondary',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    Best chocolate cake recipe...
                  </Typography>
                </Box>
              </Box>

              {/* Machine learning basics */}
              <Box
                sx={{
                  padding: '6px 8px',
                  borderRadius: '6px',
                  marginBottom: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  '&:hover': {
                    bgcolor: 'background.level2',
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.15)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-1px',
                      padding: '1px',
                      background:
                        'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)',
                      borderRadius: '7px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      zIndex: -1,
                    },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                    transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    marginTop: '6px',
                    flexShrink: 0,
                    bgcolor: 'success.500',
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2px',
                    }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1,
                      }}
                    >
                      Machine learning basics
                    </Typography>
                    <Typography
                      level="body-xs"
                      sx={{
                        fontSize: '9px',
                        color: 'text.tertiary',
                        fontFamily: 'SF Mono, Monaco, monospace',
                        marginLeft: '6px',
                        flexShrink: 0,
                      }}
                    >
                      1w ago
                    </Typography>
                  </Box>
                  <Typography
                    level="body-xs"
                    sx={{
                      fontSize: '9px',
                      color: 'text.secondary',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    What is supervised learning...
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* No results message */}
            {searchTerm &&
              !(
                'Physics concepts'
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                'Can you explain time dilation in simple terms?'
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                'Paris travel guide'
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                'What are popular attractions'
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                'Gothic architecture'
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                'Features of Gothic style'
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography
                    level="body-sm"
                    sx={{ color: 'text.tertiary', fontSize: '12px' }}
                  >
                    No conversations found for &quot;{searchTerm}&quot;
                  </Typography>
                </Box>
              )}
          </Box>
        </Sheet>
      </Box>

      {/* Input Area - Header-style design at bottom */}
      <Sheet
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.surface',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          position: 'relative',
          zIndex: 100,
        }}
      >
        <Box sx={{ maxWidth: 1000, mx: 'auto', width: '100%' }}>
          {/* Image Preview */}
          {imagePreview && (
            <Box
              sx={{
                mb: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                bgcolor: 'background.level1',
                borderRadius: 'sm',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 6,
                  objectFit: 'cover',
                  border: '1px solid var(--joy-palette-divider)',
                }}
              />
              <IconButton
                size="sm"
                variant="outlined"
                onClick={() => {
                  setAttachedImage(null);
                  setImagePreview(null);
                }}
                sx={{
                  '--IconButton-size': '28px',
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'danger.50',
                    borderColor: 'danger.200',
                    color: 'danger.600',
                  },
                }}
              >
                <Trash2 size={12} />
              </IconButton>
            </Box>
          )}

          {/* Main Input Row */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'end',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 0.5, order: { xs: 2, sm: 1 } }}>
              <IconButton
                variant="outlined"
                size="sm"
                onClick={handleImageAttach}
                disabled={isProcessing}
                sx={{
                  '--IconButton-size': '32px',
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'primary.50',
                    borderColor: 'primary.200',
                    color: 'primary.600',
                  },
                  '&:disabled': {
                    opacity: 0.4,
                  },
                }}
              >
                <Paperclip size={14} />
              </IconButton>

              <IconButton
                variant="outlined"
                size="sm"
                disabled
                sx={{
                  '--IconButton-size': '32px',
                  opacity: 0.3,
                  color: 'text.tertiary',
                  borderColor: 'divider',
                }}
              >
                <Mic size={14} />
              </IconButton>
            </Box>

            {/* Text Input */}
            <Textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              minRows={1}
              maxRows={3}
              disabled={isProcessing}
              size="sm"
              sx={{
                flex: 1,
                order: { xs: 1, sm: 2 },
                bgcolor: 'background.body',
                borderColor: 'divider',
                color: 'text.primary',
                '--Textarea-focusedHighlight': 'primary.400',
                '--Textarea-focusedThickness': '2px',
                fontSize: 'sm',
                '&:hover': {
                  borderColor: 'primary.300',
                },
                '&::placeholder': {
                  color: 'text.tertiary',
                  opacity: 0.7,
                },
              }}
            />

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={(!userInput.trim() && !attachedImage) || isProcessing}
              loading={isProcessing}
              size="sm"
              sx={{
                minWidth: 36,
                height: 36,
                order: { xs: 1, sm: 3 },
                alignSelf: { xs: 'flex-end', sm: 'auto' },
                bgcolor: 'primary.500',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.600',
                },
                '&:disabled': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(156, 163, 175, 0.2)'
                      : 'rgba(156, 163, 175, 0.5)',
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(156, 163, 175, 0.6)'
                      : 'rgba(107, 114, 128, 0.8)',
                },
              }}
            >
              <Send size={14} />
            </Button>
          </Box>

          {/* Bottom Controls - Header-style layout */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1,
              mt: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography
                  level="body-xs"
                  sx={{
                    color: 'text.secondary',
                    fontSize: 'xs',
                    fontWeight: 500,
                  }}
                >
                  Stream:
                </Typography>
                <Switch
                  size="sm"
                  checked={isStreaming}
                  onChange={(e) => setIsStreaming(e.target.checked)}
                  sx={{
                    '--Switch-thumbSize': '12px',
                    '--Switch-trackWidth': '24px',
                    '--Switch-trackHeight': '14px',
                  }}
                />
              </Box>

              <Typography
                level="body-xs"
                sx={{
                  color: 'text.tertiary',
                  fontSize: 'xs',
                }}
              >
                Press Enter to send
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                level="body-xs"
                sx={{
                  color: 'text.secondary',
                  fontSize: 'xs',
                  fontWeight: 500,
                }}
              >
                {selectedModel?.name || 'No model selected'}
              </Typography>
              <Chip
                variant="soft"
                size="sm"
                color="success"
                sx={{
                  fontSize: 'xs',
                  py: 0.25,
                  px: 0.75,
                  minHeight: '18px',
                  fontWeight: 500,
                }}
              >
                Ready
              </Chip>
            </Box>
          </Box>
        </Box>
      </Sheet>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
    </Box>
  );
};

export default Playground;

import { Box, Typography } from '@mui/joy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import BottomNavigation from '../Welcome/BottomNavigation';
import TopNavigation from '../Welcome/TopNavigation';
import SectionFooter from './components/Footer/SectionFooter';
import Sidebar from './components/Navigation/Sidebar';
import ModelCatalogue from './sections/ModelCatalogue';
import Playground from './sections/Playground';
import SystemInfo from './sections/SystemInfo/SystemInfo';
import { NavigationSection, StudioProps } from './types';

// Placeholder component for sections not yet implemented
const PlaceholderSection: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <Box
    sx={{
      flex: 1,
      p: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Typography level="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        {description}
      </Typography>
      <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
        This section is coming soon!
      </Typography>
    </Box>
  </Box>
);

// Beautiful Coming Soon Modal - Exact design from provided code
const ComingSoonModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  description: string;
}> = ({ isOpen, onClose, feature, description }) => {
  // Add gradient and particle animation styles
  useEffect(() => {
    if (!isOpen) return;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        50% {
          opacity: 0.8;
        }
        75% {
          opacity: 0.4;
        }
        100% {
          transform: translateY(-150px) translateX(30px);
          opacity: 0;
        }
      }

      @keyframes modalSpring {
        0% {
          transform: scale(0.9) translateY(20px);
          opacity: 0;
        }
        100% {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
      }

      @keyframes progressBar {
        0% { width: 0; }
        100% { width: 40%; }
      }

      @keyframes backdropFadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Get current theme from Joy UI context
  const isDarkMode =
    document.documentElement.getAttribute('data-joy-color-scheme') === 'dark';

  // Get unique description for each feature
  const getFeatureDescription = (featureName: string) => {
    switch (featureName.toLowerCase()) {
      case 'readbuddy':
        return 'Your intelligent reading companion that helps you understand, summarize, and analyze any document. Get instant insights, explanations, and answers from your files.';
      case 'agent maker':
        return 'Create and customize AI agents for various tasks. Build intelligent agents that can understand context, make decisions, and execute complex workflows.';
      case 'ai assistant':
        return 'Your personalized AI assistant for everyday tasks. Get help with coding, writing, analysis, and more with our advanced AI assistant.';
      case 'api & tokens':
        return 'Access our powerful AI models through our API. Get API keys, manage tokens, and integrate AI capabilities into your applications.';
      case 'deployments':
        return 'Deploy and manage your AI models in production. Scale your applications with enterprise-grade deployment infrastructure and monitoring tools.';
      default:
        return description;
    }
  };

  const uniqueDescription = getFeatureDescription(feature);

  return (
    <div
      style={{
        position: 'fixed',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        style={{
          position: 'absolute',
          inset: '0',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          animation: 'backdropFadeIn 0.2s ease-out',
        }}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '576px', // max-w-xl
          marginLeft: '16px', // mx-4
          marginRight: '16px', // mx-4
          borderRadius: '12px', // rounded-xl
          overflow: 'hidden',
          background: isDarkMode ? '#111827' : '#ffffff', // bg-gray-900 : bg-white
          color: isDarkMode ? '#ffffff' : '#111827', // text-white : text-gray-900
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-xl
          border: '1px solid rgba(147, 51, 234, 0.2)', // border-purple-500/20
          zIndex: 10000,
          animation: 'modalSpring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Animated gradient header - reduced height */}
        <div
          style={{ height: '96px', overflow: 'hidden', position: 'relative' }}
        >
          {' '}
          {/* h-24 */}
          <div
            style={{
              position: 'absolute',
              inset: '0',
              background: 'linear-gradient(90deg, #4f46e5, #9333ea, #ec4899)', // from-indigo-600 via-purple-600 to-pink-600
              backgroundSize: '200% 200%',
              animation: 'gradientMove 8s ease infinite',
            }}
          />
          {/* Floating particles effect */}
          <div style={{ position: 'absolute', inset: '0' }}>
            {[...Array(10)].map(() => (
              <div
                key={`particle-${Math.random()}-${Date.now()}-${Math.random()}`}
                style={{
                  position: 'absolute',
                  borderRadius: '50%', // rounded-full
                  background: 'rgba(255, 255, 255, 0.3)', // bg-white/30
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
          {/* Content for the header - more compact */}
          <div
            style={{
              position: 'absolute',
              inset: '0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '24px', // px-6
              paddingRight: '24px', // px-6
            }}
          >
            <h3
              style={{
                fontSize: '20px', // text-xl
                fontWeight: '700', // font-bold
                color: 'white', // text-white
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', // drop-shadow-md
                margin: '0',
              }}
            >
              Coming Soon
            </h3>
            <div
              style={{
                height: '4px', // h-1
                background: 'rgba(255, 255, 255, 0.7)', // bg-white/70
                marginTop: '4px', // mt-1
                borderRadius: '9999px', // rounded-full
                animation: 'progressBar 0.8s ease 0.2s both',
              }}
            />
          </div>
          {/* Close button */}
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '12px', // top-3
              right: '12px', // right-3
              padding: '4px', // p-1
              borderRadius: '50%', // rounded-full
              background: 'rgba(0, 0, 0, 0.2)', // bg-black/20
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease', // transition-all
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
            }}
            onClick={onClose}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background =
                'rgba(0, 0, 0, 0.4)'; // hover:bg-black/40
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background =
                'rgba(0, 0, 0, 0.2)';
            }}
          >
            ×
          </button>
        </div>

        {/* Content - more compact */}
        <div
          style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
        >
          {' '}
          {/* p-4 flex flex-col */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
            {' '}
            {/* flex flex-row gap-6 */}
            <div style={{ flex: '1' }}>
              {' '}
              {/* flex-1 */}
              <h4
                style={{
                  fontSize: '18px', // text-lg
                  fontWeight: '600', // font-semibold
                  marginBottom: '4px', // mb-1
                  color: 'transparent', // text-transparent
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)', // bg-gradient-to-r from-purple-400 to-pink-500
                  WebkitBackgroundClip: 'text', // bg-clip-text
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 4px 0',
                }}
              >
                {feature}
              </h4>
              <p
                style={{
                  marginBottom: '12px', // mb-3
                  fontSize: '14px', // text-sm
                  color: isDarkMode ? '#d1d5db' : '#6b7280', // text-gray-300 : text-gray-600
                  margin: '0 0 12px 0',
                  lineHeight: '1.4',
                }}
              >
                {uniqueDescription}
              </p>
            </div>
          </div>
          {/* Excitement indicator */}
          <div
            style={{
              padding: '12px', // p-3
              borderRadius: '8px', // rounded-lg
              fontSize: '12px', // text-xs
              marginBottom: '12px', // mb-3
              background: isDarkMode ? 'rgba(88, 28, 135, 0.2)' : '#faf5ff', // bg-purple-900/20 : bg-purple-50
              color: isDarkMode ? '#c4b5fd' : '#7c3aed', // text-purple-300 : text-purple-700
            }}
          >
            <p style={{ margin: '0' }}>
              We&apos;re working hard to bring this feature to you soon! Your
              patience will be rewarded with a powerful AI experience.
            </p>
          </div>
          {/* Call to action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {' '}
            {/* flex justify-end */}
            <button
              type="button"
              onClick={onClose}
              style={{
                paddingLeft: '16px', // px-4
                paddingRight: '16px',
                paddingTop: '6px', // py-1.5
                paddingBottom: '6px',
                borderRadius: '8px', // rounded-lg
                fontSize: '14px', // text-sm
                fontWeight: '500', // font-medium
                transition: 'all 0.3s ease', // transition-all duration-300
                background: 'linear-gradient(90deg, #6366f1, #9333ea)', // bg-gradient-to-r from-indigo-500 to-purple-600
                color: 'white', // text-white
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-md
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background =
                  'linear-gradient(90deg, #4f46e5, #7c3aed)'; // hover:from-indigo-600 hover:to-purple-700
                target.style.boxShadow =
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'; // hover:shadow-lg
                target.style.transform = 'translateY(-2px)'; // hover:-translate-y-0.5
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.background =
                  'linear-gradient(90deg, #6366f1, #9333ea)';
                target.style.boxShadow =
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                target.style.transform = 'translateY(0)';
              }}
            >
              I&apos;m Excited!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolarisStudio: React.FC<StudioProps> = ({ darkMode, themeSetter }) => {
  // State management
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [comingSoonDescription, setComingSoonDescription] = useState('');
  const [activeSection, setActiveSection] = useState('catalogue');
  const [activeSidebarItem, setActiveSidebarItem] = useState('catalogue');

  // Handlers
  const handleSectionClick = (section: NavigationSection) => {
    if (section.comingSoon) {
      setComingSoonFeature(section.label);
      setComingSoonDescription(
        section.description ||
          `We're working hard to bring ${section.label} to you soon!`,
      );
      setShowComingSoonModal(true);
      return;
    }

    setActiveSection(section.id);
    setActiveSidebarItem(section.id);
  };

  // Render active section content
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'catalogue':
        return <ModelCatalogue />;
      case 'playground':
        return (
          <Playground
            darkMode={darkMode}
            onNavigateToSection={(sectionId: string) => {
              setActiveSection(sectionId);
              setActiveSidebarItem(sectionId);
            }}
          />
        );
      case 'readbuddy':
        return (
          <PlaceholderSection
            title="📚 ReadBuddy"
            description="Document chat and libraries for enhanced AI interactions."
          />
        );
      case 'deployments':
        return (
          <PlaceholderSection
            title="🚀 Deployments"
            description="View and manage your model deployments."
          />
        );
      case 'system':
        return <SystemInfo darkMode={darkMode} />;
      default:
        return (
          <PlaceholderSection
            title="🔧 Under Development"
            description="This section is being developed."
          />
        );
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <TopNavigation themeSetter={themeSetter} />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          px: 3,
          pt: 1.5,
          pb: 2,
          minHeight: 0,
          height: 'calc(100vh - 100px)', // 50px top nav + 50px bottom nav
        }}
      >
        <Box
          sx={{
            width: '99.8%',
            height: 'calc(100vh - 128px)', // 100px nav bars + 28px reduced padding
            margin: '0 auto',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
            borderRadius: 'sm',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            boxShadow: 'xl',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Layout: Left nav + main content */}
          <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Sidebar Navigation */}
            <Sidebar
              isSidebarExpanded={isSidebarExpanded}
              setIsSidebarExpanded={setIsSidebarExpanded}
              activeSidebarItem={activeSidebarItem}
              onSectionClick={handleSectionClick}
            />

            {/* Main Content Area */}
            <Box
              sx={{
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Section Content */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  pb: '40px', // Space for footer
                }}
              >
                {renderActiveSection()}
              </Box>

              {/* Section Footer */}
              <SectionFooter
                activeSection={activeSection}
                darkMode={darkMode}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modals */}
      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        feature={comingSoonFeature}
        description={comingSoonDescription}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </Box>
  );
};

// PropTypes validation
PolarisStudio.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  themeSetter: PropTypes.func.isRequired,
};

export default PolarisStudio;

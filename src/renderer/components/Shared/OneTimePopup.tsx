import React, { useEffect, useState } from 'react';

interface OneTimePopupProps {
  title: string;
  children: React.ReactNode;
  onGetStarted?: () => void;
}

export default function OneTimePopup({
  title,
  children,
  onGetStarted,
}: OneTimePopupProps) {
  const [open, setOpen] = useState(false);

  const localStorageKey = `oneTimePopup#${title}`;

  // Check Local Storage if this popup has been shown before:
  useEffect(() => {
    const hasShownBefore = localStorage.getItem(localStorageKey);
    if (!hasShownBefore) {
      setOpen(true);
    }
  }, [localStorageKey]);

  function handleClose() {
    localStorage.setItem(localStorageKey, 'shown');
    setOpen(false);
  }

  // Add gradient and particle animation styles - exactly like framer-motion version
  useEffect(() => {
    if (!open) return;

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
    `;
    document.head.appendChild(styleElement);

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [open]);

  // Move the early return after all hooks to maintain hook order
  if (!open) return null;

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
        style={{
          position: 'absolute',
          inset: '0',
          background: 'rgba(0, 0, 0, 0.5)', // bg-black/50
          backdropFilter: 'blur(4px)', // backdrop-blur-sm
        }}
        onClick={handleClose}
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
          background: '#ffffff', // bg-white
          color: '#111827', // text-gray-900
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-xl
          border: '1px solid rgba(147, 51, 234, 0.2)', // border-purple-500/20
          zIndex: 10000,
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
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
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
                fontSize: '16px', // smaller font
                fontWeight: '600', // slightly bold
                color: 'white', // text-white
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', // drop-shadow-md
                margin: '0',
              }}
            >
              PolarisLLM
            </h3>
            <div
              style={{
                width: '40%',
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
            onClick={handleClose}
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
                  fontSize: '16px', // smaller font
                  fontWeight: '600', // slightly bold
                  marginBottom: '4px', // mb-1
                  color: 'transparent', // text-transparent
                  background: 'linear-gradient(90deg, #a855f7, #ec4899)', // bg-gradient-to-r from-purple-400 to-pink-500
                  WebkitBackgroundClip: 'text', // bg-clip-text
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 4px 0',
                }}
              >
                Your one stop place for LLM deployment
              </h4>
              <p
                style={{
                  marginBottom: '12px', // mb-3
                  fontSize: '14px', // text-sm
                  color: '#6b7280', // text-gray-600
                  margin: '0 0 12px 0',
                  lineHeight: '1.4',
                }}
              >
                {children}
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
              background: '#faf5ff', // bg-purple-50
              color: '#7c3aed', // text-purple-700
            }}
          >
            <p style={{ margin: '0' }}>
              Deploy any LLM with one command, manage with unified tools, access
              with standard APIs.
            </p>
          </div>
          {/* Call to action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {' '}
            {/* flex justify-end */}
            <button
              type="button"
              onClick={() => {
                handleClose();
                onGetStarted?.();
              }}
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
              Get Started!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

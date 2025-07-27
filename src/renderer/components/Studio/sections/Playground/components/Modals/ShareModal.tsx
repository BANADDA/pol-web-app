import { Copy, Download, RefreshCw, Trash2, X } from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareLink: string;
  passkey: string;
  onRegeneratePasskey: () => void;
  onRemoveLink: () => void;
  onDownload: () => void;
  darkMode: boolean;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareLink,
  passkey,
  onRegeneratePasskey,
  onRemoveLink,
  onDownload,
  darkMode,
}) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You might want to show a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md mx-4 rounded-lg shadow-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <h3 className="text-lg font-semibold">Share Playground</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-opacity-10 ${darkMode ? 'hover:bg-white' : 'hover:bg-black'}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium mb-2">Share Link</label>
            <div className="flex">
              <input
                type="text"
                value={shareLink}
                readOnly
                className={`flex-1 px-3 py-2 text-sm border rounded-l-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
              />
              <button
                onClick={() => copyToClipboard(shareLink)}
                className={`px-3 py-2 border-l-0 border rounded-r-md ${darkMode ? 'bg-gray-600 border-gray-600 hover:bg-gray-500' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Passkey */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Access Passkey
            </label>
            <div className="flex">
              <input
                type="text"
                value={passkey}
                readOnly
                className={`flex-1 px-3 py-2 text-sm border rounded-l-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
              />
              <button
                onClick={() => copyToClipboard(passkey)}
                className={`px-3 py-2 border-l-0 border ${darkMode ? 'bg-gray-600 border-gray-600 hover:bg-gray-500' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={onRegeneratePasskey}
                className={`px-3 py-2 border-l-0 border rounded-r-md ${darkMode ? 'bg-gray-600 border-gray-600 hover:bg-gray-500' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={onDownload}
              className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              <Download className="h-4 w-4 mr-2" />
              Download HTML
            </button>
            <button
              onClick={onRemoveLink}
              className={`flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shareLink: PropTypes.string.isRequired,
  passkey: PropTypes.string.isRequired,
  onRegeneratePasskey: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ShareModal;

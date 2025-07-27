import React from 'react';

interface MarkdownProps {
  children: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  // Simple markdown-like rendering - you can replace this with a proper markdown library later
  const renderMarkdown = (text: string) => {
    if (!text) return '';

    // Basic markdown patterns
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    return `<p>${html}</p>`;
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: renderMarkdown(children),
      }}
    />
  );
};

export default Markdown;

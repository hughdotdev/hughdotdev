'use client';

import { useEffect, useRef, useCallback } from 'react';
import { 
  TOOLTIP_CLASS,
  TOOLTIP_ELEMENT_CLASS
} from '@/lib/markdown';

interface MarkdownRendererProps {
  content: string;
}

function getTokyoTime(): string {
  const now = new Date();
  
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);
}

function processTooltipLinks(container: HTMLElement) {
  const normalLinks = container.querySelectorAll('a:not(.magic-link)');
  
  normalLinks.forEach((link) => {
    if (link.classList.contains(TOOLTIP_CLASS)) {
      return;
    }
    
    const title = link.getAttribute('title');
    
    if (title && (title.startsWith('http') || title.startsWith('/'))) {
      link.classList.add(TOOLTIP_CLASS);
      
      const tooltip = document.createElement('span');
      tooltip.className = TOOLTIP_ELEMENT_CLASS;
      tooltip.style.backgroundImage = `url('${title}')`;
      
      link.appendChild(tooltip);
      link.removeAttribute('title');
    }
  });
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const processContent = useCallback(() => {
    if (!containerRef.current) return;
    
    processTooltipLinks(containerRef.current);
  }, []);

  useEffect(() => {
    processContent();
  }, [content, processContent]);

  useEffect(() => {
    const updateTokyoTime = () => {
      if (!containerRef.current) return;
      
      const timeElements = containerRef.current.querySelectorAll('[data-tokyo-time]');
      const currentTime = getTokyoTime();
      
      timeElements.forEach((element) => {
        element.textContent = currentTime;
      });
    };

    updateTokyoTime();

    const interval = setInterval(updateTokyoTime, 1000);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div 
      ref={containerRef}
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}


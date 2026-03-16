import React from 'react';
import { motion } from 'motion/react';
import { ASSETS } from '../constants';

interface AIScanImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const AIScanImage: React.FC<AIScanImageProps> = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="ai-scan-overlay">
        <div className="ai-scan-line" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-sphinx-black/80 via-transparent to-transparent" />
    </div>
  );
};

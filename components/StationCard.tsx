"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface StationCardProps {
  name: string;
  frequency: string;
  format: string;
  logo: string;
  description: string;
  fullContent: string;
  color: string;
  onReadMore: () => void;
}

const StationCard: React.FC<StationCardProps> = ({
  name,
  frequency,
  format,
  logo,
  description,
  color,
  onReadMore
}) => {
  return (
    <motion.div
      className="station-card"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="glassmorphic-card" 
        style={{ 
          borderColor: color,
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px ${color}40`
        }}
      >
        <div className="card-header" style={{ backgroundColor: `${color}20` }}>
          <div className="logo-container">
            <Image 
              src={logo} 
              alt={`${name} logo`} 
              width={80} 
              height={80} 
              className="station-logo"
            />
          </div>
          <div className="station-info">
            <h3 className="station-name">{name}</h3>
            <p className="station-frequency">{frequency}</p>
            <p className="station-format">{format}</p>
          </div>
        </div>
        <div className="card-body">
          <p className="station-description">{description}</p>
          <button 
            className="read-more-btn" 
            onClick={onReadMore}
            style={{ backgroundColor: color }}
          >
            Read More
          </button>
        </div>
      </div>
      <style jsx>{`
        .glassmorphic-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .card-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .logo-container {
          flex-shrink: 0;
        }
        
        .station-logo {
          border-radius: 50%;
          object-fit: cover;
        }
        
        .station-info {
          flex-grow: 1;
        }
        
        .station-name {
          margin: 0 0 0.25rem;
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        .station-frequency {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .station-format {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }
        
        .card-body {
          padding: 0 1.5rem 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .station-description {
          margin: 0 0 1.5rem;
          font-size: 0.9rem;
          line-height: 1.5;
          flex-grow: 1;
        }
        
        .read-more-btn {
          align-self: flex-end;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        
        .read-more-btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </motion.div>
  );
};

export default StationCard;
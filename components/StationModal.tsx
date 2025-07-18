"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface StationModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: {
    name: string;
    frequency: string;
    format: string;
    logo: string;
    fullContent: string;
    color: string;
  } | null;
}

const StationModal: React.FC<StationModalProps> = ({ isOpen, onClose, station }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!station) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div 
              className="modal-content glassmorphic-modal"
              style={{ 
                borderColor: station.color,
                boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px ${station.color}40`
              }}
            >
              <div className="modal-header" style={{ backgroundColor: `${station.color}20` }}>
                <div className="modal-logo-container">
                  <Image 
                    src={station.logo} 
                    alt={`${station.name} logo`} 
                    width={100} 
                    height={100} 
                    className="modal-station-logo"
                  />
                </div>
                <div className="modal-station-info">
                  <h2 className="modal-station-name">{station.name}</h2>
                  <p className="modal-station-frequency">{station.frequency}</p>
                  <p className="modal-station-format">{station.format}</p>
                </div>
                <button 
                  className="modal-close-btn"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-station-content" dangerouslySetInnerHTML={{ __html: station.fullContent }} />
              </div>
            </div>
          </motion.div>
          <style jsx>{`
            .modal-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 1000;
            }
            
            .modal-container {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1001;
              width: 90%;
              max-width: 800px;
              max-height: 90vh;
            }
            
            .glassmorphic-modal {
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.18);
              border-radius: 12px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              max-height: 90vh;
            }
            
            .modal-header {
              padding: 1.5rem;
              display: flex;
              align-items: center;
              position: relative;
            }
            
            .modal-logo-container {
              margin-right: 1.5rem;
            }
            
            .modal-station-logo {
              border-radius: 50%;
              object-fit: cover;
            }
            
            .modal-station-info {
              flex-grow: 1;
            }
            
            .modal-station-name {
              margin: 0 0 0.25rem;
              font-size: 1.75rem;
              font-weight: 700;
            }
            
            .modal-station-frequency {
              margin: 0 0 0.25rem;
              font-size: 1.25rem;
              font-weight: 600;
            }
            
            .modal-station-format {
              margin: 0;
              font-size: 1rem;
              opacity: 0.8;
            }
            
            .modal-close-btn {
              position: absolute;
              top: 1rem;
              right: 1rem;
              background: none;
              border: none;
              font-size: 2rem;
              cursor: pointer;
              line-height: 1;
              padding: 0;
              width: 2rem;
              height: 2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              transition: background-color 0.2s ease;
            }
            
            .modal-close-btn:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
            
            .modal-body {
              padding: 0 1.5rem 1.5rem;
              overflow-y: auto;
              max-height: calc(90vh - 150px);
            }
            
            .modal-station-content {
              font-size: 1rem;
              line-height: 1.6;
            }
            
            .modal-station-content h3 {
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              font-size: 1.25rem;
              font-weight: 600;
            }
            
            .modal-station-content p {
              margin-bottom: 1rem;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default StationModal;
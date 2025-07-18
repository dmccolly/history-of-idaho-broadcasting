"use client";

import React, { useState, useEffect } from 'react';
import StationCard from './StationCard';
import StationModal from './StationModal';
import { motion } from 'framer-motion';

interface Station {
  id: string;
  name: string;
  frequency: string;
  format: string;
  logo: string;
  description: string;
  fullContent: string;
  color: string;
}

interface StationsPageProps {
  stations: Station[];
}

const StationsPage: React.FC<StationsPageProps> = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);
  
  // Get unique formats for filter buttons
  const formats = [...new Set(stations.map(station => station.format))];
  
  useEffect(() => {
    if (activeFilter) {
      setFilteredStations(stations.filter(station => station.format === activeFilter));
    } else {
      setFilteredStations(stations);
    }
  }, [activeFilter, stations]);
  
  const handleReadMore = (station: Station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleFilterClick = (format: string) => {
    setActiveFilter(activeFilter === format ? null : format);
  };

  return (
    <div className="stations-page-container">
      <div className="page-header">
        <h1 className="page-title">Our Radio Stations</h1>
        <p className="page-description">
          Discover our diverse portfolio of radio stations serving the Boise area and beyond.
          Each station has its own unique format and history, catering to different audiences and interests.
        </p>
      </div>
      
      <div className="filter-container">
        <button 
          className={`filter-btn ${activeFilter === null ? 'active' : ''}`}
          onClick={() => setActiveFilter(null)}
        >
          All
        </button>
        {formats.map(format => (
          <button 
            key={format}
            className={`filter-btn ${activeFilter === format ? 'active' : ''}`}
            onClick={() => handleFilterClick(format)}
          >
            {format}
          </button>
        ))}
      </div>
      
      <motion.div 
        className="stations-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {filteredStations.map(station => (
          <motion.div 
            key={station.id}
            className="station-grid-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StationCard
              name={station.name}
              frequency={station.frequency}
              format={station.format}
              logo={station.logo}
              description={station.description}
              fullContent={station.fullContent}
              color={station.color}
              onReadMore={() => handleReadMore(station)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <StationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        station={selectedStation}
      />
      
      <style jsx>{`
        .stations-page-container {
          padding: 2rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .page-description {
          font-size: 1.1rem;
          max-width: 800px;
          margin: 0 auto;
          opacity: 0.8;
        }
        
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        
        .filter-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 20px;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .filter-btn.active {
          background-color: #0070f3;
          color: white;
          border-color: #0070f3;
        }
        
        .stations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        
        @media (max-width: 1024px) {
          .stations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .stations-grid {
            grid-template-columns: 1fr;
          }
          
          .page-title {
            font-size: 2rem;
          }
        }
        
        .station-grid-item {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default StationsPage;
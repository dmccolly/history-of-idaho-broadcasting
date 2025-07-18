
import React, { useState, useEffect, useRef } from 'react';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Draggable } from 'react-draggable';
import { Resizable } from 're-resizable';

const StationsPage = ({ blok }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStation, setSelectedStation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleReadMore = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStation(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const filteredStations = activeFilter === 'All'
    ? blok.stations
    : blok.stations.filter(station => station.format === activeFilter);

  const formatButtons = ['All', ...new Set(blok.stations.map(station => station.format))];

  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">{blok.title}</h1>
      <p className="text-lg text-center mb-8">{blok.description}</p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {formatButtons.map((format, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full ${
              activeFilter === format
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => handleFilterClick(format)}
          >
            {format}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.map((station, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-6 rounded-lg shadow-md ${
              station.format === 'Adult Album Alternative (AAA)'
                ? 'bg-blue-50 border-blue-200'
                : station.format === 'Sports'
                ? 'bg-red-50 border-red-200'
                : station.format === 'News/Talk'
                ? 'bg-gray-50 border-gray-200'
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                <img
                  src={station.logo?.filename || '/placeholder-logo.png'}
                  alt={`${station.callSign} logo`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{station.callSign}</h2>
                <p className="text-blue-600">{station.frequency}</p>
                <p className="text-sm text-gray-600">{station.format}</p>
              </div>
            </div>
            <p className="mb-4 line-clamp-3">{station.description}</p>
            <button
              onClick={() => handleReadMore(station)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Read More
            </button>
          </motion.div>
        ))}
      </div>

      {isModalOpen && selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Draggable handle=".modal-handle">
            <Resizable
              defaultSize={{
                width: '80%',
                height: '80%',
              }}
              minWidth="300px"
              minHeight="300px"
              maxWidth="95%"
              maxHeight="95%"
              className="modal-container"
            >
              <div 
                ref={modalRef} 
                className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="modal-handle bg-gray-100 p-4 flex justify-between items-center cursor-move">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                      <img
                        src={selectedStation.logo?.filename || '/placeholder-logo.png'}
                        alt={`${selectedStation.callSign} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedStation.callSign}</h2>
                      <p className="text-blue-600">{selectedStation.frequency}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-6 overflow-y-auto flex-grow">
                  <h3 className="text-2xl font-bold mb-4">
                    History of {selectedStation.callSign} {selectedStation.frequency} "{selectedStation.nickname}"
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: selectedStation.history }} />
                </div>
              </div>
            </Resizable>
          </Draggable>
        </div>
      )}
    </div>
  );
};

export default StationsPage;


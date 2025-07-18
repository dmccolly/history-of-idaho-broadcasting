"use client";

import React, { useState, useEffect, useRef } from 'react';
import { storyblokEditable } from "@storyblok/react";

const StationsPage = ({ blok }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedStation, setSelectedStation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: '80%', height: '80%' });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleReadMore = (station) => {
    setSelectedStation(station);
    setIsModalOpen(true);
    setPosition({ x: 0, y: 0 });
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

  // Handle modal dragging
  const startDrag = (e) => {
    if (e.target.classList.contains('modal-handle')) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const onDrag = (e) => {
    if (isDragging) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Handle modal resizing
  const startResize = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setStartPos({ x: e.clientX, y: e.clientY });
    
    const modalElement = modalRef.current;
    if (modalElement) {
      setStartSize({
        width: modalElement.offsetWidth,
        height: modalElement.offsetHeight
      });
    }
  };

  const onResize = (e) => {
    if (!isResizing) return;
    
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    
    let newWidth = startSize.width;
    let newHeight = startSize.height;
    
    if (resizeDirection.includes('e')) {
      newWidth = Math.max(300, startSize.width + dx);
    } else if (resizeDirection.includes('w')) {
      newWidth = Math.max(300, startSize.width - dx);
      if (newWidth !== startSize.width - dx) {
        // Adjust position if we hit min width
        const adjustX = startSize.width - dx - newWidth;
        setPosition(prev => ({ ...prev, x: prev.x + adjustX }));
      } else {
        setPosition(prev => ({ ...prev, x: prev.x + dx }));
      }
    }
    
    if (resizeDirection.includes('s')) {
      newHeight = Math.max(300, startSize.height + dy);
    } else if (resizeDirection.includes('n')) {
      newHeight = Math.max(300, startSize.height - dy);
      if (newHeight !== startSize.height - dy) {
        // Adjust position if we hit min height
        const adjustY = startSize.height - dy - newHeight;
        setPosition(prev => ({ ...prev, y: prev.y + adjustY }));
      } else {
        setPosition(prev => ({ ...prev, y: prev.y + dy }));
      }
    }
    
    setSize({
      width: newWidth,
      height: newHeight
    });
  };

  const endResize = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', isDragging ? onDrag : onResize);
      document.addEventListener('mouseup', isDragging ? endDrag : endResize);
    }
    
    return () => {
      document.removeEventListener('mousemove', isDragging ? onDrag : onResize);
      document.removeEventListener('mouseup', isDragging ? endDrag : endResize);
    };
  }, [isDragging, isResizing]);

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
          <div
            key={index}
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
          </div>
        ))}
      </div>

      {isModalOpen && selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef} 
            className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col relative"
            style={{
              width: typeof size.width === 'number' ? `${size.width}px` : size.width,
              height: typeof size.height === 'number' ? `${size.height}px` : size.height,
              transform: `translate(${position.x}px, ${position.y}px)`,
              maxWidth: '95%',
              maxHeight: '95%',
              minWidth: '300px',
              minHeight: '300px'
            }}
          >
            <div 
              className="modal-handle bg-gray-100 p-4 flex justify-between items-center cursor-move"
              onMouseDown={startDrag}
            >
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
            
            {/* Resize handles */}
            <div className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize" onMouseDown={(e) => startResize(e, 'nw')}></div>
            <div className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize" onMouseDown={(e) => startResize(e, 'ne')}></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize" onMouseDown={(e) => startResize(e, 'sw')}></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" onMouseDown={(e) => startResize(e, 'se')}></div>
            <div className="absolute top-0 left-4 right-4 h-2 cursor-ns-resize" onMouseDown={(e) => startResize(e, 'n')}></div>
            <div className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize" onMouseDown={(e) => startResize(e, 's')}></div>
            <div className="absolute left-0 top-4 bottom-4 w-2 cursor-ew-resize" onMouseDown={(e) => startResize(e, 'w')}></div>
            <div className="absolute right-0 top-4 bottom-4 w-2 cursor-ew-resize" onMouseDown={(e) => startResize(e, 'e')}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationsPage;

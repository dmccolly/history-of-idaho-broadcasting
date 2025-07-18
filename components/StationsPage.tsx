"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  title?: string;
  description?: string;
}

const StationsPage: React.FC<StationsPageProps> = ({ 
  stations,
  title = "Our Radio Stations",
  description = "Discover our diverse portfolio of radio stations serving the Boise area and beyond. Each station has its own unique format and history, catering to different audiences and interests."
}) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  
  // Get unique formats for filter buttons
  const formats = [...new Set(stations.map(station => station.format))];
  
  useEffect(() => {
    if (activeFilter) {
      setFilteredStations(stations.filter(station => station.format === activeFilter));
    } else {
      setFilteredStations(stations);
    }
  }, [activeFilter, stations]);
  
  // Modal enhancement functionality
  useEffect(() => {
    if (isModalOpen && modalContainerRef.current) {
      const modalContainer = modalContainerRef.current;
      
      // Make the modal draggable
      makeDraggable(modalContainer);
      
      // Make the modal resizable
      makeResizable(modalContainer);
      
      // Modify modal styles
      modalContainer.style.position = 'absolute';
      modalContainer.style.transform = 'none';
      modalContainer.style.top = '10%';
      modalContainer.style.left = '10%';
      modalContainer.style.width = '80%';
      modalContainer.style.height = '80%';
      
      // Adjust modal content
      const modalContent = modalContainer.querySelector('.glassmorphic-modal');
      if (modalContent instanceof HTMLElement) {
        modalContent.style.height = '100%';
        
        // Adjust the modal body
        const modalHeader = modalContent.querySelector('.modal-header');
        const modalBody = modalContent.querySelector('.modal-body');
        if (modalHeader instanceof HTMLElement && modalBody instanceof HTMLElement) {
          const headerHeight = modalHeader.offsetHeight;
          modalBody.style.height = `calc(100% - ${headerHeight}px)`;
          modalBody.style.maxHeight = 'none';
        }
      }
    }
  }, [isModalOpen]);
  
  // Function to make an element draggable
  const makeDraggable = (element: HTMLElement) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Get the header element to use as the drag handle
    const header = element.querySelector('.modal-header');
    if (header) {
      (header as HTMLElement).style.cursor = 'move';
      (header as HTMLElement).onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };
  
  // Function to make an element resizable
  const makeResizable = (element: HTMLElement) => {
    // Create and append resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.width = '15px';
    resizeHandle.style.height = '15px';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.right = '0';
    resizeHandle.style.cursor = 'nwse-resize';
    resizeHandle.style.zIndex = '1002';
    
    // Add a visual indicator for the resize handle
    resizeHandle.innerHTML = `

Svg
`;

element.appendChild(resizeHandle);

// Variables for resize
let startX: number, startY: number, startWidth: number, startHeight: number;

// Add event listeners for resizing
resizeHandle.addEventListener('mousedown', initResize, false);

function initResize(e: MouseEvent) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView!.getComputedStyle(element).width, 10);
  startHeight = parseInt(document.defaultView!.getComputedStyle(element).height, 10);
  document.addEventListener('mousemove', doResize, false);
  document.addEventListener('mouseup', stopResize, false);
}

function doResize(e: MouseEvent) {
  // Calculate new width and height
  const newWidth = startWidth + e.clientX - startX;
  const newHeight = startHeight + e.clientY - startY;
  
  // Apply new dimensions with minimum size constraints
  element.style.width = Math.max(300, newWidth) + 'px';
  element.style.height = Math.max(200, newHeight) + 'px';
  
  // Adjust the modal body height to maintain scrolling
  const modalHeader = element.querySelector('.modal-header');
  const modalBody = element.querySelector('.modal-body');
  if (modalHeader instanceof HTMLElement && modalBody instanceof HTMLElement) {
    const headerHeight = modalHeader.offsetHeight;
    modalBody.style.height = `calc(${element.style.height} - ${headerHeight}px)`;
  }
}

function stopResize() {
  document.removeEventListener('mousemove', doResize, false);
  document.removeEventListener('mouseup', stopResize, false);
}
};

const handleReadMore = (station: Station) => { setSelectedStation(station); setIsModalOpen(true); };

const handleCloseModal = () => { setIsModalOpen(false); };

const handleFilterClick = (format: string) => { setActiveFilter(activeFilter === format ? null : format); };

return (


Div

Div
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

Div

Style
</div>
); };

export default StationsPage;

This modified version:

1. Adds a `modalContainerRef` to get a reference to the modal container
2. Implements the `makeDraggable` and `makeResizable` functions directly in the component
3. Uses a `useEffect` hook to apply the enhancements when the modal is opened
4. Adds the necessary CSS styles for the modal enhancements
5. Wraps the `StationModal` component in a div with the ref

This approach integrates the modal enhancement functionality directly into your StationsPage component, eliminating the need for a separate JavaScript file.

Complete
Rate the response

Tell us why?

Incorrect

Poor

Fair

Good

Superb
What?  I need a single pastable document

Super Agent
I apologize for the confusion. Here's the complete, pastable StationsPage component with the modal enhancement functionality integrated:

"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  title?: string;
  description?: string;
}

const StationsPage: React.FC<StationsPageProps> = ({ 
  stations,
  title = "Our Radio Stations",
  description = "Discover our diverse portfolio of radio stations serving the Boise area and beyond. Each station has its own unique format and history, catering to different audiences and interests."
}) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  
  // Get unique formats for filter buttons
  const formats = [...new Set(stations.map(station => station.format))];
  
  useEffect(() => {
    if (activeFilter) {
      setFilteredStations(stations.filter(station => station.format === activeFilter));
    } else {
      setFilteredStations(stations);
    }
  }, [activeFilter, stations]);
  
  // Modal enhancement functionality
  useEffect(() => {
    if (isModalOpen && modalContainerRef.current) {
      const modalContainer = modalContainerRef.current;
      
      // Make the modal draggable
      makeDraggable(modalContainer);
      
      // Make the modal resizable
      makeResizable(modalContainer);
      
      // Modify modal styles
      modalContainer.style.position = 'absolute';
      modalContainer.style.transform = 'none';
      modalContainer.style.top = '10%';
      modalContainer.style.left = '10%';
      modalContainer.style.width = '80%';
      modalContainer.style.height = '80%';
      
      // Adjust modal content
      const modalContent = modalContainer.querySelector('.glassmorphic-modal');
      if (modalContent instanceof HTMLElement) {
        modalContent.style.height = '100%';
        
        // Adjust the modal body
        const modalHeader = modalContent.querySelector('.modal-header');
        const modalBody = modalContent.querySelector('.modal-body');
        if (modalHeader instanceof HTMLElement && modalBody instanceof HTMLElement) {
          const headerHeight = modalHeader.offsetHeight;
          modalBody.style.height = `calc(100% - ${headerHeight}px)`;
          modalBody.style.maxHeight = 'none';
        }
      }
    }
  }, [isModalOpen]);
  
  // Function to make an element draggable
  const makeDraggable = (element: HTMLElement) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Get the header element to use as the drag handle
    const header = element.querySelector('.modal-header');
    if (header) {
      (header as HTMLElement).style.cursor = 'move';
      (header as HTMLElement).onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };
  
  // Function to make an element resizable
  const makeResizable = (element: HTMLElement) => {
    // Create and append resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.width = '15px';
    resizeHandle.style.height = '15px';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.right = '0';
    resizeHandle.style.cursor = 'nwse-resize';
    resizeHandle.style.zIndex = '1002';
    
    // Add a visual indicator for the resize handle
    resizeHandle.innerHTML = `

Svg
`;

element.appendChild(resizeHandle);

// Variables for resize
let startX: number, startY: number, startWidth: number, startHeight: number;

// Add event listeners for resizing
resizeHandle.addEventListener('mousedown', initResize, false);

function initResize(e: MouseEvent) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView!.getComputedStyle(element).width, 10);
  startHeight = parseInt(document.defaultView!.getComputedStyle(element).height, 10);
  document.addEventListener('mousemove', doResize, false);
  document.addEventListener('mouseup', stopResize, false);
}

function doResize(e: MouseEvent) {
  // Calculate new width and height
  const newWidth = startWidth + e.clientX - startX;
  const newHeight = startHeight + e.clientY - startY;
  
  // Apply new dimensions with minimum size constraints
  element.style.width = Math.max(300, newWidth) + 'px';
  element.style.height = Math.max(200, newHeight) + 'px';
  
  // Adjust the modal body height to maintain scrolling
  const modalHeader = element.querySelector('.modal-header');
  const modalBody = element.querySelector('.modal-body');
  if (modalHeader instanceof HTMLElement && modalBody instanceof HTMLElement) {
    const headerHeight = modalHeader.offsetHeight;
    modalBody.style.height = `calc(${element.style.height} - ${headerHeight}px)`;
  }
}

function stopResize() {
  document.removeEventListener('mousemove', doResize, false);
  document.removeEventListener('mouseup', stopResize, false);
}
};

const handleReadMore = (station: Station) => { setSelectedStation(station); setIsModalOpen(true); };

const handleCloseModal = () => { setIsModalOpen(false); };

const handleFilterClick = (format: string) => { setActiveFilter(activeFilter === format ? null : format); };

return (


Div

Div
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

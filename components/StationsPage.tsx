"use client";

import React, { useState, useEffect, useRef } from 'react';
import StationCard from './StationCard';
import StationModal from './StationModal';
import { motion } from 'framer-motion';

const StationsPage = ({ 
  stations,
  title = "Our Radio Stations",
  description = "Discover our diverse portfolio of radio stations serving the Boise area and beyond. Each station has its own unique format and history, catering to different audiences and interests."
}) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredStations, setFilteredStations] = useState(stations);
  const modalContainerRef = useRef(null);
  
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
      const modalContainer = modalContainerRef.current.querySelector('.modal-container');
      if (modalContainer) {
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
        if (modalContent) {
          modalContent.style.height = '100%';
          
          // Adjust the modal body
          const modalHeader = modalContent.querySelector('.modal-header');
          const modalBody = modalContent.querySelector('.modal-body');
          if (modalHeader && modalBody) {
            const headerHeight = modalHeader.offsetHeight;
            modalBody.style.height = `calc(100% - ${headerHeight}px)`;
            modalBody.style.maxHeight = 'none';
          }
        }
      }
    }
  }, [isModalOpen]);
  
  // Function to make an element draggable
  const makeDraggable = (element) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Get the header element to use as the drag handle
    const header = element.querySelector('.modal-header');
    if (header) {
      header.style.cursor = 'move';
      header.onmousedown = dragMouseDown;
    } else {
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // Call a function whenever the cursor moves
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
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
  const makeResizable = (element) => {
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

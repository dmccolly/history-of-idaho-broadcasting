/**
 * Modal Enhancement Script for Storyblok Site
 * This script adds draggable and resizable functionality to the station modals
 * 
 * Simply add this script to your site's head or body section
 */

// Add the CSS styles
(function() {
  const style = document.createElement('style');
  style.textContent = `
    /* Modal enhancements for draggable and resizable functionality */

    /* Override the fixed positioning of the modal container */
    .modal-container {
      position: absolute !important;
      transform: none !important;
      top: 10% !important;
      left: 10% !important;
      width: 80% !important;
      height: 80% !important;
      max-height: none !important;
      transition: none !important;
    }

    /* Make the modal content fill the container */
    .glassmorphic-modal {
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* Style the modal header for dragging */
    .modal-header {
      cursor: move !important;
      user-select: none !important;
    }

    /* Adjust the modal body to take remaining space */
    .modal-body {
      flex: 1 !important;
      overflow-y: auto !important;
      max-height: none !important;
    }

    /* Style for the resize handle */
    .resize-handle {
      position: absolute;
      width: 15px;
      height: 15px;
      bottom: 0;
      right: 0;
      cursor: nwse-resize;
      z-index: 1002;
    }

    /* Add a visual indicator for the resize handle */
    .resize-handle::after {
      content: "";
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 9px;
      height: 9px;
      border-right: 2px solid rgba(0, 0, 0, 0.3);
      border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    }

    /* Ensure the modal backdrop covers the entire screen */
    .modal-backdrop {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 999 !important;
    }
  `;
  document.head.appendChild(style);
})();

// Add the JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Function to make an element draggable
  function makeDraggable(element) {
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
  }

  // Function to make an element resizable
  function makeResizable(element) {
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
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 1L1 14" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
        <path d="M8 14L14 8" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
        <path d="M11 14L14 11" stroke="rgba(0,0,0,0.3)" stroke-width="2"/>
      </svg>
    `;
    
    element.appendChild(resizeHandle);

    // Variables for resize
    let startX, startY, startWidth, startHeight;

    // Add event listeners for resizing
    resizeHandle.addEventListener('mousedown', initResize, false);

    function initResize(e) {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
      document.addEventListener('mousemove', doResize, false);
      document.addEventListener('mouseup', stopResize, false);
    }

    function doResize(e) {
      // Calculate new width and height
      const newWidth = startWidth + e.clientX - startX;
      const newHeight = startHeight + e.clientY - startY;
      
      // Apply new dimensions with minimum size constraints
      element.style.width = Math.max(300, newWidth) + 'px';
      element.style.height = Math.max(200, newHeight) + 'px';
      
      // Adjust the modal body height to maintain scrolling
      const modalHeader = element.querySelector('.modal-header');
      const modalBody = element.querySelector('.modal-body');
      if (modalHeader && modalBody) {
        const headerHeight = modalHeader.offsetHeight;
        modalBody.style.height = `calc(${element.style.height} - ${headerHeight}px)`;
      }
    }

    function stopResize() {
      document.removeEventListener('mousemove', doResize, false);
      document.removeEventListener('mouseup', stopResize, false);
    }
  }

  // Function to apply modifications to modals
  function setupModalModifications() {
    // Create a MutationObserver to detect when modals are added to the DOM
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.classList && node.classList.contains('modal-container')) {
              // Found a modal container, modify it
              modifyModal(node);
            }
          }
        }
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Function to modify a modal
  function modifyModal(modalContainer) {
    // Remove the fixed positioning and transform
    modalContainer.style.position = 'absolute';
    modalContainer.style.transform = 'none';
    modalContainer.style.top = '10%';
    modalContainer.style.left = '10%';
    modalContainer.style.width = '80%';
    modalContainer.style.height = '80%';
    
    // Make the modal content fill the container
    const modalContent = modalContainer.querySelector('.glassmorphic-modal');
    if (modalContent) {
      modalContent.style.height = '100%';
      
      // Adjust the modal body to take remaining space
      const modalHeader = modalContent.querySelector('.modal-header');
      const modalBody = modalContent.querySelector('.modal-body');
      if (modalHeader && modalBody) {
        const headerHeight = modalHeader.offsetHeight;
        modalBody.style.height = `calc(100% - ${headerHeight}px)`;
        modalBody.style.maxHeight = 'none';
      }
    }
    
    // Make the modal draggable
    makeDraggable(modalContainer);
    
    // Make the modal resizable
    makeResizable(modalContainer);
  }

  // Set up the modal modifications
  setupModalModifications();
});

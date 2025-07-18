"use client";

import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import StationsPageComponent from '../StationsPage';
import stationData from '../../app/stations/station-data';

interface StationItem {
  id: string;
  name: string;
  frequency: string;
  format: string;
  logo: string;
  description: string;
  fullContent: string;
  color: string;
}

interface StationsPageStoryblok {
  _uid: string;
  component: 'stations_page';
  title?: string;
  description?: string;
  stations?: {
    id: string;
    name: string;
    frequency: string;
    format: string;
    logo: {
      filename: string;
      alt?: string;
    };
    description: string;
    fullContent: string;
    color: string;
  }[];
  [key: string]: any;
}

const StationsPage = ({ blok }: { blok: StationsPageStoryblok }) => {
  // Use Storyblok data if available, otherwise fall back to static data
  let stations = stationData;
  
  try {
    if (blok && blok.stations && Array.isArray(blok.stations) && blok.stations.length > 0) {
      stations = blok.stations.map(station => ({
        id: station.id || '',
        name: station.name || '',
        frequency: station.frequency || '',
        format: station.format || '',
        logo: station.logo?.filename || '',
        description: station.description || '',
        fullContent: station.fullContent || '',
        color: station.color || '#000000'
      }));
    }
  } catch (error) {
    console.error('Error processing stations data:', error);
    // Fall back to static data
    stations = stationData;
  }

  const title = blok?.title || "Our Radio Stations";
  const description = blok?.description || "Discover our diverse portfolio of radio stations serving the Boise area and beyond. Each station has its own unique format and history, catering to different audiences and interests.";

  return (
    <div {...storyblokEditable(blok)}>
      <StationsPageComponent 
        stations={stations} 
        title={title}
        description={description}
      />
    </div>
  );
};

export default StationsPage;
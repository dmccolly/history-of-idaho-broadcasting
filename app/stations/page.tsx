import React from 'react';
import StationsPage from '../../components/StationsPage';
import stationData from './station-data';
import './stations.css';

export const metadata = {
  title: 'Radio Stations | Boise Radio History',
  description: 'Explore our diverse portfolio of radio stations serving the Boise area and beyond.',
};

export default async function Stations() {
  // In a real implementation, this data would come from Storyblok
  // For now, we'll use our static data
  const stations = stationData;
  
  return (
    <main>
      <div className="stations-background"></div>
      <StationsPage stations={stations} />
    </main>
  );
}
import React from 'react';
import StationsPage from '../../../components/StationsPage';
import stationData from './station-data';

export const metadata = {
  title: 'Radio Stations | Boise Radio History',
  description: 'Explore our diverse portfolio of radio stations serving the Boise area and beyond.',
};

export default function StationsRoute() {
  return (
    <main>
      <div className="stations-background"></div>
      <StationsPage stations={stationData} />
    </main>
  );
}
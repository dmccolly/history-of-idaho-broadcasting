"use client";

import React from 'react';
import { storyblokEditable } from '@storyblok/react';
import StationsPageComponent from '../StationsPage';
import stationData from '../../app/stations/station-data';

const StationsPage = ({ blok }: { blok: any }) => {
  return (
    <div {...storyblokEditable(blok)}>
      <StationsPageComponent stations={stationData} />
    </div>
  );
};

export default StationsPage;
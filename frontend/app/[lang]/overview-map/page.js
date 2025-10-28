'use client';

import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import { useState } from 'react';

// Dive Areas with Coordinates
const diveAreas = {
  northern: {
    name: "Northern Red Sea",
    locations: [
      { id: 32, name: "Nebk", lat: 28.05, lng: 34.45 },
      { id: 2, name: "Nabq", lat: 28.08, lng: 34.50 },
      { id: 22, name: "Sharm Area", lat: 28.0, lng: 34.48 },
      { id: 2, name: "Hamid", lat: 27.95, lng: 34.70 },
      { id: 4, name: "Ras Gasabah", lat: 27.88, lng: 34.68 },
    ]
  },
  central: {
    name: "Central Red Sea",
    locations: [
      { id: 8, name: "Sharm El-Sheikh", lat: 27.91, lng: 34.32 },
      { id: 69, name: "Imar", lat: 27.88, lng: 34.35 },
      { id: 55, name: "Tiran Island", lat: 27.93, lng: 34.47 },
      { id: 6, name: "Sanafir Island", lat: 27.77, lng: 34.73 },
      { id: 33, name: "Hadaba", lat: 27.85, lng: 34.28 },
    ]
  },
  eastern: {
    name: "Eastern Coast",
    locations: [
      { id: 7, name: "Gayal", lat: 27.97, lng: 35.05 },
      { id: 29, name: "NEOM", lat: 27.98, lng: 35.15 },
      { id: 12, name: "Wadi", lat: 27.93, lng: 35.28 },
      { id: 60, name: "Inounah", lat: 27.90, lng: 35.30 },
      { id: 44, name: "Alkhurayibah", lat: 27.82, lng: 35.38 },
    ]
  },
};

// All dive sites with coordinates
const allDiveSites = [
  // Column 1
  { name: "Abu Kafan", lat: 26.0, lng: 34.5 },
  { name: "Abu Soma Garden", lat: 26.1, lng: 34.6 },
  { name: "Arpha Bank", lat: 26.2, lng: 34.7 },
  { name: "Azra", lat: 26.3, lng: 34.8 },
  { name: "Cannon Reef", lat: 26.4, lng: 34.9 },
  { name: "Shaab Salman", lat: 26.5, lng: 35.0 },
  { name: "Shaab Salman Garden", lat: 26.6, lng: 35.1 },
  { name: "Shaab Shaali", lat: 26.7, lng: 35.2 },
  { name: "Tobia Kebir", lat: 26.8, lng: 35.3 },
  { name: "Shaab Shear", lat: 26.9, lng: 35.4 },
  
  // Column 2
  { name: "DDC Bank", lat: 27.0, lng: 34.4 },
  { name: "Gamul Kebir", lat: 27.1, lng: 34.5 },
  { name: "Gamul Soraya", lat: 27.2, lng: 34.6 },
  { name: "Gassous Bay", lat: 27.3, lng: 34.7 },
  { name: "Green Hole", lat: 27.4, lng: 34.8 },
  { name: "House Reef Coral Garden", lat: 27.5, lng: 34.9 },
  { name: "Shaab Shear Soraya", lat: 27.7, lng: 35.1 },
  { name: "Shaab Tobia Arba", lat: 27.8, lng: 35.2 },
  { name: "Umm Hal Hal", lat: 27.9, lng: 35.3 },
  { name: "Shaab Tobia Soraya", lat: 28.0, lng: 35.4 },
  
  // Column 3
  { name: "Middle Reef", lat: 28.0, lng: 34.4 },
  { name: "Panorama Reef", lat: 28.1, lng: 34.5 },
  { name: "Ras Abu Soma", lat: 28.2, lng: 34.6 },
  { name: "Ras Dudi", lat: 28.3, lng: 34.7 },
  { name: "Ras Gazira", lat: 28.4, lng: 34.8 },
  { name: "Ras Umm Hesiwa", lat: 28.5, lng: 34.9 },
  { name: "Sharm El Naga", lat: 28.7, lng: 35.1 },
  { name: "Soma Bay", lat: 28.8, lng: 35.2 },
  { name: "Umm Uruk", lat: 28.9, lng: 35.3 },
  { name: "Split Reef", lat: 29.0, lng: 35.4 },
  
  // Column 4
  { name: "Safaga Island", lat: 26.7, lng: 33.9 },
  { name: "Seven Pillars", lat: 26.8, lng: 34.0 },
  { name: "Shaab Bagui", lat: 26.9, lng: 34.1 },
  { name: "Shaab Ciaude", lat: 27.0, lng: 34.2 },
  { name: "Shaab Hamdalah", lat: 27.1, lng: 34.3 },
  { name: "Shaab Quais", lat: 27.2, lng: 34.4 },
  { name: "Tobia Hamra", lat: 27.4, lng: 34.6 },
  { name: "Tobia Island", lat: 27.5, lng: 34.7 },
  { name: "Zabil", lat: 27.6, lng: 34.8 },
  { name: "Azra", lat: 27.7, lng: 34.9 },
];

// Organize into columns for display
const diveSitesList = [
  allDiveSites.slice(0, 10),   // Column 1
  allDiveSites.slice(10, 20),  // Column 2
  allDiveSites.slice(20, 30),  // Column 3
  allDiveSites.slice(30, 40),  // Column 4
];

// Custom Numbered Marker
function CustomMarker({ location, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <OverlayView
      position={{ lat: location.lat, lng: location.lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <div
          className={`
            ${isHovered ? 'bg-blue-600 scale-110' : 'neutral-950'}
            text-white w-11 h-11 rounded-full
            flex items-center justify-center
            font-bold text-sm
            border-3 border-white shadow-lg bg-neutral-950
            transition-all duration-300 ease-in-out
          `}
        >
          {location.id}
        </div>
      </div>
    </OverlayView>
  );
}

export default function DiveMapTailwind() {
  const [map, setMap] = useState(null);
  const [center] = useState({ lat: 27.9, lng: 34.6 });
  const [zoom] = useState(10);
  const [selectedSite, setSelectedSite] = useState(null);

  const mapOptions = {
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#a2daf2' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#d4e8c1' }],
      },
    ],
  };

  const handleMarkerClick = (location) => {
    if (map) {
      map.panTo({ lat: location.lat, lng: location.lng });
      map.setZoom(13);
      setSelectedSite(location.name);
      setTimeout(() => setSelectedSite(null), 2000);
    }
  };

  const handleSiteClick = (site) => {
    if (map) {
      map.panTo({ lat: site.lat, lng: site.lng });
      
      const targetZoom = 14;
      const currentZoom = map.getZoom();
      
      if (Math.abs(currentZoom - targetZoom) > 3) {
        const zoomStep = currentZoom < targetZoom ? 1 : -1;
        let steps = Math.abs(currentZoom - targetZoom);
        let currentStep = 0;
        
        const zoomInterval = setInterval(() => {
          currentStep++;
          const newZoom = currentZoom + (zoomStep * currentStep);
          map.setZoom(newZoom);
          
          if (currentStep >= steps) {
            clearInterval(zoomInterval);
          }
        }, 100);
      } else {
        map.setZoom(targetZoom);
      }
      
      setSelectedSite(site.name);
      setTimeout(() => setSelectedSite(null), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* MAP SECTION */}
      <div className="w-full h-[500px] relative">
        <LoadScript 
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || 'AIzaSyD7paxRNSEwHA2CoFCwk6fQzwh-kBxIF4o'}
          loadingElement={
            <div className="h-full flex items-center justify-center bg-neutral-950">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          }
        >
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={center}
            zoom={zoom}
            onLoad={setMap}
            options={mapOptions}
          >
            {map && Object.values(diveAreas).map((area) =>
              area.locations.map((location, idx) => (
                <CustomMarker
                  key={`${location.id}-${idx}`}
                  location={location}
                  onClick={() => handleMarkerClick(location)}
                />
              ))
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* DIVE SITES LIST SECTION */}
      <div className="w-full py-10 px-5 md:py-16 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-sm leading-md tracking-xs text-neutral-950 pb-3 border-b border-neutral-300 mb-2">
              Red Sea Dive sites | Dive Map of
            </h2>
          </div>

          {/* Sites Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {diveSitesList.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col">
                {column.map((site, siteIndex) => (
                  <div
                    key={siteIndex}
                    onClick={() => handleSiteClick(site)}
                    className={`
                      py-2.5 px-3 text-sm
                      ${siteIndex < column.length - 1 ? '' : ''}
                      cursor-pointer rounded
                      transition-all duration-200 ease-in-out
                      ${selectedSite === site.name 
                        ? 'bg-blue-600 text-white font-semibold shadow-lg scale-[1.02]' 
                        : ' hover:text-neutral-950 hover:bg-blue-50 hover:translate-x-1'
                      }
                    `}
                  >
                    {site.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
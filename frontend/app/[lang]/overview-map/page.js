'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import React from 'react'

export default function OverviewMap() {

  const [selectedSite, setSelectedSite] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  // Dive sites data with coordinates
  const diveSites = [
    { id: 1, name: 'Abu Kafan', number: '32', x: 15, y: 15, region: 'Nabq' },
    { id: 2, name: 'Abu Soma Garden', number: '02', x: 18, y: 22, region: 'Nabq' },
    { id: 3, name: 'Arpha Bank', number: '22', x: 25, y: 28, region: 'Nabq' },
    { id: 4, name: 'Azra', number: '08', x: 12, y: 42, region: 'Sharm El Sheikh' },
    { id: 5, name: 'Cannon Reef', number: '69', x: 18, y: 42, region: 'Imar' },
    { id: 6, name: 'Shaab Salman', number: '33', x: 8, y: 68, region: 'Hadaba' },
    { id: 7, name: 'Shaab Salman Garden', number: '02', x: 42, y: 8, region: 'Hamid' },
    { id: 8, name: 'Shaab Shaali', number: '04', x: 43, y: 21, region: 'Ras Qasabah' },
    { id: 9, name: 'Tobia Kebir', number: '55', x: 33, y: 48, region: 'Tiran Island' },
    { id: 10, name: 'DDC Bank', number: '06', x: 52, y: 48, region: 'Sanafir Island' },
    { id: 11, name: 'Gamul Kebir', number: '07', x: 92, y: 7, region: 'Gayal' },
    { id: 12, name: 'Gamul Soraya', number: '29', x: 103, y: 9, region: 'Neom Community-1' },
    { id: 13, name: 'Gassous Bay', number: '12', x: 112, y: 11, region: 'Wadi Jnoubah' },
    { id: 14, name: 'Green Hole', number: '60', x: 115, y: 19, region: 'Wadi Jnoubah' },
    { id: 15, name: 'House Reef Coral Garden', number: '44', x: 118, y: 28, region: 'Alkhurayba' },
    { id: 16, name: 'Shaab Shear', number: null, x: 120, y: 35, region: 'Sharma' },
    { id: 17, name: 'Shaab Shear Soraya', number: null, x: 95, y: 40, region: null },
    { id: 18, name: 'Shaab Tobia Arba', number: null, x: 75, y: 45, region: null },
    { id: 19, name: 'Umm Hal Hal', number: null, x: 65, y: 50, region: null },
    { id: 20, name: 'Middle Reef', number: null, x: 55, y: 55, region: null },
    { id: 21, name: 'Panorama Reef', number: null, x: 45, y: 60, region: null },
    { id: 22, name: 'Ras Abu Soma', number: null, x: 35, y: 65, region: null },
    { id: 23, name: 'Ras Dudi', number: null, x: 25, y: 70, region: null },
    { id: 24, name: 'Ras Gazira', number: null, x: 50, y: 75, region: null },
    { id: 25, name: 'Ras Umm Hesiwa', number: null, x: 60, y: 65, region: null },
    { id: 26, name: 'Shaab Tobia Soraya', number: null, x: 70, y: 55, region: null },
    { id: 27, name: 'Sharm El Naga', number: null, x: 80, y: 45, region: null },
    { id: 28, name: 'Soma Bay', number: null, x: 85, y: 50, region: null },
    { id: 29, name: 'Umm Uruk', number: null, x: 75, y: 60, region: null },
    { id: 30, name: 'Safaga Island', number: null, x: 90, y: 55, region: null },
    { id: 31, name: 'Seven Pillars', number: null, x: 95, y: 60, region: null },
    { id: 32, name: 'Shaab Bagui', number: null, x: 100, y: 65, region: null },
    { id: 33, name: 'Shaab Claude', number: null, x: 105, y: 70, region: null },
    { id: 34, name: 'Shaab Hamdalah', number: null, x: 85, y: 75, region: null },
    { id: 35, name: 'Shaab Quais', number: null, x: 70, y: 80, region: null },
    { id: 36, name: 'Split Reef', number: null, x: 60, y: 85, region: null },
    { id: 37, name: 'Tobia Hamra', number: null, x: 50, y: 90, region: null },
    { id: 38, name: 'Tobia Island', number: null, x: 40, y: 85, region: null },
    { id: 39, name: 'Zabil', number: null, x: 30, y: 80, region: null },
  ];

  // Menu items organized in columns
  const menuColumns = [
    [
      'Abu Kafan',
      'Abu Soma Garden',
      'Arpha Bank',
      'Azra',
      'Azra',
      'Cannon Reef',
      'Shaab Salman',
      'Shaab Salman Garden',
      'Shaab Shaali',
      'Tobia Kebir',
    ],
    [
      'DDC Bank',
      'Gamul Kebir',
      'Gamul Soraya',
      'Gassous Bay',
      'Green Hole',
      'House Reef Coral Garden',
      'Shaab Shear',
      'Shaab Shear Soraya',
      'Shaab Tobia Arba',
      'Umm Hal Hal',
    ],
    [
      'Middle Reef',
      'Panorama Reef',
      'Ras Abu Soma',
      'Ras Dudi',
      'Ras Gazira',
      'Ras Umm Hesiwa',
      'Shaab Tobia Soraya',
      'Sharm El Naga',
      'Soma Bay',
      'Umm Uruk',
    ],
    [
      'Safaga Island',
      'Seven Pillars',
      'Shaab Bagui',
      'Shaab Claude',
      'Shaab Hamdalah',
      'Shaab Quais',
      'Split Reef',
      'Tobia Hamra',
      'Tobia Island',
      'Zabil',
    ],
  ];

  const handleSiteClick = (siteName) => {
    const site = diveSites.find((s) => s.name === siteName);
    if (site) {
      setSelectedSite(site);
      setZoom(3);
      // Center the map on the selected site
      setPan({
        x: -(site.x * 3 - 50),
        y: -(site.y * 3 - 50),
      });
    }
  };

  const handleZoomOut = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedSite(null);
  };

  return (
    <div className='md:pt-28 pt-10'>
      <div className=' text-neutral-950 max-w-[990px] w-full mx-auto px-4 text-center md:pb-28 pb-6'>
        <h1 className=' md:text-xl text-ml font-bold leading-xl tracking-xs md:mb-3 mb-1'>Overview Map</h1>
        <p className=' text-neutral-500 text-xs md:text-sm font-medium'>Discover the underwater world of the Red Sea from the water surface</p>
      </div>

      <div className="flex flex-col ">
        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden max-h-[600px] bg-gray-100">
          <div
            ref={mapRef}
            className="w-full h-full relative"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {/* Map Image Background */}
            <div className="relative w-full h-full md:min-h-[600px] min-h-[360px]">

              <Image
                                                  src={"/images/amp.avif"
                                                  }
                                                  alt="image"
                                                  width={1920}
                                                  height={783}
                                                  className="inline-block object-cover w-full h-full md:min-h-[600px] min-h-[360px]"
                                              />              
              {/* Dive Site Markers - Positioned over the image */}
              <div className="absolute inset-0">
                {diveSites.map((site) => (
                  <div
                    key={site.id}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                    style={{
                      left: `${site.x}%`,
                      top: `${site.y}%`,
                    }}
                    onClick={() => handleSiteClick(site.name)}
                  >
                    {zoom === 1 && site.number ? (
                      // Show numbers when zoomed out
                      <div className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                        {site.number}
                      </div>
                    ) : zoom > 1 && selectedSite?.id === site.id ? (
                      // Show detailed info when zoomed in and selected
                      <div className="bg-white rounded-lg shadow-xl p-3 min-w-[120px] border-2 border-blue-500">
                        <div className="text-xs font-bold text-gray-800 mb-1">{site.name}</div>
                        {site.region && (
                          <div className="text-xs text-gray-600">{site.region}</div>
                        )}
                        {site.number && (
                          <div className="text-xs text-blue-600 mt-1">Site #{site.number}</div>
                        )}
                      </div>
                    ) : (
                      // Show dot for other sites when zoomed in
                      <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          {zoom > 1 && (
            <button
              onClick={handleZoomOut}
              className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors font-medium text-sm z-10"
            >
              ← Zoom Out
            </button>
          )}
        </div>

        {/* Bottom Menu */}
        <div className="bg-white pb-28">
          <div className="container mx-auto px-4 py-6">
            <h2 className=" text-sm font-semiBold leading-md tracking-xs py-4 mb-4 border-b border-neutral-300">
              Red Sea Dive sites | Dive Map of
            </h2>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
              {menuColumns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-2">
                  {column.map((siteName, index) => (
                    <button
                      key={index}
                      onClick={() => handleSiteClick(siteName)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors text-xs leading-xs ${
                        selectedSite?.name === siteName
                          ? 'bg-neutral-900 text-white font-semibold text-xs leading-xs'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`} >
                      {siteName}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
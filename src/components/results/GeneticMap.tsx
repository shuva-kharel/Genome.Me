import React, { useEffect, useRef } from 'react';
import { MapPin, Users, Globe } from 'lucide-react';
import { UserData } from '../../types/UserData';

interface Location {
  lat: number;
  lng: number;
  matches: number;
}

interface GeneticMapProps {
  locations: Location[];
  userData: UserData;
}

const GeneticMap: React.FC<GeneticMapProps> = ({ locations, userData }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple world map visualization without external dependencies
    if (mapRef.current) {
      const container = mapRef.current;
      
      // Clear existing content
      container.innerHTML = '';
      
      // Create world map background
      const worldMap = document.createElement('div');
      worldMap.className = 'world-map-background';
      container.appendChild(worldMap);

      // Add location markers
      locations.forEach((location, index) => {
        const marker = document.createElement('div');
        marker.className = 'genetic-marker';
        marker.style.left = `${((location.lng + 180) / 360) * 100}%`;
        marker.style.top = `${((90 - location.lat) / 180) * 100}%`;
        marker.style.animationDelay = `${index * 0.2}s`;
        
        const pulse = document.createElement('div');
        pulse.className = 'marker-pulse';
        marker.appendChild(pulse);
        
        const tooltip = document.createElement('div');
        tooltip.className = 'marker-tooltip';
        tooltip.textContent = `${location.matches} matches`;
        marker.appendChild(tooltip);
        
        container.appendChild(marker);
      });
    }
  }, [locations]);

  return (
    <div className="glass-card genetic-map">
      <div className="card-header">
        <Globe size={24} />
        <h3>Genetic Connections Worldwide</h3>
        <div className="connections-badge">
          <Users size={12} />
          {locations.reduce((sum, loc) => sum + loc.matches, 0)} Matches
        </div>
      </div>

      <div className="map-container" ref={mapRef}>
        {/* Map content will be populated by useEffect */}
      </div>

      <div className="map-stats">
        <div className="stat-group">
          <h4>Your Genetic Network</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <MapPin size={16} />
              <div>
                <span className="stat-value">{locations.length}</span>
                <span className="stat-label">Regions</span>
              </div>
            </div>
            <div className="stat-item">
              <Users size={16} />
              <div>
                <span className="stat-value">{locations.reduce((sum, loc) => sum + loc.matches, 0)}</span>
                <span className="stat-label">Total Matches</span>
              </div>
            </div>
            <div className="stat-item">
              <Globe size={16} />
              <div>
                <span className="stat-value">94%</span>
                <span className="stat-label">Coverage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="top-regions">
          <h4>Top Genetic Matches</h4>
          {locations
            .sort((a, b) => b.matches - a.matches)
            .slice(0, 3)
            .map((location, index) => (
              <div key={index} className="region-item">
                <div className="region-rank">#{index + 1}</div>
                <div className="region-info">
                  <span className="region-coords">
                    {location.lat.toFixed(1)}°, {location.lng.toFixed(1)}°
                  </span>
                  <span className="region-matches">{location.matches} matches</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GeneticMap;
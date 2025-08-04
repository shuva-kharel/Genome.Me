import React, { useState, useEffect } from 'react';
import { UserData, GenomeData } from '../types/UserData';
import AncestryChart from './results/AncestryChart';
import TraitsTable from './results/TraitsTable';
import RareGenes from './results/RareGenes';
import AISummary from './results/AISummary';
import DownloadReport from './results/DownloadReport';
import GeneticMap from './results/GeneticMap';
import { ArrowLeft, RotateCcw, Beaker, Award } from 'lucide-react';
import { generateGenomeData } from '../utils/genomeGenerator';

interface ResultsDashboardProps {
  genomeData: GenomeData;
  userData: UserData;
  onBackToLanding: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ 
  genomeData: initialData, 
  userData, 
  onBackToLanding 
}) => {
  const [genomeData, setGenomeData] = useState(initialData);
  const [scientificMode, setScientificMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleRegenerate = () => {
    const newData = generateGenomeData(userData, Date.now().toString());
    setGenomeData(newData);
  };

  return (
    <div className="results-dashboard">
      <div className="dashboard-header">
        <div className="header-controls">
          <button className="back-button" onClick={onBackToLanding}>
            <ArrowLeft size={20} />
            Back to Analysis
          </button>
          
          <div className="header-actions">
            <button 
              className={`mode-toggle ${scientificMode ? 'active' : ''}`}
              onClick={() => setScientificMode(!scientificMode)}
            >
              <Beaker size={16} />
              Scientific Mode
            </button>
            
            <button className="regenerate-button" onClick={handleRegenerate}>
              <RotateCcw size={16} />
              Regenerate
            </button>
          </div>
        </div>

        <div className="results-header">
          <div className="user-info">
            <h1>Genetic Analysis Results</h1>
            <div className="user-details">
              <span className="user-name">{userData.fullName}</span>
              <span className="report-id">Report ID: {genomeData.reportId}</span>
              <span className="timestamp">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="match-score">
            <div className="score-circle">
              <div className="score-value">{genomeData.matchScore}%</div>
              <div className="score-label">Match Score</div>
            </div>
            <div className="score-description">
              <Award size={16} />
              Above Global Average
            </div>
          </div>
        </div>
      </div>

      <div className={`dashboard-content ${isAnimating ? 'animate-in' : ''}`}>
        <div className="results-grid">
          <div className="result-section">
            <AncestryChart 
              ancestry={genomeData.ancestry} 
              scientificMode={scientificMode}
            />
          </div>

          <div className="result-section">
            <TraitsTable 
              traits={genomeData.traits} 
              scientificMode={scientificMode}
            />
          </div>

          <div className="result-section">
            <RareGenes 
              rareGenes={genomeData.rareGenes} 
              scientificMode={scientificMode}
            />
          </div>

          <div className="result-section">
            <AISummary 
              summary={genomeData.aiSummary}
              userData={userData}
              scientificMode={scientificMode}
            />
          </div>

          <div className="result-section">
            <DownloadReport 
              genomeData={genomeData}
              userData={userData}
              scientificMode={scientificMode}
            />
          </div>

          <div className="result-section">
            <GeneticMap 
              locations={genomeData.locations}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
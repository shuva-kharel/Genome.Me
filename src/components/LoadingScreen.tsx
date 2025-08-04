import React, { useState, useEffect } from 'react';
import { Dna } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingTexts = [
  "Extracting double helix patterns...",
  "Analyzing SNP variations...",
  "Decoding ancestral lineage...",
  "Detecting cognitive & physiological traits...",
  "Applying quantum genome filters...",
  "Finalizing genetic analysis..."
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 4500; // 4.5 seconds
    const interval = 75; // Update every 75ms for smooth animation
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    const textTimer = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 750);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-background">
        <div className="dna-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}>
              <Dna size={16} />
            </div>
          ))}
        </div>
      </div>

      <div className="loading-content">
        <div className="dna-loader">
          <div className="dna-strand strand-1"></div>
          <div className="dna-strand strand-2"></div>
          <div className="dna-center"></div>
        </div>

        <div className="loading-info">
          <h2 className="loading-title">Genome Analysis in Progress</h2>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>

          <p className="loading-message">
            {loadingTexts[currentTextIndex]}
          </p>

          <div className="lab-details">
            <div className="detail-item">
              <span className="detail-label">Processing:</span>
              <span className="detail-value">3.2B base pairs</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Markers:</span>
              <span className="detail-value">742,586 SNPs</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Confidence:</span>
              <span className="detail-value">99.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
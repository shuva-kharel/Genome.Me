import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, TrendingUp } from 'lucide-react';
import { UserData } from '../../types/UserData';

interface AISummaryProps {
  summary: string;
  userData: UserData;
  scientificMode: boolean;
}

const AISummary: React.FC<AISummaryProps> = ({ summary, userData, scientificMode }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < summary.length) {
        setDisplayedText(summary.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [summary]);

  return (
    <div className="glass-card ai-summary">
      <div className="card-header">
        <Bot size={24} />
        <h3>{scientificMode ? 'Computational Genome Analysis' : 'AI Genetic Insights'}</h3>
        <div className="ai-badge">
          <Sparkles size={12} />
          AI Generated
        </div>
      </div>

      <div className="summary-content">
        <div className="typing-container">
          <p className="summary-text">
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </p>
        </div>

        <div className="insights-metrics">
          <div className="metric-item">
            <TrendingUp size={16} />
            <span>Confidence: 94.7%</span>
          </div>
          <div className="metric-item">
            <Bot size={16} />
            <span>Model: GenomeGPT-4</span>
          </div>
        </div>

        <div className="key-highlights">
          <h4>Key Genetic Indicators:</h4>
          <div className="highlights-grid">
            <div className="highlight-item">
              <span className="highlight-label">Metabolic Type:</span>
              <span className="highlight-value">Fast Responder</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Cognitive Profile:</span>
              <span className="highlight-value">Analytical</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Circadian Rhythm:</span>
              <span className="highlight-value">Evening Optimized</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Stress Response:</span>
              <span className="highlight-value">Resilient</span>
            </div>
          </div>
        </div>
      </div>

      {scientificMode && (
        <div className="scientific-disclaimer">
          <p>
            Analysis based on polygenic risk scores and established GWAS associations. 
            Predictions are probabilistic and should not be used for clinical decisions.
          </p>
        </div>
      )}
    </div>
  );
};

export default AISummary;
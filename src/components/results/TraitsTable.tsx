import React from 'react';
import { Dna, Eye, Zap, Coffee, Brain, Clock, Activity } from 'lucide-react';

interface Trait {
  trait: string;
  gene: string;
  status: string;
  description: string;
}

interface TraitsTableProps {
  traits: Trait[];
  scientificMode: boolean;
}

const getTraitIcon = (trait: string) => {
  if (trait.includes('Eye')) return <Eye size={16} />;
  if (trait.includes('Muscle')) return <Zap size={16} />;
  if (trait.includes('Caffeine') || trait.includes('Lactose')) return <Coffee size={16} />;
  if (trait.includes('Memory') || trait.includes('Cognitive')) return <Brain size={16} />;
  if (trait.includes('Circadian') || trait.includes('Sleep')) return <Clock size={16} />;
  if (trait.includes('Metabolism')) return <Activity size={16} />;
  return <Dna size={16} />;
};

const getStatusColor = (status: string) => {
  if (status.includes('High') || status.includes('Strong') || status.includes('Fast')) return 'status-high';
  if (status.includes('Low') || status.includes('Slow')) return 'status-low';
  if (status.includes('Moderate') || status.includes('Medium')) return 'status-medium';
  return 'status-neutral';
};

const TraitsTable: React.FC<TraitsTableProps> = ({ traits, scientificMode }) => {
  return (
    <div className="glass-card traits-table">
      <div className="card-header">
        <Dna size={24} />
        <h3>{scientificMode ? 'Phenotypic Expression Analysis' : 'Genetic Traits'}</h3>
      </div>

      <div className="traits-container">
        {traits.map((trait, index) => (
          <div key={index} className="trait-row">
            <div className="trait-info">
              <div className="trait-header">
                {getTraitIcon(trait.trait)}
                <div className="trait-details">
                  <span className="trait-name">{trait.trait}</span>
                  <span className="gene-code">
                    {scientificMode ? trait.gene : `Gene: ${trait.gene}`}
                  </span>
                </div>
              </div>
              <p className="trait-description">{trait.description}</p>
            </div>
            
            <div className={`trait-status ${getStatusColor(trait.status)}`}>
              {trait.status}
            </div>
          </div>
        ))}
      </div>

      {scientificMode && (
        <div className="scientific-note">
          <p>
            * Analysis based on single nucleotide polymorphisms (SNPs) and 
            established genomic markers. Results indicate probabilistic outcomes.
          </p>
        </div>
      )}
    </div>
  );
};

export default TraitsTable;
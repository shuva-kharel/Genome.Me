import React from 'react';
import { Star, Sparkles, Zap, Brain, Heart, Shield } from 'lucide-react';

interface RareGene {
  code: string;
  trait: string;
  description: string;
  icon: string;
}

interface RareGenesProps {
  rareGenes: RareGene[];
  scientificMode: boolean;
}

const getGeneIcon = (iconType: string) => {
  switch (iconType) {
    case 'brain': return <Brain size={20} />;
    case 'heart': return <Heart size={20} />;
    case 'shield': return <Shield size={20} />;
    case 'zap': return <Zap size={20} />;
    case 'sparkles': return <Sparkles size={20} />;
    default: return <Star size={20} />;
  }
};

const RareGenes: React.FC<RareGenesProps> = ({ rareGenes, scientificMode }) => {
  return (
    <div className="glass-card rare-genes">
      <div className="card-header">
        <Star size={24} />
        <h3>{scientificMode ? 'Rare Allelic Variants' : 'Rare Gene Highlights'}</h3>
      </div>

      <div className="genes-grid">
        {rareGenes.map((gene, index) => (
          <div key={index} className="gene-card">
            <div className="gene-icon">
              {getGeneIcon(gene.icon)}
            </div>
            
            <div className="gene-info">
              <h4 className="gene-code">{gene.code}</h4>
              <p className="gene-trait">{gene.trait}</p>
              <p className="gene-description">{gene.description}</p>
            </div>

            <div className="rarity-badge">
              <Sparkles size={12} />
              Rare
            </div>
          </div>
        ))}
      </div>

      <div className="rare-genes-footer">
        <p>
          {scientificMode 
            ? 'These variants occur in <5% of the global population based on genomic databases.'
            : 'These unique genetic markers make you special! Less than 5% of people have these traits.'
          }
        </p>
      </div>
    </div>
  );
};

export default RareGenes;
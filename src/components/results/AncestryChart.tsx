import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Globe2 } from 'lucide-react';

interface AncestryChartProps {
  ancestry: { [key: string]: number };
  scientificMode: boolean;
}

const AncestryChart: React.FC<AncestryChartProps> = ({ ancestry, scientificMode }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const labels = Object.keys(ancestry);
        const data = Object.values(ancestry);
        const colors = [
          '#00ff88', '#00d4ff', '#ff6b6b', '#ffd93d', 
          '#6bcf7f', '#4ecdc4', '#45b7d1', '#96ceb4'
        ];

        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{
              data,
              backgroundColor: colors,
              borderColor: colors.map(color => color + '40'),
              borderWidth: 2,
              hoverBorderWidth: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#ffffff',
                  font: { size: 12 },
                  padding: 15,
                  usePointStyle: true
                }
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#00ff88',
                borderWidth: 1,
                callbacks: {
                  label: (context) => {
                    return `${context.label}: ${context.parsed}%`;
                  }
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [ancestry]);

  return (
    <div className="glass-card ancestry-chart">
      <div className="card-header">
        <Globe2 size={24} />
        <h3>{scientificMode ? 'Genomic Population Structure' : 'Ancestry Breakdown'}</h3>
      </div>
      
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="ancestry-details">
        {Object.entries(ancestry).map(([region, percentage]) => (
          <div key={region} className="ancestry-item">
            <span className="region-name">{region}</span>
            <div className="percentage-bar">
              <div 
                className="percentage-fill" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="percentage-value">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AncestryChart;
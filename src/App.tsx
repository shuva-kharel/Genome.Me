import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import ResultsDashboard from './components/ResultsDashboard';
import { UserData } from './types/UserData';
import { generateGenomeData } from './utils/genomeGenerator';
import './styles/globals.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'loading' | 'results'>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [genomeData, setGenomeData] = useState(null);

  const handleAnalyzeGenome = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('loading');
  };

  const handleLoadingComplete = () => {
    if (userData) {
      const results = generateGenomeData(userData);
      setGenomeData(results);
      setCurrentScreen('results');
    }
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
    setUserData(null);
    setGenomeData(null);
  };

  return (
    <div className="app">
      {currentScreen === 'landing' && (
        <LandingPage onAnalyze={handleAnalyzeGenome} />
      )}
      {currentScreen === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {currentScreen === 'results' && genomeData && userData && (
        <ResultsDashboard 
          genomeData={genomeData} 
          userData={userData}
          onBackToLanding={handleBackToLanding}
        />
      )}
    </div>
  );
}

export default App;
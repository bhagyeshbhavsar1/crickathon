import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DraftPool from './pages/DraftPool';
import PitchView from './pages/PitchView';
import TeamAnalytics from './pages/TeamAnalytics';
import AICoach from './pages/AICoach';
import HistoryVault from './pages/HistoryVault';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DraftPool />} />
          <Route path="pitch" element={<PitchView />} />
          <Route path="analytics" element={<TeamAnalytics />} />
          <Route path="ai-coach" element={<AICoach />} />
          <Route path="history" element={<HistoryVault />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
